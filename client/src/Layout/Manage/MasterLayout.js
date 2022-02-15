import React from "react";
import Sidebar from "../../Components/Manage/Sidebar";
import Topbar from "../../Components/Manage/Topbar";
import { Outlet } from "react-router-dom";


const MasterLayout = () =>{
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