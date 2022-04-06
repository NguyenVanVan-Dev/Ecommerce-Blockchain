import React ,{useEffect,useState} from "react";
import logo from '../../Resource/UserInterface/img/logo.png';
import { Link,NavLink} from "react-router-dom";
import { useUser } from "../../Providers";
import NavbarTop from "./NavbarTop";
const Header = ({cartItems}) =>{
    const subTotal = cartItems.reduce((total,item)=>total+ item.price * item.quantity,0);
    const [active, setActive] = useState(false);
    const { user } = useUser();
    useEffect(() => {
        return () => {
            setActive(false);
        };
    }, []);
    return (
        <header className="header">
            <div className="header__top">
            <div className="container">
                <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="header__top__left">
                    <ul>
                        <li><i className="fa fa-envelope" /> hello@colorlib.com</li>
                        <li>Free Shipping for all Order of $99</li>
                    </ul>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="header__top__right">
                    <div className="header__top__right__social">
                        <a href="#"><i className="fa fa-facebook" /></a>
                        <a href="#"><i className="fa fa-twitter" /></a>
                        <a href="#"><i className="fa fa-linkedin" /></a>
                        <a href="#"><i className="fa fa-pinterest-p" /></a>
                        <Link to="/admin/login"><i className="fas fa-dumpster"/></Link>
                    </div>
                    <div className="header__top__right__language">
                        <img src="img/language.png" alt="" />
                        <div>English</div>
                        <span className="arrow_carrot-down" />
                        <ul>
                        <li><a href="#">Spanis</a></li>
                        <li><a href="#">English</a></li>
                        </ul>
                    </div>
                    <div className="header__top__right__auth">
                        {
                           user ?  ( <Link to="/"><i className="fa fa-user" /> { user.name} </Link>) : ( <Link to="/login"><i className="fa fa-user" /> Login</Link>)
                        }                       
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="container">
            <div className="row">
                <div className="col-lg-3">
                <div className="header__logo">
                    <Link  to="/"><img src={logo} alt="" /></Link>
                </div>
                </div>
                <div className="col-lg-6">
                <nav className="header__menu">
                    <NavbarTop></NavbarTop>
                </nav>
                </div>
                <div className="col-lg-3">
                <div className="header__cart">
                    <ul>
                    <li><a href="#"><i className="fa fa-heart" /> <span>1</span></a></li>
                    <li><Link to="/cart"><i className="fa fa-shopping-bag" /> <span>{cartItems.length === 0 ?  0 : cartItems.length}</span></Link></li>
                    </ul>
                    <div className="header__cart__price">payment: <span>{subTotal.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span></div>
                </div>
                </div>
            </div>
            <div className="humberger__open">
                <i className="fa fa-bars" />
            </div>
            </div>
        </header>
    )
}

export default React.memo(Header);