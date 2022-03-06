import React from "react";
import $ from 'jquery';
import TopBar from "../../Components/User/Topbar"
import Header from "../../Components/User/Header";
import SideBarCategory from "../../Components/User/SideBarCategory";
import TopSlideCategory from "../../Components/User/TopSlideCategory";
import FeaturedProduct from "../../Components/User/FeaturedProduct";
import Banner from "../../Components/User/Banner";
import LastestSlideProduct from "../../Components/User/LastestSlideProduct";
import FromBog from "../../Components/User/FromBog";
import Footer from "../../Components/User/Footer";
const MasterLayout = () =>{
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });
    return (
       <>
        <div>
            <div id="preloder">
                <div className="loader" />
            </div>
            <div className="humberger__menu__overlay" />
            <TopBar></TopBar>
            
            <Header></Header>
            <SideBarCategory></SideBarCategory>
            <TopSlideCategory></TopSlideCategory>
            <FeaturedProduct></FeaturedProduct>
            <Banner></Banner>
            <LastestSlideProduct></LastestSlideProduct>
            <FromBog></FromBog>
            <Footer></Footer>
        </div>
       </>
    )
}

export default MasterLayout;