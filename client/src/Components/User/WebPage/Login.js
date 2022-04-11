import React,{useEffect,useState} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Notiflix from "notiflix";
import authorizationApi from '../../../Api/authApi';
import { useUser } from "../../../Providers";
function Login() {
    const navigate = useNavigate();
    const { setUser } = useUser();
    useEffect(() => {
        if ( localStorage.getItem('user')) return navigate('/');
    },[]);
    const [inputloginUser, setInputLoginUser] = useState({
        email:'',
        password:'',
        error_list:[],
    });
    useEffect(() => {
        const setBg = document.querySelectorAll('.set-bg');
        for (const item of setBg) {
            let bg = item.getAttribute('data-setbg');
            item.style.backgroundImage = `url('${bg}')`;
        }
        let hero__item = document.querySelector(".hero__item");
        hero__item.style.display = 'none';
        let hero__categories = document.querySelector(".hero__categories ul");
        hero__categories.style.display = 'none';
    }, []);

    const handleInput = (e) =>{
        setInputLoginUser({...inputloginUser, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            email:inputloginUser.email,
            password:inputloginUser.password,
        };
        authorizationApi.loginUser(params)
        .then((data) => {
            if(data.success === true ){
                localStorage.setItem('user',JSON.stringify(data.info));
                Notiflix.Notify.success('Login Successfully');
                setUser(data.info);
                navigate('/');
            }
        })
        .catch((err) => {
            Notiflix.Report.failure('Login Failed', err.response.data.message,'Cancel');
        })
    }
    
  return (
   <div>
       <section className="breadcrumb-section set-bg" data-setbg="/UI/img/breadcrumb.jpg">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                    <div className="breadcrumb__text">
                        <h2>Vegetable’s Package</h2>
                        <div className="breadcrumb__option">
                        <a href="./index.html">Home</a>
                        <a href="./index.html">Vegetables</a>
                        <span>Vegetable’s Package</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        <section className="product-details spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-user" />
                    <div className="col-lg-6">
                        <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            </div>
                            <form className="user">
                                <div className="form-group">
                                    <input type="email"  onChange={handleInput} value={inputloginUser.email}  name="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                    <span className="text-danger small">{inputloginUser.error_list.email}</span>
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={handleInput} value={inputloginUser.password}  name="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                    <span className="text-danger small">{inputloginUser.error_list.password}</span>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox small">
                                    <input type="checkbox" className="custom-control-input" id="customCheck" />
                                    <label className="custom-control-label" htmlFor="customCheck">Remember
                                        Me</label>
                                    </div>
                                </div>
                                <button onClick={handleSubmit} className="btn btn-success btn-user btn-block">
                                    Login
                                </button>
                                <hr />
                            </form>
                            <div className="text-center">
                                <Link className="small" to="/forgot-password">Forgot Password?</Link>
                            </div>
                            <div className="text-center">
                                <Link className="small"  to="/register">Create an Account!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

  )
}

export default Login