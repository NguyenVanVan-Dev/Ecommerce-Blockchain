import React ,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import axios  from "axios";
import Notiflix from 'notiflix';
import $ from 'jquery'

function AddProduct() {
    const [categories,setCategory] = useState([]);
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
        type_display:1,
        error_list:{},
    })
    const [imageReview,setImageReview] = useState({
        src: '',
    });
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
        
        const reader = new FileReader();
        reader.onload = function(){
            const result = reader.result;
            setImageReview({src: result});
        }
        reader.readAsDataURL(e.target.files[0]);
        $('.name_image').text(e.target.files[0].name);
        setContentFile(e);
	};
    const setContentFile = (e)=>{
        setProductInput({
            ...productInput,
            [e.target.name]: e.target.files[0],
            error_list:{
                ...productInput.error_list,
                [e.target.name]: '',
            }
        })
    }
    const handelSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();

		formData.append('name', productInput.name);
		formData.append('desc', productInput.desc);
		formData.append('slug', productInput.slug);
		formData.append('keyword', productInput.keyword);
		formData.append('display', productInput.display);
		formData.append('type', productInput.type_display);
		formData.append('category_id', productInput.category_id);
		formData.append('image', productInput.image);
		formData.append('price', productInput.price);
		formData.append('qty', productInput.qty);

        axios.post('/product/store',formData).then(res =>{
            if(res.data.success === true)
            {
                setProductInput({
                    name:'',
                    desc:'',
                    slug:'',
                    keyword:'',
                    price:'',
                    qty:'',
                    image:'',
                    category_id:0,
                    display:1,
                    type_display:1,
                    error_list:[],
                });
                Notiflix.Report.success(res.data.message,"Product has been added to the database" , 'Cancel');
            }
        }).catch((error)=>{
            console.log(error.response)
            if(error.response.data.error){
                Notiflix.Report.failure(error.response.data.message,error.response.data.error , 'Cancel');
            }
            if(error.response.data.listError){ 
                setProductInput((prev)=>{
                    return {...prev,error_list: error.response.data.listError}
                });
            }
        })
        return false; // turnoff reload function for "multer" lib
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
                                <h1 className="h4 text-gray-900 mb-4">Add  Product</h1>
                            </div>
                            <div className="">
                                <Link to={'/admin/list-product'} className="btn btn-primary mb-4">List Product</Link>
                            </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" onChange={handleInput} value={productInput.name} name="name" className="form-control form-control-user" id="exampleFirstName" placeholder="Product Name" />
                                            <span className="text-danger small">{productInput.error_list.name}</span>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" onChange={handleInput} value={productInput.slug} name="slug" className="form-control form-control-user"  placeholder="Product Slug" />
                                            <span className="text-danger small">{productInput.error_list.slug}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-4 mb-3 mb-sm-0">
                                            <input type="text" onChange={handleInput} value={productInput.qty} name="qty" min='0' max='100000' className="form-control form-control-user" id="exampleFirstName" placeholder="Product Quantity (Kg)" />
                                            {/* <span className="text-danger small">{productInput.error_list.name}</span> */}
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" onChange={handleInput} value={productInput.price} name="price" min='0'  className="form-control form-control-user"  placeholder="Product Price (VNĐ)" />
                                            {/* <span className="text-danger small">{productInput.error_list.slug}</span> */}
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
                                        <img src={imageReview.src} id='review-image' className=" img-thumbnail w-50" alt="..."/>
                                        <p>  Image : <i className="name_image"></i></p>
                                    </div>
                                    <div className="form-row mt-5">
                                        <div className="form-group col-md-3">
                                            <button onClick={handelSubmit} className="btn btn-primary btn-user btn-block">
                                                Add Product
                                            </button>
                                        </div>
                                    </div>
                                    <input type="file" id="image_product" onChange={changeHandleFile} accept="*" style={{display:'none'}} name="image" className="form-control form-control-user d-none "  placeholder="Product " />
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