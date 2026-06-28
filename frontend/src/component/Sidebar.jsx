import React from "react";
import { Link } from "react-router-dom";
import ApiService from "../service/ApiService";

const logout = () => {
  ApiService.logout();
};

const Sidebar = () => {
  const isAuth = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();

    return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon"></div>
        <h1 className="ims">LogiFlow</h1>
        <span className="version">v2.4</span>
      </div>
      
      <ul className="nav-links">
        {isAuth && <div className="nav-section">COMMAND</div>}
        {isAuth && <li><Link to="/dashboard">Dashboard</Link></li>}
        {isAuth && <li><Link to="/orders">Orders</Link></li>}
        {isAuth && <li><Link to="/shipments">Shipments</Link></li>}
        {isAuth && <li><Link to="/transaction">Transactions</Link></li>}

        {isAdmin && <div className="nav-section">INVENTORY</div>}
        {isAdmin && <li><Link to="/category">Categories</Link></li>}
        {isAdmin && <li><Link to="/product">Product Catalog</Link></li>}
        {isAdmin && <li><Link to="/supplier">Suppliers</Link></li>}
        {isAuth && <li><Link to="/purchase">Purchase</Link></li>}

        {isAuth && <div className="nav-section">ACCOUNT</div>}
        {isAuth && <li><Link to="/profile">Profile</Link></li>}
        {isAuth && <li><Link onClick={logout} to="/login">Logout</Link></li>}
      </ul>
      
      {isAuth && (
        <div className="sidebar-profile">
            <div className="avatar">AC</div>
            <div className="info">
                <span className="name">Alex Chen</span>
                <span className="role">OPS LEAD</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
