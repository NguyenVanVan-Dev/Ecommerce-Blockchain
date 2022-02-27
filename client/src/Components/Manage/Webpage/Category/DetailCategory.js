import React ,{useLayoutEffect, useState} from "react";
import {Link,useParams} from "react-router-dom";
import axios  from "axios";
import Notiflix from 'notiflix';
function DetailCategory() {
    const { id } = useParams();
    const [categoryInput, setCategoryInput] = useState({
        id:id,
        name:'',
        desc:'',
        slug:'',
        keyword:'',
        display:1,
        error_list:[],
    })
    useLayoutEffect(()=>{
        axios.get('/category/detail',{ 
            params : { 
              id,
            } 
            }).then(res =>{
            if(res.data.success === true)
            {
                setCategoryInput({
                    ...categoryInput,
                    name:res.data.category.name,
                    desc:res.data.category.desc,
                    slug:res.data.category.slug,
                    keyword:res.data.category.keyword,
                    display:res.data.category.display,
                    error_list:[],
                });
               
            }
        }).catch((error)=>{
            Notiflix.Report.failure(error.response.data.message,`No category found with id "${id}" ` , 'Cancel');
        })
    },[])
    
    const handleInput = (e)=>{
        setCategoryInput({...categoryInput,[e.target.name]: e.target.value})
    }
    const handelSubmit = (e)=>{
        e.preventDefault();
        let data ={
            id:categoryInput.id,
            name:categoryInput.name,
            desc:categoryInput.desc,
            slug:categoryInput.slug,
            keyword:categoryInput.keyword,
            display:categoryInput.display, 
        };
        axios.put('/category/update',data).then(res =>{
            if(res.data.success === true)
            {
                Notiflix.Report.success(res.data.message,"Category has been updated to the database" , 'Cancel');
            }
        }).catch((error)=>{
            console.log(error.response)
            if(error.response.data.listError){
                setCategoryInput((prev)=>{
                    return {...prev,error_list: error.response.data.listError}
                });
            }
        })
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
                                <h1 className="h4 text-gray-900 mb-4">Edit Category Product</h1>
                            </div>
                            <div className="">
                                <Link to={'/admin/list-category'} className="btn btn-primary mb-4">List Category</Link>
                            </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" onChange={handleInput} value={categoryInput.name} name="name" className="form-control form-control-user" id="exampleFirstName" placeholder="Category Name" />
                                            <span className="text-danger small">{categoryInput.error_list.name}</span>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" onChange={handleInput} value={categoryInput.slug} name="slug" className="form-control form-control-user"  placeholder="Category Slug" />
                                            <span className="text-danger small">{categoryInput.error_list.slug}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <textarea type="text"  id="editor" onChange={handleInput} value={categoryInput.desc} name="desc" rows={10}  className="form-control" 
                                            placeholder="Category Description"/>
                                        <span className="text-danger small">{categoryInput.error_list.desc}</span>
                                    </div>
                                   
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                        <label htmlFor="SelectAnHien">Keyword</label>
                                        <input type="text" onChange={handleInput} value={categoryInput.keyword} name="keyword" className="form-control form-control-user " id="exampleInputPassword" placeholder="Key Word" />
                                            <span className="text-danger small">{categoryInput.error_list.keyword}</span>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="SelectAnHien">Display</label>
                                                <select name="display"  value={categoryInput.display} onChange={handleInput}  className="form-control input-sm mt-2 inputform">
                                                    <option value={0} className="optionform">Hidden</option>
                                                    <option value={1} className="optionform">Visible</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row mt-5">
                                        <div className="form-group col-md-3">
                                            <button onClick={handelSubmit} className="btn btn-info btn-user btn-block">
                                                  Update Category
                                            </button>
                                        </div>
                                   </div>
                                </form>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCategory