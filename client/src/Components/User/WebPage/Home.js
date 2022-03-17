import React from 'react'
import TopSlideCategory from "../TopSlideCategory";
import FeaturedProduct from "../FeaturedProduct";
import Banner from "../Banner";
import LastestSlideProduct from "../LastestSlideProduct";
import FromBog from "../FromBog";
const Home = ({handleAddCart}) => {
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