import React,{useEffect, useState} from 'react'
import {Link,useNavigate} from "react-router-dom";
import $ from 'jquery'
import axios  from "axios";
import Notiflix from 'notiflix';
const ListCategory = () => {
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
    const handleRemoveCategory = (id)=>{
        const data = {id};
        axios.post('/category/delete',data).then((res)=>{
            if(res.data.success === true){
                Notiflix.Report.failure("Delete Category Successfully","Category has been remove from database" , 'Cancel');
                $('#'+id).remove()
            }
        })
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
                                <h1 className="h4 text-gray-900 mb-2">List Category Product</h1>
                            </div>
                            <div className="">
                                <Link to={'/admin/add-category'} className="btn btn-success mb-4">Add Category</Link>
                            </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Slug</th>
                                        <th scope="col">Display</th>
                                        <th scope="col" >Description</th>
                                        <th scope="col">Keyword</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map((category,index)=>{
                                            return (<tr key={index} id={category._id}>
                                                <th scope="row">{index+1}</th>
                                                <td>{category.name}</td>
                                                <td>{category.slug}</td>
                                                <td>{category.display}</td>
                                                <td  style={{ maxWidth: 250 }} title={category.desc} >{category.desc}</td>
                                                <td>{category.keyword}</td>
                                                <td>
                                                    <Link to={'/admin/category/'+category._id} className="btn btn-info mr-1 mb-1"><i className="fas fa-edit"></i></Link>
                                                    <button onClick={()=>{handleRemoveCategory(category._id)}} data-id={category._id} className="btn btn-danger remove_cate"><i className="fas fa-trash pr-1"></i></button>
                                                </td>
                                            </tr>)
                                        })
                                    }
                                    
                                    
                                </tbody>
                            </table>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCategory