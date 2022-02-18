import React ,{useEffect}from "react";
import { useNavigate} from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Manage/Sidebar";
import Topbar from "../../Components/Manage/Topbar";

const MasterLayout = () =>{
    let navigate = useNavigate();
    useEffect(() => {
        if ( !localStorage.getItem('auth_token')) return navigate('/admin/login');
        return; 
    }, []);
    return (
        <div id="wrapper">
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar/>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default MasterLayout;