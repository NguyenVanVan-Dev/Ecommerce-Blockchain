import React,{ useState,useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import axios  from "axios";
import Notiflix from 'notiflix';
import { GoogleLogin} from 'react-google-login';
const Login = () =>{
    let navigate = useNavigate();
    useEffect(() => {
        if ( localStorage.getItem('auth_token')) return navigate('/admin/dashboard');
    },[]);
    const [loginInput, setLoginInput] = useState({
        email:'',
        password:'',
        error_list:[],
    });
    const handleInput = (e)=> {
        setLoginInput({...loginInput,[e.target.name]: e.target.value});
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        let data = {
            email:loginInput.email,
            password:loginInput.password,
        };
        axios.post('/admin/login',data).then(res =>{
            if(res.data.success === true ){
                localStorage.setItem('auth_name',res.data.info.name);
                localStorage.setItem('auth_token',res.data.accessToken);
                setLoginInput({...loginInput,error_list:[]});
                Notiflix.Report.success('Login Successfully', `"Welcome to Ecommerce-BlockChain."<br/><br/>-${res.data.info.name}`, 'Cancel');
                navigate('/admin/dashboard');
            }
        }).catch((error)=>{
            Notiflix.Report.failure('Login Failure',error.response.data.message, 'Cancel');
        });
    };
    // Login with Google 
    const clientId = "208882485320-g05b5oih0v1925793k36goam0havrn4h.apps.googleusercontent.com";
    const onLoginSuccess = (res) => {  
        let data = {
            id:res.googleId
        }; 
        axios.post('/admin/login/google',data).then(result =>{
            if(result.data.success === true ){
                localStorage.setItem('auth_name',res.profileObj.name);
                localStorage.setItem('auth_token',result.data.accessToken); 
                localStorage.setItem('auth_avatar',res.profileObj.imageUrl);
                Notiflix.Report.success('Login Successfully', `"Welcome to Ecommerce-BlockChain."<br/><br/>-${res.profileObj.name}`, 'Cancel');
                navigate('/admin/dashboard');
            }
        }).catch((error)=>{
            Notiflix.Report.failure('Login Failure',error.response.data.message, 'Cancel');
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
                        <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                        <div className="col-lg-6">
                        <div className="p-5">
                            <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            </div>
                            <form className="user">
                            <div className="form-group">
                                <input type="email" onChange={handleInput} value={loginInput.email}  name="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                {/* <span className="text-danger small">{loginInput.error_list ? loginInput.error_list.email : "" }</span> */}
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={handleInput} value={loginInput.password} name="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                {/* <span className="text-danger small">{loginInput.error_list ?loginInput.error_list.password : ""}</span> */}
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox small">
                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                <label className="custom-control-label" htmlFor="customCheck">Remember
                                    Me</label>
                                </div>
                            </div>
                            <button onClick={handleSubmit} className="btn btn-primary btn-user btn-block">
                                Login
                            </button>
                            <hr />
                            <GoogleLogin
                                clientId= {clientId}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} className="btn btn-google btn-user btn-block" >Login with Google</button>
                                  )}
                                buttonText="Login"
                                onSuccess={onLoginSuccess}
                                onFailure={onLoginSuccess}
                                cookiePolicy={'single_host_origin'}
                            />
                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                            </a>
                            </form>
                            <hr />
                            <div className="text-center">
                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                            </div>
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

export default Login;