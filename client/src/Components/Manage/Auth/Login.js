import React,{ useState,useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import axios  from "axios";
import Notiflix from 'notiflix';
const Login = () =>{
    let navigate = useNavigate();
    useEffect(() => {
        if ( localStorage.getItem('auth_token')) return navigate('/');
        return; 
    }, []);
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
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/admin/login',data).then(res =>{
                if(res.data.status === 200){
                    setLoginInput({...loginInput,error_list:[]});
                    localStorage.setItem('auth_name',res.data.username);
                    localStorage.setItem('auth_token',res.data.token);
                    Notiflix.Report.success('Login Successfully', '"Welcome to Race-Laravel."<br/><br/>-Vấn Nguyễn', 'Cancel');
                    navigate('/');
                }
                else if(res.data.status === 401)
                {
                    Notiflix.Report.failure('Login Failure',"Email or Password Incorrect" , 'Cancel');
                }
                else 
                {
                    setLoginInput({...loginInput,error_list:res.data.validator_errors});
                    Notiflix.Report.failure('Login Failure',"Please enter all fields " , 'Cancel');
                }
            }
            );
        });
    }
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
                                <span className="text-danger small">{loginInput.error_list.email}</span>
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={handleInput} value={loginInput.password} name="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                <span className="text-danger small">{loginInput.error_list.password}</span>
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
                            <a href="index.html" className="btn btn-google btn-user btn-block">
                                <i className="fab fa-google fa-fw" /> Login with Google
                            </a>
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