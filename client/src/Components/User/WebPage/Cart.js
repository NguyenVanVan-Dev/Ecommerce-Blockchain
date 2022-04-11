import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
const Cart = ({cartItems,setCartItems}) => {
    const [priceETH, setPriceETH] = useState("57788940");
    useEffect(() => {
        $('.set-bg').each(function () {
            var bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });
        let hero__item = document.querySelector(".hero__item");
        hero__item.style.display = 'none';
        let hero__categories = document.querySelector(".hero__categories ul");
        hero__categories.style.display = 'none';
    });
    const handleQty = (e,id)=>{
        setCartItems(prev => {
                const newCart = prev.map((item)=> item._id === id ? {...item,quantity:parseInt(e.target.value)} : item)
                console.log(JSON.stringify(newCart));
                localStorage.setItem('cart',JSON.stringify(newCart));
                return newCart;
        });
    };
    const handleClearCart = ()=> {
        setCartItems([]);
        localStorage.removeItem('cart');
    };
    const handleRemoveItemCart = (id)=>{
        setCartItems(prev => {
            const newCart = prev.filter((item)=> item._id !== id)
            localStorage.setItem('cart',JSON.stringify(newCart));
            return newCart;
        });
    }
    const subTotal = cartItems.reduce((total,item)=>total+ item.price * item.quantity,0)
    return (
        <div>
            <section className="breadcrumb-section set-bg" data-setbg="UI/img/breadcrumb.jpg">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                    <div className="breadcrumb__text">
                        <h2>Shopping Cart</h2>
                        <div className="breadcrumb__option">
                        <a href="./index.html">Home</a>
                        <span>Shopping Cart</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                        <th className="shoping__product">Products</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th />
                                        </tr>
                                    </thead>
                                <tbody>
                                    { cartItems.length === 0 && (
                                        <tr >
                                            <td colSpan={"5"}> No Items </td>
                                        </tr>
                                    )

                                    }
                                    {
                                        cartItems.map((item)=>(
                                            <tr key={item._id}>
                                                <td className="shoping__cart__item">
                                                    <img src={`/uploads/${item.image}`} alt="" />
                                                    <h5>{item.name}</h5>
                                                </td>
                                                <td className="shoping__cart__price">
                                                    {item.price}
                                                </td>
                                                <td className="shoping__cart__quantity">
                                                    <div className="quantity">
                                                        <div className="pro-qty" >
                                                            <input type="number" onChange={(e) => handleQty(e,item._id)}  min="1" max={item.qty} defaultValue={item.quantity} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="shoping__cart__total">
                                                   {(item.price * item.quantity).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) }
                                                </td>
                                                <td className="shoping__cart__item__close">
                                                    <span className="icon_close" onClick={()=> handleRemoveItemCart(item._id)} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                            
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                        <div className="shoping__cart__btns">
                            <a href="#" className="primary-btn cart-btn">CONTINUE SHOPPING</a>
                            <Link to={""} className="primary-btn cart-btn cart-btn-right" onClick={handleClearCart} >Clear Cart</Link>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="shoping__continue">
                            <div className="shoping__discount">
                            <h5>Discount Codes</h5>
                            <form action="#">
                                <input type="text" placeholder="Enter your coupon code" />
                                <button type="submit" className="site-btn">APPLY COUPON</button>
                            </form>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="shoping__checkout">
                            <h5>Cart Total</h5>
                            <ul>
                            <li>Subtotal One<span>{subTotal.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span></li>
                            <li>Subtotal Two<span>{(subTotal/priceETH).toFixed(5)} ETH </span></li>
                            <li>Total <span>{subTotal.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})} || {(subTotal/priceETH).toFixed(5)} ETH</span></li>
                            </ul>
                            <Link to={`/checkout`} className="primary-btn">PROCEED TO CHECKOUT</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cart