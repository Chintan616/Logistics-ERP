import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({children}) =>{
    return(
        <div className="layout">
            <Sidebar/>
            <div className="main-wrapper">
                <header className="top-bar">
                    <div className="search-box">
                        <span style={{marginRight: "8px", opacity: 0.5}}>🔍</span>
                        <input type="text" placeholder="Search orders, SKUs, suppliers..." />
                    </div>
                    <div className="system-status">
                        <span className="status-dot"></span>
                        ALL SYSTEMS OPERATIONAL
                        <span className="bell-icon">🔔</span>
                    </div>
                </header>
                <div className="main-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;