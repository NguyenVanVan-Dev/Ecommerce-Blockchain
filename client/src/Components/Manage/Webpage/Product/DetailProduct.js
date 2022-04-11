import React ,{useLayoutEffect, useState,useEffect} from "react";
import {Link,useParams} from "react-router-dom";
import axios  from "axios";
import Notiflix from 'notiflix';
import $ from 'jquery';
import productApi from '../../../../Api/productApi'
function DetailProduct() {
    const { id } = useParams();
    const [productInput, setProductInput] = useState({
        name:'',
        desc:'',
        slug:'',
        keyword:'',
        price:'',
        qty:'',
        category_id:0,
        image:'',
        display:1,
        sale_of:'',
        type_display:1,
        error_list:{},
    });
    const [categories,setCategory] = useState([]);
    const [imageReview,setImageReview] = useState({src: '',file:'',name:''});
    useEffect(()=>{
        axios.get('/category/show',{ params : { whoCall: 'admin'} })
            .then((res)=>{
                if(res.data.success === true){
                    setCategory(res.data.category);
                }
            })
            .catch((error)=>{
                Notiflix.Report.failure("Category not Found","please come back later" , 'Cancel');
            })
    },[]);
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const params = {id}
                await productApi.detail(params)
                .then(res =>{
                    if(res.success === true){
                        setProductInput({
                            ...productInput,
                            name:res.product.name,
                            desc:res.product.desc,
                            slug:res.product.slug,
                            keyword:res.product.keyword,
                            display:res.product.display,
                            price:res.product.price,
                            qty:res.product.qty,
                            category_id:res.product.category_id,
                            sale_of:res.product.sale_of,
                            image:res.product.image,
                            type_display:res.product.type_display,
                            error_list:[],
                        }); 
                        setImageReview({ src: '/uploads/'+res.product.image });
                    }
                }).catch((error)=>{
                    Notiflix.Report.failure(error.response.data.message,`No product found with id "${id}" ` , 'Cancel');
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchProductDetail();
    }, []);
    const handleInput = (e)=>{
        setProductInput({...productInput,[e.target.name]: e.target.value})
    }
    const handelImage = (e)=>{
        e.preventDefault();
        $('#image_product').trigger('click') 
    }
    useEffect(() => {
        return () => {
            imageReview.src && URL.revokeObjectURL(imageReview.src);
        };
    }, [imageReview]);
    const changeHandleFile = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setImageReview({src: file.preview,file:e.target.files[0] ,name :e.target.files[0].name}); 
        
	};
    const handelSubmit = async (e)=>{
        e.preventDefault();
        Notiflix.Loading.hourglass("Loading data! Please wait...",{
            clickToClose: true,
            svgSize: '120px',
        });
        const formData = new FormData();
        for (const property in productInput) {
            formData.append(property, productInput[property]);
        }
		formData.append('id', id);
		formData.append('new_image', imageReview.file);
        
        await productApi.update(formData)
        .then(res =>{
            if(res.success === true)
            {
                Notiflix.Loading.remove(1000);
                setTimeout(() => {
                    Notiflix.Notify.success("Product has been updated to the database");
                }, 1200);
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
        })
        return false;
    };
    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Edit  Product</h1>
                            </div>
                            <div className="d-flex justify-content-between ">
                                <div>
                                    <Link to={'/admin/list-product'} className="btn btn-primary mb-4">List Product</Link>
                                    <Link to={'/admin/add-product'} className="btn btn-success mb-4 ml-4">Add Product</Link>
                                </div>
                                <div>
                                    <strong className="text-danger ml-4">Note*: </strong>
                                    <span className="text-warning">Price and quantity changes are not allowed at the time of receipt </span>
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
                                        <div className="col-sm-4 mb-3 mb-sm-0 d-flex flex-column ">
                                            <div className="ml-2">
                                                <label htmlFor="Null">Quantity:</label>
                                                <strong className="text-danger ml-4"> {productInput.qty} (Kg) </strong>
                                            </div>
                                            <span className="text-warning "> Can't change the quantity</span>
                                        </div>
                                        <div className="col-sm-4 mb-3 mb-sm-0 d-flex flex-column ">
                                            <div className="ml-2">
                                                <label htmlFor="Null">Price:</label>
                                                <strong className="text-danger ml-4"> {(productInput.price).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})} </strong>
                                            </div>
                                            <span className="text-warning ">Can't change the price</span>
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
                                    <div className="form-group text-center" >
                                        { imageReview && (<img src={imageReview.src} id='review-image' className=" img-thumbnail w-50" alt="..."/>)}
                                        <p>  Image : <i className="name_image"> {productInput.image}</i></p>
                                    </div>
                                
                                    <div className="form-row mt-5">
                                        <div className="form-group col-md-3">
                                            <button onClick={handelSubmit} className="btn btn-primary btn-user btn-block">
                                                Update Product
                                            </button>
                                        </div>
                                    </div>
                                    <input type="file" id="image_product" onChange={changeHandleFile} accept="image/*" style={{display:'none'}} name="image" className=" d-none " />
                                </form>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default DetailProduct