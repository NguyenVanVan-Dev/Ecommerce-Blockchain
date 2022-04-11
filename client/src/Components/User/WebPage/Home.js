import React,{useEffect} from 'react'
import TopSlideCategory from "../TopSlideCategory";
import FeaturedProduct from "../FeaturedProduct";
import Banner from "../Banner";
import LastestSlideProduct from "../LastestSlideProduct";
import FromBog from "../FromBog";
const Home = ({handleAddCart}) => {
    useEffect(() => {
        let hero__item = document.querySelector(".hero__item");
        hero__item.style.display = 'block';
        let hero__categories = document.querySelector(".hero__categories ul");
        hero__categories.style.display = 'block';
    }, []);
    return (
        <div>
            <TopSlideCategory></TopSlideCategory>
            <FeaturedProduct handleAddCart={handleAddCart}></FeaturedProduct>
            <Banner></Banner>
            <LastestSlideProduct></LastestSlideProduct>
            <FromBog></FromBog>
        </div>
    )
}

export default Home