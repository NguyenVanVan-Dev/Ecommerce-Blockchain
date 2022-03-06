import React,{ useEffect,useLayoutEffect,useState} from "react";
import OwlCarousel from 'react-owl-carousel';
import axios from "axios";
import Notiflix from 'notiflix';

const LastestSlideProduct = () => {
    const [products,setProducts] = useState();
    useEffect(() => {
        axios.get('/product/show',{ params : {type : 'latest' } })
            .then((res)=>{
                if(res.data.success === true){
                    setProducts(res.data.products);
                }
            })
            .catch((error)=>{ 
                Notiflix.Report.failure("Product not Found","please come back later" , 'Cancel');
            })
    }, []);
    return (
        <section className="latest-product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6"> 
                    <div className="latest-product__text">
                        <h4>Latest Products</h4>
                        {
                         products && <OwlCarousel className="latest-product__slider owl-carousel"
                                        loop 
                                        margin={10} 
                                        nav
                                        items="1"
                                        autoplay
                                        animateOut={"fadeOut"}
                                        smartSpeed= "1200"
                                    
                                    >
                                        <div className="latest-prdouct__slider__item">
                                            {
                                                products.map((product)=>{
                                                    let price = product.price;
                                                    return ( <a key={product._id} href="#" className="latest-product__item">
                                                                <div className="latest-product__item__pic">
                                                                    <img src={`uploads/${product.image}`} alt="" />
                                                                </div>
                                                                <div className="latest-product__item__text">
                                                                    <h6>{product.name}</h6>
                                                                    <span>{price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                                                                </div>
                                                            </a>)
                                                })
                                            }
                                        </div>
                                        <div className="latest-prdouct__slider__item">
                                            <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-1.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                            </a>
                                            <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-2.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                            </a>
                                            <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-3.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                            </a>
                                        </div>
                                    </OwlCarousel>
                        }
                    </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                    <div className="latest-product__text">
                        <h4>Top Rated Products</h4>
                        <OwlCarousel className="latest-product__slider owl-carousel"
                            loop 
                            margin={10} 
                            nav
                            items="1"
                            autoplay
                            animateOut={"fadeOut"}
                            smartSpeed= "1200"

                        >
                            <div className="latest-prdouct__slider__item">
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-1.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-2.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-3.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                            </div>
                            <div className="latest-prdouct__slider__item">
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-1.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-2.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-3.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                            </div>
                        </OwlCarousel>
                    </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                    <div className="latest-product__text">
                        <h4>Review Products</h4>
                        <OwlCarousel className="latest-product__slider owl-carousel"
                            loop 
                            margin={10} 
                            nav
                            items="1"
                            autoplay
                            animateOut={"fadeOut"}
                            smartSpeed= "1200"

                        >
                            <div className="latest-prdouct__slider__item">
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-1.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-2.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-3.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                            </div>
                            <div className="latest-prdouct__slider__item">
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-1.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-2.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                                <a href="#" className="latest-product__item">
                                <div className="latest-product__item__pic">
                                    <img src="img/latest-product/lp-3.jpg" alt="" />
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>Crab Pool Security</h6>
                                    <span>$30.00</span>
                                </div>
                                </a>
                            </div>
                        </OwlCarousel>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LastestSlideProduct