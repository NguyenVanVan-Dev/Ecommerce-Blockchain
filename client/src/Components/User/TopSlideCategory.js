import React,{ useState,useEffect} from "react";
import OwlCarousel from 'react-owl-carousel';

import $ from 'jquery';
const TopSlideCategory = () =>{
    useEffect(() => {
        $('.set-bg').each(function () {
            var bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });
    }, []);
    return (
        <section className="categories">
            <div className="container">
            <div className="row">
                <OwlCarousel className='owl-theme categories__slider'
                    loop 
                    margin={10} 
                    nav
                    items="5"
                    autoplay
                    animateOut={"fadeOut"}
                >  
                    <div className="col-lg-3">
                        <div className="categories__item set-bg" data-setbg={`/UI/img/categories/cat-1.jpg`} >
                       
                        <h5><a href="#">Fresh Fruit</a></h5>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="categories__item set-bg" data-setbg={`/UI/img/categories/cat-2.jpg`}>
                        <h5><a href="#">Dried Fruit</a></h5>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="categories__item set-bg" data-setbg={`/UI/img/categories/cat-3.jpg`}>
                        <h5><a href="#">Vegetables</a></h5>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="categories__item set-bg" data-setbg={`/UI/img/categories/cat-4.jpg`}>
                        <h5><a href="#">drink fruits</a></h5>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="categories__item set-bg" data-setbg={`/UI/img/categories/cat-5.jpg`}>
                        <h5><a href="#">drink fruits</a></h5>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
            </div>
        </section>
    )
}

export default TopSlideCategory;