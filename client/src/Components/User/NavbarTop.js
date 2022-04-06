import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
function NavbarTop() {
    const CustomLink = ({ children, to, ...props }) => {
        let resolved = useResolvedPath(to)
        let match = useMatch({ path: resolved.pathname, end: true })
        let linkIsArray = Array.isArray(to);
        return (
        linkIsArray ? 
        <li className={ to.includes(match.pathname) ? 'active' : ''}>
            {children}
        </li> : 
        <li className={match ? 'active' : ''}>
            <Link to={to} {...props}>
              {children}
            </Link>
        </li>
        )
    }
    return (
    <ul>
        <CustomLink to='/'>Home</CustomLink>
        <CustomLink to='/shop'>Shop</CustomLink>
        <CustomLink to={['/cart','/checkout']} >
                <Link to={['/cart','/checkout']}>Pages</Link>
                <ul className="header__menu__dropdown">
                    <li><a href="./shop-details.html">Shop Details</a></li>
                    <li>
                        <Link to="/cart" className={'link'}>Shoping Cart</Link>                       
                    </li>
                    <li>
                        <Link to={`/checkout`} className={'link'}>Check Out</Link>
                    </li>
                    <li><a href="./blog-details.html">Blog Details</a></li>
                </ul>
        </CustomLink>
        <CustomLink to='/blog'>Blog</CustomLink>
        <CustomLink to='/contacts'>Contact</CustomLink>
    </ul>
    )
}

export default NavbarTop