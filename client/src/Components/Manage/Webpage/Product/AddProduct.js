import React ,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import axios  from "axios";
import Notiflix from 'notiflix';
import $ from 'jquery'
import productApi from '../../../../Api/productApi';
import { useWeb3 } from "../../../../Providers";
function AddProduct() {
    const {web3,contract,provider} = useWeb3();
    const [priceETH, setPriceETH] = useState("");
    const [priceTotalVND, setTotalVND] = useState();
    const [priceTotalETH, setTotalETH] = useState();
    const [categories,setCategory] = useState([]);
    const [contracts,setContract] = useState();
    const [productInput, setProductInput] = useState({
        name:'',
        desc:'',
        slug:'',
        keyword:'',
        price:'',
        qty:'',
        category_id:0,
        display:1,
        type_display:1,
        sale_of:'',
        wallet:'',
        error_list:{},
    })
    const [imageReview,setImageReview] = useState({src: '',file:'',name:''});
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    // Show Price ETH
    useEffect(() => {
        fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,VND")
        .then(response => response.json())
        .then(data => {
          setPriceETH(data.VND)
        });
    }, []);
    // Show Select List Category 
    useEffect(()=>{
        axios.get('/category/show',{ 
            params : { 
              whoCall: 'admin',
            } 
            }).then((res)=>{
            if(res.data.success === true){
                setCategory(res.data.category);
            }
        })
        .catch((error)=>{
            Notiflix.Report.failure("Category not Found","please come back later" , 'Cancel');
        })
    },[])
    // Show Select List Contrat 
    useEffect(()=>{
        axios.get('/contract/show',{ 
            }).then((res)=>{
            if(res.data.success === true){
                setContract(res.data.contract);
            }
        })
        .catch((error)=>{
            Notiflix.Report.failure("Contract not Found","please come back later" , 'Cancel');
        })
    },[])
    // Calculation Money 
    useEffect(() => {
        setTotalVND(productInput.price * productInput.qty);
        setTotalETH(productInput.price * productInput.qty / parseFloat(priceETH));
    }, [productInput.price,productInput.qty]);
    // Get Wallet  
    useEffect(() => {
        const handleAccountsChanged = async () => {
            const accounts = await web3.eth.getAccounts();
            if(accounts.length === 0)
            {
                console.log("No Wallet");
            }else if(accounts[0] !== account) {
                setAccount(accounts[0]);
            }
        }
        if(isConnected) {
            provider.on("accountsChanged",handleAccountsChanged);
        }
        return () => {
            if(isConnected) {
                provider.removeListener('accountsChanged', handleAccountsChanged);
            }
        }
    }, [isConnected]);
    //review Image
    useEffect(() => {
        return () => {
            imageReview.src && URL.revokeObjectURL(imageReview.src);
        };
    }, [imageReview]);
    const Transfers = async (id) =>{
        const amount = web3.utils.toWei(priceTotalETH.toString(), "ether");
        let   addressSupplier = productInput.wallet;
        await contract.transferToSupplier(id,addressSupplier.toString(),{
                from:account,
                value:amount
            })
            .then((_transfer)=>{
                Notiflix.Loading.remove(500);
                setProductInput({name:'',desc:'',slug:'',keyword:'',price:'',qty:'',image:'',category_id:0,display:1,type_display:1,wallet:'',error_list:[],});
            })
            .catch((err)=>{
                console.log(err);
                Notiflix.Report.failure("Meta Mark Notification",err.message, 'Cancel');
                deleteProduct(id);
            })
        return false; // turnoff reload function for "multer" lib
    }
    const handleInput = (e)=>{
        setProductInput({
            ...productInput,
            [e.target.name]: e.target.value,
            error_list:{
                ...productInput.error_list,
                [e.target.name]: '',
            }
        })
    };
    const handelImage = (e)=>{
        e.preventDefault();
        $('#image_product').trigger('click') 
    }
    const changeHandleFile = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setImageReview({src: file.preview,file:e.target.files[0],name :e.target.files[0].name }); 
        setProductInput({
            ...productInput,
            [e.target.name]: e.target.value,
            error_list:{
                ...productInput.error_list,
                [e.target.name]: '',
            }
        })
	};
    const handelSubmit = (e)=>{
        e.preventDefault();
        Notiflix.Loading.hourglass("Processing data! Please wait...",{
            svgSize: '120px',
        });
        if(!account){
            provider.request({ method:'eth_requestAccounts'})
                            .then((result)=>{
                                setAccount(result[0]);
                                storeProduct();
                            })
                            .catch((err)=>{
                                console.log(err.response.data.message)
                                Notiflix.Report.failure("Meta Mark Notification",err.response.data.message, 'Cancel');
                            })
        }else{
            storeProduct();
        }
      
    };
    const storeProduct = async ()=>{
        const formData = new FormData();
        for (const property in productInput) {
            formData.append(property, productInput[property]);
        }
        formData.append('image', imageReview.file); 
        await productApi.store(formData)
        .then(res =>{
            console.log(res);
            if(res.success === true )
            {
                Transfers(res.id);
            }
        }).catch((error)=>{
            if(error.response.data.error){
                Notiflix.Report.failure(error.response.data.message,error.response.data.error , 'Cancel');
            }
            if(error.response.data.listError){ 
                setProductInput((prev)=>{
                    return {...prev,error_list: error.response.data.listError}
                });
            }
        }); 
    }
    const deleteProduct =async (id)=>{
        const params = {id}
        await productApi.delete(params)
        .then((res)=>{
            if(res.success === true){
                return true;
            } 
        }).catch((error)=>{
            return false;
        })
    }
    const  handelConnectMetamask = async () => {
        provider.request({ method: 'eth_requestAccounts' })
        .then((account)=>{
           setAccount(account[0]);
           setIsConnected(true);
        })
        .catch((error) => {
          if (error.code === 4001) {
            console.log('Please connect to MetaMask.');
          } else {
            console.error(error);
          }
        });
    }
    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-2">Add  Product</h1>
                                </div>
                                <div className="mb-4 d-flex justify-content-between">
                                    <Link to={'/admin/list-product'} className="btn btn-primary ">List Product</Link>
                                    <button onClick={handelConnectMetamask} className="btn btn-primary btn-user">
                                        Connect Metamask
                                    </button>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-9 d-flex agline-items-center">
                                        <strong>Account Address : </strong>
                                        <p className="account_number m-0 ml-4">
                                        { account ? account : "Account Denined"}
                                        </p>
                                    </div>
                                    <div className="col-sm-3">
                                        <strong>Price ETH:</strong> {priceETH && priceETH.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})} 
                                    </div>
                                </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" onChange={handleInput} value={productInput.name} name="name" className="form-control form-control-user" id="exampleFirstName" placeholder="Product Name" />
                                            <span className="text-danger small">{productInput.error_list.name}</span>
                                        </div>
                                        <div className="col-sm-3">
                                            <input type="text" onChange={handleInput} value={productInput.slug} name="slug" className="form-control form-control-user"  placeholder="Product Slug" />
                                            <span className="text-danger small">{productInput.error_list.slug}</span>
                                        </div>
                                        <div className="col-sm-3">
                                            <input type="number" onChange={handleInput} value={productInput.sale_of} name="sale_of" className="form-control form-control-user " id="exampleInputPassword" placeholder="Sale Of (%)" />
                                            <span className="text-danger small">{productInput.error_list.sale_of}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-4 mb-3 mb-sm-0">
                                            <input type="text" onChange={handleInput} value={productInput.qty} name="qty" min='0' max='100000' className="form-control form-control-user" id="exampleFirstName" placeholder="Product Quantity (Kg)" />
                                            <span className="text-danger small">{productInput.error_list.qty}</span>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" onChange={handleInput} value={productInput.price} name="price" min='0'  className="form-control form-control-user"  placeholder="Product Price (VNĐ)" />
                                            <span className="text-danger small">{productInput.error_list.price}</span>
                                        </div>
                                        <div className="col-sm-4 mb-3 mb-sm-0">
                                            <input type="text" onChange={handleInput} value={productInput.keyword} name="keyword" className="form-control form-control-user " id="exampleInputPassword" placeholder="Key Word" />
                                            <span className="text-danger small">{productInput.error_list.keyword}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <textarea type="text"  id="editor" onChange={handleInput} value={productInput.desc} name="desc" rows={10}  className="form-control" 
                                            placeholder="Product Description"/>
                                        <span className="text-danger small">{productInput.error_list.desc}</span>
                                    </div>
                                
                                    <div className="form-group row">
                                       
                                        <div className="col-sm-3">
                                            <label htmlFor="SelectAnHien">Image</label>
                                            <button onClick={handelImage}  className="btn btn-primary btn-block">
                                                Chose Image Product
                                            </button>
                                            <span className="text-danger small">{productInput.error_list.image}</span>
                                        </div>
                                        <div className="col-sm-3">
                                            <label htmlFor="SelectAnHien">Type Display Product</label>
                                            <select name="type_display"  value={productInput.type_display} onChange={handleInput}  className="form-control input-sm  inputform">
                                                <option value={0} className="optionform">---Chose Type Display---</option>
                                                <option value={1} className="optionform">Featured Product</option>
                                                <option value={2} className="optionform">Latest Products</option>
                                                <option value={3} className="optionform">Top Rated Products</option>
                                                <option value={4} className="optionform">Review Products</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-3">
                                            <label htmlFor="SelectAnHien">Chose Category</label>
                                            <select name="category_id"  value={productInput.category_id} onChange={handleInput}  className="form-control input-sm  inputform">
                                                <option value={0} className="optionform">---Chose Category---</option>
                                                {categories ? categories.map((category)=>{
                                                    return (
                                                        <option key={category._id} value={category._id} className="optionform">{category.name}</option>
                                                    )
                                                }) : ''}
                                            </select>
                                        </div>
                                        <div className="col-sm-3">   
                                                <label htmlFor="SelectAnHien">Display</label>
                                                <select name="display"  value={productInput.display} onChange={handleInput}  className="form-control input-sm  inputform">
                                                    <option value={0} className="optionform">Hidden</option>
                                                    <option value={1} className="optionform">Visible</option>
                                                </select>
                                        </div>
                                    </div>
                                    {imageReview.src &&  <div className="form-group text-center" >
                                        <img src={imageReview.src} id='review-image' className=" img-thumbnail w-50" alt="..."/>
                                        <p>  Image : <i className="name_image">{imageReview.name}</i></p>
                                    </div>}
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <label htmlFor="SelectAnHien">Chose Contract Supplier</label>
                                            <select name="wallet"  value={productInput.wallet} onChange={handleInput}  className="form-control input-sm  inputform">
                                                <option value={0} className="optionform">---Chose Supplier---</option>
                                                {contracts ? contracts.map((contract)=>{
                                                    return (
                                                        <option key={contract._id} value={contract.wallet} className="optionform">{contract.name}</option>
                                                    )
                                                }) : " "}
                                            </select>
                                            <span className="text-danger small">{productInput.error_list.wallet}</span>
                                        </div>                                
                                    </div>
                                    <div className="form-group text-center" >
                                        <p>  Price Total Viet Nam : <i className="price_token"> {priceTotalVND ? priceTotalVND.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) : ""} </i></p>
                                        <p>  Price Total Token : <i className="price_token"> {priceTotalETH } ETH </i></p>
                                    </div>
                                    <div className="form-row mt-5">
                                        <div className="form-group col-md-3">
                                            <button onClick={handelSubmit} className="btn btn-primary btn-user btn-block">
                                                Add Product
                                            </button>
                                        </div>
                                    </div>
                                    <input type="file" id="image_product" onChange={changeHandleFile} accept="image/*" style={{display:'none'}} name="image" className="form-control form-control-user d-none "  placeholder="Product " />
                                </form>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct