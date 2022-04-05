import React,{useEffect} from "react";

import $ from 'jquery';
import TopBar from "../../Components/User/Topbar"
import Header from "../../Components/User/Header";
import SideBarCategory from "../../Components/User/SideBarCategory";
import Footer from "../../Components/User/Footer";
import { Outlet } from "react-router-dom";
import { Web3Provider } from "../../Providers";
import { UserProvider } from "../../Providers";
const MasterLayout = ({cartItems}) =>{
    
    useEffect(() => {
        $('.set-bg').each(function () {
            var bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });
    });
    return (
       <Web3Provider>
            <UserProvider>
            <div>
                <div id="preloder">
                    <div className="loader" />
                </div>
                <div className="humberger__menu__overlay" />
                <TopBar></TopBar>
                
                <Header cartItems={cartItems}></Header>
                <SideBarCategory></SideBarCategory>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
            </UserProvider>
       </Web3Provider>
    )
}

export default MasterLayout;