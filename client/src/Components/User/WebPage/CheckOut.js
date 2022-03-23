import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Notiflix from 'notiflix';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import {loadContract} from '../../../utilis/load-contracts';
import checkoutApi from '../../../Api/checkoutApi';
function CheckOut({cartItems,setCartItems}) {
    const subTotal = cartItems.reduce((total,item)=>total+ item.price * item.quantity,0)
    // const [priceTotalETH, setTotalETH] = useState(0);
    const [priceETH, setPriceETH] = useState(1);
    const [createAccount, setCreateAccount] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState({
        method: 1
    });
    const [checkout, setCheckout] = useState({
        firstName:'',
        lastName:'',
        streetAddress:'',
        apartmentAddress:'',
        city:'',
        country:'',
        sdt:'',
        email:'',
        password:'',
        notes:'',
        total:subTotal,
        error_list:{},
    });
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
    });
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const getPriceEth = async ()=>{
            fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,VND")
            .then(response => response.json())
            .then(data => {
                setPriceETH(data.VND)
            });
        }
        getPriceEth();
    }, []);
    const priceTotalETH =(subTotal / parseFloat(priceETH)).toFixed(10);
    // Load Provider 
      useEffect(() => {
        const loadProvider = async () => {
          const provider = await detectEthereumProvider();
          const contract = await loadContract("ManagerOgani", provider)
          if (provider) {
            // setAccountLister(provider)
            setWeb3Api({
              web3: new Web3(provider),
              provider,
              contract
            })
          } else {
            console.error("please, Install Metamask")
          }
        }
        loadProvider()
      }, []);
    //Get Account
    useEffect(() => {
        const getAccount = async () => {
            const accounts = await web3Api.web3.eth.getAccounts()
            setAccount(accounts[0])
        }
        web3Api.web3 && getAccount()
    }, [web3Api.web3]);
    const handleInput = (e)=> {
        setCheckout({...checkout,[e.target.name]: e.target.value});
    }
    const cart = localStorage.getItem('cart');
    const handleSDT = (e)=>{
        if((e.target.value).length==10 && e.keyCode!=8) return false;
    }

    const userPaymentOrder = async (id)=>{
        const {contract, web3 } = web3Api
        const amount = web3.utils.toWei(priceTotalETH.toString(), "ether");
        await contract.userPaymentOrder(id,{
                from:account,
                value:amount
            })
            .then((_transfer)=>{
                localStorage.removeItem('cart');
                setCartItems([]);
                setCheckout({
                    firstName:'',
                    lastName:'',
                    streetAddress:'',
                    apartmentAddress:'',
                    city:'',
                    country:'',
                    sdt:'',
                    email:'',
                    password:'',
                    notes:'',
                    total:subTotal,
                    error_list:{}
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        return false;
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const params = {
            firstName:checkout.firstName,
            lastName:checkout.lastName,
            streetAddress:checkout.streetAddress,
            apartmentAddress:checkout.apartmentAddress,
            city:checkout.city,
            country:checkout.country,
            sdt:checkout.sdt,
            email:checkout.email,
            notes:checkout.notes,
            cart: cart,
            totalVND:subTotal,
            totalETH:priceTotalETH,
            method:paymentMethod.method,
        }
        if(!cart){
            Notiflix.Report.failure(`Can't payment`,'Your shopping cart is empty','Canel');
        }else{
            if(paymentMethod.method == 1)
            {
                storeOrder(params);
            }else{
                storeOrder(params).then((res)=>{
                    userPaymentOrder(res);
                    // console.log(res)
                })
               
            }
        }
    }
    const storeOrder = async (params) =>{
        let orderID;
        await checkoutApi.checkout(params)
        .then((data)=>{
            if(data.success === true)
            {
                orderID =  data.orderID;
            }
        })
        .catch((err)=>{
            console.log(err);
            if(err.response.data.listError){
                setCheckout((prev)=>{
                    return {...prev,error_list: err.response.data.listError}
                });
            }
        })
        return orderID;
    }
    return (
        <div>
            <section className="breadcrumb-section set-bg" data-setbg="UI/img/breadcrumb.jpg">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                    <div className="breadcrumb__text">
                        <h2>Checkout</h2>
                        <div className="breadcrumb__option">
                        <Link to={`/`}>Home</Link>
                        <span>Checkout</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section className="checkout spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <h6><span className="icon_tag_alt" /> Have a coupon? <a href="#">Click here</a> to enter your code
                        </h6>
                        </div>
                    </div>
                    <div className="checkout__form">
                        <h4>Billing Details</h4>
                        <form action="#">
                        <div className="row">
                            <div className="col-lg-8 col-md-6">
                                <div className="row">
                                    <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Fist Name<span>*</span></p>
                                        <input type="text" name='firstName' value={checkout.firstName} onChange={handleInput} />
                                        <span className="text-danger small">{checkout.error_list.firstName}</span>
                                    </div>
                                    </div>
                                    <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Last Name<span>*</span></p>
                                        <input type="text" name='lastName' value={checkout.lastName} onChange={handleInput} />
                                        <span className="text-danger small">{checkout.error_list.lastName}</span>
                                    </div>
                                    </div>
                                </div>
                            <div className="checkout__input">
                                <p>Address<span>*</span></p>
                                <input type="text" name='streetAddress' value={checkout.streetAddress} onChange={handleInput}  placeholder="Street Address"  className="checkout__input__add" />
                                <span className="text-danger small">{checkout.error_list.streetAddress}</span>
                                <input type="text" name='apartmentAddress' value={checkout.apartmentAddress} onChange={handleInput}  placeholder="Apartment, suite, unite ect (optinal)" />
                                <span className="text-danger small">{checkout.error_list.apartmentAddress}</span>
                            </div>
                            <div className="checkout__input">
                                <p>Town/City<span>*</span></p>
                                <input type="text" name='city' value={checkout.city} onChange={handleInput} />
                                <span className="text-danger small">{checkout.error_list.city}</span>
                            </div>
                            <div className="checkout__input">
                                <p>Country/State<span>*</span></p>
                                <input type="text" name='country' value={checkout.country} onChange={handleInput} />
                                <span className="text-danger small">{checkout.error_list.country}</span>
                            </div>
                            <div className="checkout__input">
                                <p>Postcode / ZIP<span>*</span></p>
                                <input type="text" />
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                <div className="checkout__input">
                                    <p>Phone<span>*</span></p>
                                    <input type="number" name='sdt' value={checkout.sdt} onChange={handleInput} onKeyDown={handleSDT} />
                                    <span className="text-danger small">{checkout.error_list.sdt}</span>
                                </div>
                                </div>
                                <div className="col-lg-6">
                                <div className="checkout__input">
                                    <p>Email<span>*</span></p>
                                    <input type="text" name='email' value={checkout.email} onChange={handleInput} />
                                    <span className="text-danger small">{checkout.error_list.email}</span>
                                </div>
                                </div>
                            </div>
                            <div className="checkout__input__checkbox">
                                <label htmlFor="acc">
                                Create an account?
                                <input type="checkbox" id="acc" checked={createAccount} onChange={()=> setCreateAccount(!createAccount)} />
                                <span className="checkmark" />
                                </label>
                            </div>
                            <p>Create an account by entering the information below. If you are a returning customer
                                please login at the top of the page</p>
                            <div className="checkout__input">
                                <p>Account Password<span>*</span></p>
                                <input type="text" name='password' value={checkout.password} onChange={handleInput}/>
                                <span className="text-danger small">{checkout.error_list.password}</span>
                            </div>
                            <div className="checkout__input__checkbox">
                                <label htmlFor="diff-acc">
                                Ship to a different address?
                                <input type="checkbox" id="diff-acc" />
                                <span className="checkmark" />
                                </label>
                            </div>
                            <div className="checkout__input">
                                <p>Order notes<span>*</span></p>
                                <input type="text" name='notes' value={checkout.notes} onChange={handleInput} placeholder="Notes about your order, e.g. special notes for delivery." />
                                <span className="text-danger small">{checkout.error_list.notes}</span>
                            </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                            <div className="checkout__order">
                                <h4>Your Order</h4>
                                <div className="checkout__order__products">Products <span>Total</span></div>
                                <ul>
                                    {
                                        cartItems.map((cart) =>{
                                            return ( <li key={cart._id}>{cart.name}<span>{(cart.price * cart.quantity).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span></li> )
                                        })
                                    }
                                </ul>
                                <div className="checkout__order__subtotal">Subtotal <span>{subTotal.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span></div>
                                <div className="checkout__order__total">Total <span>{subTotal.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span></div>
                                <div className="checkout__input__checkbox">
                                </div>
                                <p>Payment method:</p>
                                <div className="checkout__input__checkbox">
                                <label htmlFor="payment">
                                    Payment on delivery
                                    <input type="radio" id="payment" name="payment"  onClick={()=>setPaymentMethod({method:1})}/>
                                    <span className="checkmark" />
                                </label>
                                </div>
                                <div className="checkout__input__checkbox">
                                <label htmlFor="paypal">
                                    Payment with tokens(ETH)
                                    <input type="radio" id="paypal" name="payment" onClick={()=>setPaymentMethod({method:2})}/>
                                    <span className="checkmark" />
                                </label>
                                </div>
                                <button type="submit" className="site-btn" onClick={handleSubmit}>PLACE ORDER</button>
                            </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CheckOut