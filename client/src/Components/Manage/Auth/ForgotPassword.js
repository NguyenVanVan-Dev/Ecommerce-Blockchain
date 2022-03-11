import React,{ useState,useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import axios  from "axios";
import Notiflix from 'notiflix';

const ForgotPassword = () =>{
    let navigate = useNavigate();
    useEffect(() => {
        if ( localStorage.getItem('auth_token')) return navigate('/admin/dashboard');
    },[]);
    const [resetPassInput, setResetPassInput] = useState({
        email:'',
    });
    const handleInput = (e)=> {
        setResetPassInput({...resetPassInput,[e.target.name]: e.target.value});
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        let data = {
            email:resetPassInput.email,
        };
        axios.put('/admin/forgot-password',data).then(res =>{
            if(res.data.success === true ){
                Notiflix.Report.success('Get Link Successfully',`Password reset link has been sent to your Email: "${resetPassInput.email}"`, 'Cancel');
            }
        }).catch((error)=>{
            Notiflix.Report.failure('Get Link Failure',error.response.data.message, 'Cancel');
        });
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
                        <div className="col-lg-6 d-none d-lg-block bg-forgot-pass" />
                        <div className="col-lg-6">
                        <div className="p-5">
                            <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Forgot Password</h1>
                            </div>
                            <form className="user">
                            <div className="form-group">
                                <input type="email" onChange={handleInput} value={resetPassInput.email}  name="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                            </div>
                           
                            <button onClick={handleSubmit} className="btn btn-primary btn-user btn-block">
                                Get Link
                            </button>
                            <hr />
                            <Link to="/admin/login" className="btn btn-facebook btn-user btn-block">
                                <i className="fas fa-arrow-circle-left"></i> Back to login
                            </Link>
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

export default ForgotPassword