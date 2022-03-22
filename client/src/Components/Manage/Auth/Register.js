import React,{ useState,useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
// import axios  from "axios";
import Notiflix from 'notiflix';
import authorizationApi from "../../../Api/authApi";
const Register = () =>{
    let navigate = useNavigate();
    useEffect(() => {
        if ( localStorage.getItem('auth_token')) return navigate('/admin/dashboard');
        return; 
    }, []);
    const [registerInput, setRegisterInput] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        repeatpass:'',
        error_list:[],
    })
    const handleInput = (e)=>{
        setRegisterInput({...registerInput,[e.target.name]: e.target.value})
    }
    const handelSubmit =async  (e)=>{
        e.preventDefault();
        let data ={
            email:registerInput.email,
            password:registerInput.password,
            name:registerInput.name,
            phone:registerInput.phone
        };
        await authorizationApi.register(data)
        // axios.post('/admin/register',data)
        .then(res =>{
            if(res.success === true ){
                localStorage.setItem('auth_name',res.info.name);
                localStorage.setItem('auth_token',res.accessToken);
                localStorage.setItem('auth_token_refesh',res.refeshToken);
                Notiflix.Notify.success('Register Successfully');
                navigate('/admin/dashboard');
                setTimeout(() => {
                    Notiflix.Confirm.show('Login session expired','Do you want to login again?','Yes','No',
                        () => {
                            handleLoginAgain(res.info.id);
                        },
                        () => {
                            localStorage.removeItem('auth_token');
                            localStorage.removeItem('auth_name');
                            localStorage.removeItem('auth_avatar');
                            localStorage.removeItem('auth_token_refesh');
                            navigate('/admin/login');
                        },
                    );
                }, 10800000);
            }
        })
        .catch((error)=>{
            if(error.response.data.listError){
                setRegisterInput((prev)=>{
                    return {...prev,error_list: error.response.data.listError}
                });
            }
        });
    }
    const handleLoginAgain = (id)=>{
        const params = {id}
        authorizationApi.resetLogin(params)
        .then((data)=> {
            if(data.success == true){
                localStorage.setItem('auth_name',data.info.name);
                localStorage.setItem('auth_token',data.accessToken);
                localStorage.setItem('auth_token_refesh',data.refeshToken);
                Notiflix.Notify.success('Login Successfully');
                setTimeout(() => {
                    Notiflix.Confirm.show('Login session expired','Do you want to login again?','Yes','No',
                        () => {
                            handleLoginAgain(data.info.id);
                        },
                        () => {
                            localStorage.removeItem('auth_token');
                            localStorage.removeItem('auth_name');
                            localStorage.removeItem('auth_avatar');
                            localStorage.removeItem('auth_token_refesh');
                            navigate('/admin/login');
                        },
                    );
                }, 10800000);
            }
        });
    }  
    return (    
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                {/* Nested Row within Card Body */}
                <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                <div className="col-lg-7">
                    <div className="p-5">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
                    <form className="user">
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <input type="text" onChange={handleInput} value={registerInput.name} name="name" className="form-control form-control-user" id="exampleFirstName" placeholder="Your Name" />
                                <span className="text-danger small">{registerInput.error_list.name}</span>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" onChange={handleInput} value={registerInput.phone} name="phone" className="form-control form-control-user"  placeholder="Number Phone" />
                                <span className="text-danger small">{registerInput.error_list.phone}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email"  onChange={handleInput} value={registerInput.email} name="email" className="form-control form-control-user" id="exampleInputEmail"
                                placeholder="Email Address"/>
                            <span className="text-danger small">{registerInput.error_list.email}</span>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <input type="password" onChange={handleInput} value={registerInput.password} name="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                {/* <span className="text-danger small">{registerInput.error_list.password}</span> */}
                            </div>
                            <div className="col-sm-6">
                                <input type="password" onChange={handleInput} value={registerInput.repeatpass} name="repeatpass" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" />
                            </div>
                        </div>
                        <button onClick={handelSubmit} className="btn btn-primary btn-user btn-block">
                                Register Account
                        </button>
                        <hr />
                        <a href="index.html" className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw" /> Register with Google
                        </a>
                        <a href="index.html" className="btn btn-facebook btn-user btn-block">
                        <i className="fab fa-facebook-f fa-fw" /> Register with Facebook
                        </a>
                    </form>
                    <hr />
                    <div className="text-center">
                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div className="text-center">
                        <Link className="small" to="/admin/login">Already have an account? Login!</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Register;