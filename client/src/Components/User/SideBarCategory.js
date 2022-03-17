import React,{useState, useEffect} from "react";
import $ from "jquery";
import axios from 'axios';
import Notiflix from 'notiflix';
const SideBarCategory = () =>{
    useEffect(() => {
        $('.hero__categories__all').on('click', function(){
            $('.hero__categories ul').slideToggle(400);
        });
        
    }, []);
    const [categories,setCategory] = useState([]);
    useEffect(()=>{
        axios.get('/category/show').then((res)=>{
            if(res.data.success === true){
                setCategory(res.data.category);
            }
        })
        .catch((error)=>{
            Notiflix.Report.failure("Category not Found","please come back later" , 'Cancel');
        })
    },[])
    return (
        <section className="hero">
            <div className="container">
            <div className="row">
                <div className="col-lg-3">
                <div className="hero__categories">
                    <div className="hero__categories__all">
                    <i className="fa fa-bars" />
                    <span>All departments</span>
                    </div>
                    <ul>
                        {categories.map((category,index)=>{
                            return (
                                <li key={index}><a href="#">{category.name}</a></li>
                            )
                        })}
                    </ul>
                </div>
                </div>
                <div className="col-lg-9">
                    <div className="hero__search">
                        <div className="hero__search__form">
                        <form action="#">
                            <div className="hero__search__categories">
                            All Categories
                            <span className="arrow_carrot-down" />
                            </div>
                            <input type="text" placeholder="What do yo u need?" />
                            <button type="submit" className="site-btn">SEARCH</button>
                        </form>
                        </div>
                        <div className="hero__search__phone">
                        <div className="hero__search__phone__icon">
                            <i className="fa fa-phone" />
                        </div>
                        <div className="hero__search__phone__text">
                            <h5>+65 11.188.888</h5>
                            <span>support 24/7 time</span>
                        </div>
                        </div>
                    </div>
                    <div className="hero__item set-bg" data-setbg={`/UI/img/hero/banner.jpg`}>
                        <div className="hero__text">
                        <span>FRUIT FRESH</span>
                        <h2>Vegetable <br />100% Organic</h2>
                        <p>Free Pickup and Delivery Available</p>
                        <a href="#" className="primary-btn">SHOP NOW</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default SideBarCategory;