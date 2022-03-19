import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () =>{
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Sidebar - Brand */}
        <Link to={"/admin/dashboard"} className="sidebar-brand d-flex align-items-center justify-content-center" >
            <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
            </div>
            <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </Link>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
            <Link to={"/admin/dashboard"} className="nav-link" >
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span></Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">
            Interface
        </div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog" />
            <span>Components</span>
            </a>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Components:</h6>
                <a className="collapse-item" href="buttons.html">Buttons</a>
                <a className="collapse-item" href="cards.html">Cards</a>
            </div>
            </div>
        </li>
        {/* Nav Item - Utilities Collapse Menu */}
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
            <i className="fas fa-fw fa-wrench" />
            <span>Utilities</span>
            </a>
            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <a className="collapse-item" href="utilities-color.html">Colors</a>
                <a className="collapse-item" href="utilities-border.html">Borders</a>
                <a className="collapse-item" href="utilities-animation.html">Animations</a>
                <a className="collapse-item" href="utilities-other.html">Other</a>
            </div>
            </div>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">
            Addons
        </div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
            <i className="fas fa-fw fa-folder" />
            <span>Pages</span>
            </a>
            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Categories Page:</h6>
                <Link className="collapse-item" to="add-category">Add Category</Link>
                <Link className="collapse-item" to="list-category">List Category</Link>
                <div className="collapse-divider" />
                <h6 className="collapse-header">Products Page:</h6>
                <Link className="collapse-item" to="add-product">Add Products</Link>
                <Link className="collapse-item" to="list-product">List Products</Link>
                <div className="collapse-divider" />
                <h6 className="collapse-header">Other Pages:</h6>
                <a className="collapse-item" href="404.html">404 Page</a>
                <a className="collapse-item" href="blank.html">Blank Page</a>
            </div>
            </div>
        </li>
        {/* Nav Item - Charts */}
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#Contract" aria-expanded="true" aria-controls="collapsePages">
            <i className="fas fa-file-contract"></i>
            <span>Contract & Supplier</span>
            </a>
            <div id="Contract" className="collapse" aria-labelledby="headingTransaction" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Contract Page:</h6>
                <Link className="collapse-item" to="add-contract">Add Contract</Link>
                <Link className="collapse-item" to="list-contract">List Contract</Link>
            </div>
            </div>
        </li>
        {/* Nav Item - Transaction History */}
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#transationHistory" aria-expanded="true" aria-controls="collapsePages">
            <i className="fab fa-buffer"></i>
            <span>Transaction History</span>
            </a>
            <div id="transationHistory" className="collapse" aria-labelledby="headingTransaction" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Transaction Page:</h6>
                <Link className="collapse-item" to="list-transaction">List Transaction</Link>
            </div>
            </div>
        </li>
        {/* Nav Item - Tables */}
        <li className="nav-item">
            <a className="nav-link" href="tables.html">
            <i className="fas fa-fw fa-table" />
            <span>Tables</span></a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" />
        </div>
        {/* Sidebar Message */}
        <div className="sidebar-card d-none d-lg-flex">
            <img className="sidebar-card-illustration mb-2" src="/img/undraw_rocket.svg" alt="..." />
            <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
            <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
        </div>
        </ul>
    )
}
export default Sidebar;