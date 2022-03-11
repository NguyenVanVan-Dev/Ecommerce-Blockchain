import React,{ useState,useEffect} from "react";
import { Link, useNavigate,useParams} from "react-router-dom";
import axios  from "axios";
import Notiflix from 'notiflix';

const ResetPassword = () =>{
    const { token } = useParams();
    let navigate = useNavigate();
    const [loginInput, setLoginInput] = useState({
        password:'',
        password_confirm:'',
    });
    const handleInput = (e)=> {
        setLoginInput({...loginInput,[e.target.name]: e.target.value});
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(loginInput.password !== loginInput.password_confirm)
        {
            setLoginInput({
                password:'',
                password_confirm:'',
            })
            Notiflix.Report.failure('Reset Password Failure',"Password and confirmation password do not match", 'Cancel');
        } else {
            let data = {
                password_confirm:loginInput.password_confirm,
                password:loginInput.password,
                token
            };
            axios.put('/admin/reset-password',data).then(res =>{
                if(res.data.success === true ){
                    localStorage.setItem('auth_name',res.data.info.name);
                    localStorage.setItem('auth_token',res.data.accessToken);
                    setLoginInput({...loginInput,error_list:[]});
                    Notiflix.Report.success('Reset Password Successfully', `"Welcome to Ecommerce-BlockChain."<br/><br/>-${res.data.info.name}`, 'Cancel');
                    navigate('/admin/dashboard');
                }
            }).catch((error)=>{
                Notiflix.Report.failure('Reset Password Failure',error.response.data.message, 'Cancel');
            });
        }
       
    };
    return (   
        <div className="container">
            {/* Outer Row */}
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                        <div className="col-lg-6">
                        <div className="p-5">
                            <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Reset Password!</h1>
                            </div>
                            <form className="user">
                                <div className="form-group">
                                    <input type="password" onChange={handleInput} value={loginInput.password} name="password" className="form-control form-control-user"  placeholder="Password" />    
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={handleInput} value={loginInput.password_confirm} name="password_confirm" className="form-control form-control-user"  placeholder="Password Confirm " />
                                </div>
                                <button onClick={handleSubmit} className="btn btn-primary btn-user btn-block">
                                    Reset Password
                                </button>
                                <hr />
                            </form>
                            <hr />
                            <div className="text-center">
                                <Link className="small"  to="/admin/register">Create an Account!</Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword