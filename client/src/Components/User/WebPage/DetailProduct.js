import React ,{useLayoutEffect, useState,useEffect} from "react";
import {Link,useParams} from "react-router-dom";
import Notiflix from 'notiflix';
import OwlCarousel from 'react-owl-carousel';
import productApi from '../../../Api/productApi'
function DetailProduct({handleAddCart,setCartItems}) {
    const {id} = useParams();
    const [detailProduct, setDetailProduct] = useState();
    const [relatedProduct, setRelatedProduct] = useState();
    const [qty, setQty] = useState(1);
    useEffect(() => {
        const getProduct = async () => {
            let params = {id}
            await productApi.detail(params)
            .then((data) => {
                params = {
                    type: "related-product",
                    category_id: data.product.category_id,
                    product_id: id,
                }
                productApi.getAll(params).then((result) => {
                    setRelatedProduct(result.products);
                    setDetailProduct(data.product);
                    
                })
            })
            .catch((err) => {
                Notiflix.Report.failure("Product Detail",err.message, 'Cancel');
            })
        }
        const setBg = document.querySelectorAll('.set-bg');
        for (const item of setBg) {
            let bg = item.getAttribute('data-setbg');
            item.style.backgroundImage = `url('${bg}')`;
        }
        let hero__item = document.querySelector(".hero__item");
        hero__item.style.display = 'none';
        let hero__categories = document.querySelector(".hero__categories ul");
        hero__categories.style.display = 'none';
        getProduct();
       
    }, [id]);
    const handleQty = (e)=>{
        setQty(e.target.value);
    };
    return (
        <div>
            <section className="breadcrumb-section set-bg" data-setbg="/UI/img/breadcrumb.jpg">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                    <div className="breadcrumb__text">
                        <h2>Vegetable’s Package</h2>
                        <div className="breadcrumb__option">
                        <a href="./index.html">Home</a>
                        <a href="./index.html">Vegetables</a>
                        <span>Vegetable’s Package</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            { detailProduct &&
            ( <section className="product-details spad">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__pic">
                            <div className="product__details__pic__item">
                            <img className="product__details__pic__item--large" src={`/uploads/${detailProduct.image}`}  alt="naice" />
                            </div>
                            <OwlCarousel className='owl-theme'
                                loop 
                                margin={10} 
                            
                                items="4"
                                dots= "false"
                                autoplay
                                animateOut={"fadeOut"}
                            >  
                            { relatedProduct &&  
                            relatedProduct.map((product) => {
                                return (
                                    <img key={product._id} data-imgbigurl={`/uploads/${product.image}`} src={`/uploads/${product.image}`} style={{height: "140px"}} alt="naice" />
                                )
                            })
                            }
                                
                            </OwlCarousel>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                    <div className="product__details__text">
                        <h3>{(detailProduct.name) } </h3>
                        <div className="product__details__rating">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half-o" />
                        <span>(18 reviews)</span>
                        </div>
                        <div className="product__details__price">{(detailProduct.price).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) }</div>
                        <p>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam
                        vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet
                        quam vehicula elementum sed sit amet dui. Proin eget tortor risus.</p>
                        <div className="product__details__quantity">
                        <div className="quantity">
                            <div className="pro-qty">
                            <input type="text" defaultValue={1} onChange={(e) => handleQty(e)} />
                            </div>
                        </div>
                        </div>
                        <Link to={""} className="primary-btn" onClick={(e)=>{ handleAddCart(detailProduct,qty)}}>ADD TO CARD</Link>
                        <a href="#" className="heart-icon"><span className="icon_heart_alt" /></a>
                        <ul>
                        <li><b>Availability</b> <span>In Stock</span></li>
                        <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                        <li><b>Weight</b> <span>0.5 kg</span></li>
                        <li><b>Share on</b>
                            <div className="share">
                            <a href="#"><i className="fa fa-facebook" /></a>
                            <a href="#"><i className="fa fa-twitter" /></a>
                            <a href="#"><i className="fa fa-instagram" /></a>
                            <a href="#"><i className="fa fa-pinterest" /></a>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="col-lg-12">
                    <div className="product__details__tab">
                        <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab" aria-selected="true">Description</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab" aria-selected="false">Information</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab" aria-selected="false">Reviews <span>(1)</span></a>
                        </li>
                        </ul>
                        <div className="tab-content">
                        <div className="tab-pane active" id="tabs-1" role="tabpanel">
                            <div className="product__details__tab__desc">
                            <h6>Products Infomation</h6>
                            <p>{(detailProduct.desc)}</p>
                            </div>
                        </div>
                        <div className="tab-pane" id="tabs-2" role="tabpanel">
                            <div className="product__details__tab__desc">
                            <h6>Products Infomation</h6>
                            <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                                Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.
                                Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam
                                sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo
                                eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.
                                Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent
                                sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac
                                diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante
                                ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                                Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                                Proin eget tortor risus.</p>
                            <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem
                                ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet
                                elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum
                                porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus
                                nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                            </div>
                        </div>
                        <div className="tab-pane" id="tabs-3" role="tabpanel">
                            <div className="product__details__tab__desc">
                            <h6>Products Infomation</h6>
                            <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                                Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.
                                Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam
                                sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo
                                eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.
                                Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent
                                sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac
                                diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante
                                ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                                Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                                Proin eget tortor risus.</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>)}
            <section className="related-product">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title related__product__title">
                        <h2>Related Product</h2>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        <OwlCarousel className='owl-theme categories__slider'
                            loop 
                            margin={10} 
                            nav
                            items="4"
                            autoplay
                            animateOut={"fadeOut"}
                        >  
                        { relatedProduct &&  
                        relatedProduct.map((product) => {
                            return (
                                <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg={`/uploads/${product.image}`}>
                                        <ul className="product__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart" /></a></li>
                                        <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                        <li onClick={()=>{handleAddCart(product)}}>
                                            <Link to=" "><i className="fa fa-shopping-cart" /></Link>
                                        </li>
                                        </ul>
                                    </div>
                                    <Link to={`/product/${product._id}`}>
                                        <div className="featured__item__text">
                                            <h6>{product.name}</h6>
                                            <h5>{(product.price).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</h5>
                                        </div>
                                    </Link>
                                    </div>
                                </div>
                            )
                        })
                        }
                            
                        </OwlCarousel>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default DetailProduct