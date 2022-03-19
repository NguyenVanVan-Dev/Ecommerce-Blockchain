import React ,{useState} from "react";
import {Link} from "react-router-dom";
import axios  from "axios";
import Notiflix from 'notiflix';
const AddContract = ()=>{
    // let navigate = useNavigate();
    const [contractInput, setContractInput] = useState({
        name:'',
        email:'',
        wallet:'',
        address:'',
        error_list:[],
    })
    const handleInput = (e)=>{
        setContractInput({...contractInput,[e.target.name]: e.target.value})
    }
    const handelSubmit = (e)=>{
        e.preventDefault();
        let data ={
            name:contractInput.name,
            email:contractInput.email,
            wallet:contractInput.wallet,
            address:contractInput.address,
        };
        axios.post('/contract/store',data).then(res =>{
            if(res.data.success === true)
            {
                setContractInput({
                    name:'',
                    email:'',
                    wallet:'',
                    address:'',
                    error_list:[],
                });
                Notiflix.Report.success(res.data.message,"Contract has been added to the database" , 'Cancel');
            }
        }).catch((error)=>{
            console.log(error.response)
            if(error.response.data.listError){
                setContractInput((prev)=>{
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
                                <h1 className="h4 text-gray-900 mb-4">Add Contract</h1>
                            </div>
                            <div className="">
                                <Link to={'/admin/list-contract'} className="btn btn-primary mb-4">List Contract</Link>
                            </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" onChange={handleInput} value={contractInput.name} name="name" className="form-control form-control-user" id="exampleFirstName" placeholder="Contract Name" />
                                            <span className="text-danger small">{contractInput.error_list.name}</span>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" onChange={handleInput} value={contractInput.wallet} name="wallet" className="form-control form-control-user"  placeholder="Contract wallet" />
                                            <span className="text-danger small">{contractInput.error_list.wallet}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" onChange={handleInput} value={contractInput.email} name="email" className="form-control form-control-user"  placeholder="Contract email" />
                                        <span className="text-danger small">{contractInput.error_list.email}</span>
                                    </div>
                                   
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                        <label htmlFor="SelectAnHien">Address:</label>
                                        <input type="text" onChange={handleInput} value={contractInput.address} name="address" className="form-control form-control-user " id="exampleInputPassword" placeholder="Key Word" />
                                            <span className="text-danger small">{contractInput.error_list.address}</span>
                                        </div>
                                       
                                    </div>
                                    <div className="form-row mt-5">
                                        <div className="form-group col-md-3">
                                            <button onClick={handelSubmit} className="btn btn-primary btn-user btn-block">
                                                  Add Contract
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

export default AddContract;