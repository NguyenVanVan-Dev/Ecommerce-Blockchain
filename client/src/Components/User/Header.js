import React ,{useEffect,useState} from "react";
import logo from '../../Resource/UserInterface/img/logo.png';
import { Link,NavLink} from "react-router-dom";
import { useUser } from "../../Providers";
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
                    <ul>
                    <li >
                        <NavLink to="/" className={(navData) => (navData.isActive ? 'active' : 'link')} >Home</NavLink>
                        {/* <Link to="/">Home</Link> */}
                    </li>
                    <li><a href="./shop-grid.html">Shop</a></li>
                    <li className={active ? "active" : "link"}><a href="#">Pages</a>
                        <ul className="header__menu__dropdown">
                        <li><a href="./shop-details.html">Shop Details</a></li>
                        <li>
                            <NavLink to="/cart" className={(navData) => (navData.isActive ? setActive(true) : 'link')}>Shoping Cart</NavLink>
                            {/* <Link to="/cart">Shoping Cart</Link> */}
                        </li>
                        <li>
                            {/* <Link to={`/checkout`}>Check Out</Link> */}
                            <NavLink to={`/checkout`} className={(navData) => (navData.isActive ? setActive(true) : 'link')}>Check Out</NavLink>
                        </li>
                        <li><a href="./blog-details.html">Blog Details</a></li>
                        </ul>
                    </li>
                    <li><a href="./blog.html">Blog</a></li>
                    <li><a href="./contact.html">Contact</a></li>
                    </ul>
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