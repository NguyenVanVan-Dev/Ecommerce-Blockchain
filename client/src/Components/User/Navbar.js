import React from "react";
import { Link ,useNavigate } from "react-router-dom";

import axios  from "axios";
import Notiflix from 'notiflix';
const Navbar = () =>{
    let navigate = useNavigate();
    const  handleLogout =(e)=>{
        e.preventDefault();
        axios.post('/api/admin/logout').then(res =>{
            if(res.data.status === 200){
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_token');
                Notiflix.Report.success('Logout Successfully', '" Race-Laravel see you again."<br/><br/>-Vấn Nguyễn', 'Cancel');
                navigate('/admin/login');
            }
            
            }
        );
    }
    let AuthButton = '';
    let AuthName = '';

    if(!localStorage.getItem('auth_token'))
    {
        AuthName = ( <span className=""> Manager </span>)
        AuthButton =( <>
                        <Link className="dropdown-item" to="/admin/login">Login Admin</Link>
                        <Link className="dropdown-item" to="/admin/register">Register Admin</Link>
                    </>)
    }
    else
    {
        AuthName =(localStorage.getItem('auth_name'))
        AuthButton = (<>
                        
                        <Link className="dropdown-item" to="/admin/logout" onClick={handleLogout}>Logout</Link>
                    </>)
    }
    
    return (   
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
            <a className="navbar-brand" href="#">React-Laravel</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                </ul>
                
                <div className="mr-5">
                    <div className="nav-item dropdown">
                        <img src="https://cdn.vn.garenanow.com/web/lol-product/home/images/Lan_h3lpm3/10_2021/Rong/5150.jpg" className="rounded mr-2" alt="..." width="50px" />
                        <a className=" dropdown-toggle block" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                           {AuthName}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {AuthButton}
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;