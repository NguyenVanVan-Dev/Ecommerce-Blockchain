import React,{useEffect, useState} from 'react'
import {Link,useNavigate} from "react-router-dom";
import $ from 'jquery'
import axios  from "axios";
import Notiflix from 'notiflix';
const ListContract = () => {
    const [contracts,setContract] = useState([]);
    useEffect(()=>{
        axios.get('/contract/show').then((res)=>{
            if(res.data.success === true){
                setContract(res.data.contract);
            }
        })
        .catch((error)=>{
            Notiflix.Report.failure("Contract not Found","please come back later" , 'Cancel');
        })
    },[])
    const handleRemoveContract = (id)=>{
        const data = {id};
        axios.post('/contract/delete',data).then((res)=>{
            if(res.data.success === true){
                Notiflix.Report.failure("Delete Contract Successfully","Contract has been remove from database" , 'Cancel');
                $('#'+id).remove()
            }
        })
    }
    return (
        <div className="mx-4">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-2">List Contract</h1>
                            </div>
                            <div className="">
                                <Link to={'/admin/add-contract'} className="btn btn-success mb-4">Add Contract</Link>
                            </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Wallet</th>
                                        <th scope="col" >Address</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contracts.map((contract,index)=>{
                                            return (<tr key={index} id={contract._id}>
                                                <th scope="row">{index+1}</th>
                                                <td>{contract.name}</td>
                                                <td>{contract.email}</td>
                                                <td>{contract.wallet}</td>
                                                <td  style={{ maxWidth: 250 }} title={contract.address} >{contract.address}</td>
                                                <td>
                                                    <button onClick={()=>{handleRemoveContract(contract._id)}} data-id={contract._id} className="btn btn-danger remove_cate"><i className="fas fa-trash pr-1"></i></button>
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

export default ListContract