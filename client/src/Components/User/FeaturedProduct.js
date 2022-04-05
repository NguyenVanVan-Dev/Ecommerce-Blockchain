import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Notiflix from 'notiflix';
import mixitup from 'mixitup';
import { Link } from "react-router-dom";
const FeaturedProduct = ({handleAddCart}) => {
    const [products,setProduct] = useState([]);
    const [categories,setCategory] = useState([]);
    useEffect(() => {
        axios.get('/category/show',{ params : { type: 'featured',} })
            .then((res)=>{
                if(res.data.success === true){
                    setCategory(res.data.category)
                    let featured__controls = document.querySelectorAll('.featured__controls li')
                    featured__controls.forEach((item,index,array) => {
                        item.addEventListener('click', () => {
                            array.forEach((item)=> {
                                item.classList.remove('active');
                            })
                            item.classList.add('active');
                        })
                    })
                }
            })
            .catch((error)=>{
                Notiflix.Report.failure("Category not Found","Please come back later" , 'Cancel');
            })
    }, []);
   
    useEffect(() => {
        axios.get('/product/show',{ params : {type : 'featured' } })
            .then((res)=>{
                if(res.data.success === true){
                    setProduct(res.data.products);
                    let featured__filter = document.querySelector('.featured__filter');
                    if(featured__filter){
                        var mixer = mixitup(featured__filter);
                    }
                    const setBg = document.querySelectorAll('.set-bg');
                    setBg.forEach((item) => {
                        let bg = item.getAttribute('data-setbg');
                        item.style.backgroundImage = `url('${bg}')`;
                    })
                }
            })
            .catch((error)=>{
                Notiflix.Report.failure("Product not Found","please come back later" , 'Cancel');
            })
    }, []);

    return (
        <section className="featured spad">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>Featured Product</h2>
                    </div>
                    <div className="featured__controls">
                        <ul>
                            <li className="active" data-filter="*">All</li>
                            { categories && categories.map((category)=>{
                                return (<li key={category._id} data-filter={`.${category.slug}`}>{category.name}</li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row featured__filter">
                {
                    products &&  products.map((product)=>{
                        let price = product.price;
                        return (
                            <div key={product._id} className={`col-lg-3 col-md-4 col-sm-6 mix  ${product.category_id}`} >                               
                                    <div className="featured__item">
                                        <div className="featured__item__pic set-bg" data-setbg={`uploads/${product.image}`}>
                                            <ul className="featured__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li onClick={()=>{
                                                    handleAddCart(product)
                                                }}>
                                                    <Link to={""}><i className="fa fa-shopping-cart" /></Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <Link to={`product/${product._id}`}>
                                        <div className="featured__item__text">
                                            <h6>{product.name}</h6>
                                            <h5>{price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</h5>
                                        </div>
                                        </Link>
                                    </div>
                            </div>
                        )
                    })
                }

            </div>
            </div>
        </section>
  )
}
export default FeaturedProduct;