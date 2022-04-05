import React ,{useEffect}from "react";
import { Outlet,useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Manage/Dashboard/Sidebar";
import Topbar from "../../Components/Manage/Dashboard/Topbar";
import Footer from "../../Components/Manage/Dashboard/Footer";
import ModalLogout from "../../Components/Manage/Dashboard/ModalLogout";
import { Web3Provider} from "../../Providers";
const MasterLayout = () =>{
    let navigate = useNavigate();
    useEffect(() => {
        if ( !localStorage.getItem('auth_token')) return navigate('/admin/login');
        return; 
    }, []);
    return (
       <Web3Provider>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar/>
                        <Outlet />
                    </div>
                    <Footer></Footer>
                </div>
                <ModalLogout></ModalLogout>
            </div>
       </Web3Provider>
    )
}


export default MasterLayout;