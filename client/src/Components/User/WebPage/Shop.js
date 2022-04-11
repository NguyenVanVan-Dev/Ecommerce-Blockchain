import React,{ useEffect,useLayoutEffect,useState} from "react";
import OwlCarousel from 'react-owl-carousel';
import Notiflix from 'notiflix';
import { Link } from 'react-router-dom';
import productApi from '../../../Api/productApi';
import Pagination from "./Pagination";
function Shop() {
    const [discountProduct, setDiscountProduct] = useState();
    const [latestProducts,setLatestProducts] = useState();
    const [allProduct, setAllProduct] = useState();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        totalRows:0
    });
    const [filter, setFilter] = useState({
        page:1,
        limit:12,

    });
    useEffect(() => {
        const params = {
            type: 'sale-of'
        }
        productApi.getAll(params)
            .then((res)=>{
                if(res.success === true){
                    setDiscountProduct(res.products);
                    const setBg = document.querySelectorAll('.set-bg');
                    for (const item of setBg) {
                        let bg = item.getAttribute('data-setbg');
                        item.style.backgroundImage = `url('${bg}')`;
                    }
                    let hero__item = document.querySelector(".hero__item");
                    hero__item.style.display = 'none';
                    let hero__categories = document.querySelector(".hero__categories ul");
                    hero__categories.style.display = 'none';
                }
            })
            .catch((error)=>{ 
                Notiflix.Report.failure("Product not Found","please come back later" , 'Cancel');
            })
    }, []);
    useEffect(() => {
        const params = {
            type: 'normal',
            page:filter.page,
            limit:filter.limit
        }
        productApi.getAll(params)
            .then((res)=>{
                if(res.success === true){
                    setAllProduct(res.products);
                    const setBg = document.querySelectorAll('.set-bg');
                    for (const item of setBg) {
                        let bg = item.getAttribute('data-setbg');
                        item.style.backgroundImage = `url('${bg}')`;
                    }
                    setPagination(res.pagination)
                }
            })
            .catch((error)=>{ 
                Notiflix.Report.failure("Product not Found","please come back later" , 'Cancel');
            })
    }, [filter]);
    useEffect(() => {
        const params ={
            type : "latest"
        }
       productApi.getAll(params)
            .then((res)=>{
                if(res.success === true){
                    setLatestProducts(res.products);
                }
            })
            .catch((error)=>{ 
                Notiflix.Report.failure("Product not Found","please come back later" , 'Cancel');
            })
    }, []);
    const handelPageChange = (newPage) => {
        setFilter({
            ...filter,
            page:newPage
        })
    }
    return (
        <div>
            <section className="breadcrumb-section set-bg" data-setbg="UI/img/breadcrumb.jpg">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                    <div className="breadcrumb__text">
                        <h2>Organi Shop</h2>
                        <div className="breadcrumb__option">
                        <Link to="/">Home</Link>
                        <span>Shop</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="sidebar-client">
                                <div className="sidebar__item">
                                <h4>Department</h4>
                                <ul>
                                    <li><a href="#">Fresh Meat</a></li>
                                    <li><a href="#">Vegetables</a></li>
                                    <li><a href="#">Fruit &amp; Nut Gifts</a></li>
                                    <li><a href="#">Fresh Berries</a></li>
                                    <li><a href="#">Ocean Foods</a></li>
                                    <li><a href="#">Butter &amp; Eggs</a></li>
                                    <li><a href="#">Fastfood</a></li>
                                    <li><a href="#">Fresh Onion</a></li>
                                    <li><a href="#">Papayaya &amp; Crisps</a></li>
                                    <li><a href="#">Oatmeal</a></li>
                                </ul>
                                </div>
                                <div className="sidebar__item">
                                <h4>Price</h4>
                                <div className="price-range-wrap">
                                    <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min={10} data-max={540}>
                                    <div className="ui-slider-range ui-corner-all ui-widget-header" />
                                    <span tabIndex={0} className="ui-slider-handle ui-corner-all ui-state-default" />
                                    <span tabIndex={0} className="ui-slider-handle ui-corner-all ui-state-default" />
                                    </div>
                                    <div className="range-slider">
                                    <div className="price-input">
                                        <input type="text" id="minamount" />
                                        <input type="text" id="maxamount" />
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="sidebar__item sidebar__item__color--option">
                                    <h4>Colors</h4>
                                    <div className="sidebar__item__color sidebar__item__color--white">
                                        <label htmlFor="white">
                                        White
                                        <input type="radio" id="white" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--gray">
                                        <label htmlFor="gray">
                                        Gray
                                        <input type="radio" id="gray" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--red">
                                        <label htmlFor="red">
                                        Red
                                        <input type="radio" id="red" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--black">
                                        <label htmlFor="black">
                                        Black
                                        <input type="radio" id="black" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--blue">
                                        <label htmlFor="blue">
                                        Blue
                                        <input type="radio" id="blue" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--green">
                                        <label htmlFor="green">
                                        Green
                                        <input type="radio" id="green" />
                                        </label>
                                    </div>
                                </div>
                                <div className="sidebar__item">
                                    <h4>Popular Size</h4>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="large">
                                        Large
                                        <input type="radio" id="large" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="medium">
                                        Medium
                                        <input type="radio" id="medium" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="small">
                                        Small
                                        <input type="radio" id="small" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="tiny">
                                        Tiny
                                        <input type="radio" id="tiny" />
                                        </label>
                                    </div>
                                </div>
                                <div className="sidebar__item">
                                    <div className="latest-product__text">
                                        <h4>Latest Products</h4>
                                        {
                                            latestProducts 
                                            && <OwlCarousel className="latest-product__slider owl-carousel"
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
                                                            latestProducts.listOne.map((product)=>{
                                                                let price = product.price;
                                                                return ( <Link key={product._id} to={`product/${product._id}`} className="latest-product__item">
                                                                            <div className="latest-product__item__pic">
                                                                                <img src={`uploads/${product.image}`} alt="" />
                                                                            </div>
                                                                            <div className="latest-product__item__text">
                                                                                <h6>{product.name}</h6>
                                                                                <span>{price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                                                                            </div>
                                                                        </Link>)
                                                            })
                                                        }
                                                    </div>
                                                    <div className="latest-prdouct__slider__item">
                                                    {
                                                        latestProducts.listTwo.map((product)=>{
                                                            let price = product.price;
                                                            return ( <Link key={product._id} to={`product/${product._id}`} className="latest-product__item">
                                                                        <div className="latest-product__item__pic">
                                                                            <img src={`uploads/${product.image}`} alt="" />
                                                                        </div>
                                                                        <div className="latest-product__item__text">
                                                                            <h6>{product.name}</h6>
                                                                            <span>{price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                                                                        </div>
                                                                    </Link>)
                                                        })
                                                    }
                                                    </div>
                                                </OwlCarousel>
                                            }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-7">
                            <div className="product__discount">
                                <div className="section-title product__discount__title">
                                <h2>Sale Off</h2>
                                </div>
                                <div className="row">
                                    
                                    {
                                        discountProduct && 
                                        <OwlCarousel className="product__discount__slider owl-carousel"
                                            loop 
                                            margin={10} 
                                            items="3"
                                            autoplay
                                            animateOut={"fadeOut"}
                                            smartSpeed= "1200">
                                                {discountProduct.map((product) => {
                                                    let priceDropped = product.price - product.price*20/100
                                                    return (  
                                                    <div key={product._id} className="col-lg-4">
                                                        <div className="product__discount__item">
                                                            <div className="product__discount__item__pic set-bg" data-setbg={`uploads/${product.image}`}>
                                                            <div className="product__discount__percent">-{product.sale_of}%</div>
                                                            <ul className="product__item__pic__hover">
                                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                                            </ul>
                                                            </div>
                                                            <div className="product__discount__item__text">
                                                            <span>Dried Fruit</span>
                                                            <h5><a href="#">{product.name}</a></h5>
                                                            <div className="product__item__price">{priceDropped.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})} <span>{(product.price).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span></div>
                                                            </div>
                                                        </div>
                                                    </div> )
                                                })}
                                        </OwlCarousel>
                                    }
                                </div>
                            </div>
                            <div className="filter__item">
                                <div className="row">
                                <div className="col-lg-4 col-md-5">
                                    <div className="filter__sort">
                                    <span>Sort By</span>
                                    <select>
                                        <option value={0}>Default</option>
                                        <option value={0}>Default</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="filter__found">
                                    <h6><span>{allProduct && allProduct.length}</span> Products found</h6>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-3">
                                    <div className="filter__option">
                                    <span className="icon_grid-2x2" />
                                    <span className="icon_ul" />
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    allProduct && allProduct.map((product) => {
                                        return (
                                            <div key={product._id} className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="product__item">
                                                    <div className="product__item__pic set-bg" data-setbg={`uploads/${product.image}`}>
                                                    <ul className="product__item__pic__hover">
                                                        <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                        <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                        <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                                    </ul>
                                                    </div>
                                                    <div className="product__item__text">
                                                    <h6><a href="#">{product.name}</a></h6>
                                                    <h5>{(product.price).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <Pagination pagination={pagination} onPageChange={handelPageChange} ></Pagination>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Shop