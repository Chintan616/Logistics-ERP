import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const DashboardPage = () => {
  const [message, setMessage] = useState("");
  const [metrics, setMetrics] = useState({
      totalProducts: 0,
      totalOrders: 0,
      pendingOrders: 0,
      packedOrders: 0,
      activeShipments: 0,
      deliveredShipments: 0,
      lowStockProducts: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getDashboardMetrics();
        if (response.status === 200) {
            setMetrics(response.dashboardMetrics);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error fetching dashboard data: " + error
        );
      }
    };
    fetchData();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="page-content">
        <h2>Logistics Dashboard</h2>

        <div className="dashboard-metrics" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "20px"}}>
            <div className="metric-card" style={{padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "5px solid #008080"}}>
                <h3>Total Products</h3>
                <p style={{fontSize: "24px", fontWeight: "bold"}}>{metrics.totalProducts}</p>
            </div>
            <div className="metric-card" style={{padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "5px solid #ff9800"}}>
                <h3>Low Stock Alerts</h3>
                <p style={{fontSize: "24px", fontWeight: "bold", color: metrics.lowStockProducts > 0 ? "red" : "black"}}>{metrics.lowStockProducts}</p>
            </div>
            <div className="metric-card" style={{padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "5px solid #2196f3"}}>
                <h3>Total Orders</h3>
                <p style={{fontSize: "24px", fontWeight: "bold"}}>{metrics.totalOrders}</p>
            </div>
            <div className="metric-card" style={{padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "5px solid #f44336"}}>
                <h3>Pending Orders</h3>
                <p style={{fontSize: "24px", fontWeight: "bold"}}>{metrics.pendingOrders}</p>
            </div>
            <div className="metric-card" style={{padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "5px solid #9c27b0"}}>
                <h3>Packed Orders</h3>
                <p style={{fontSize: "24px", fontWeight: "bold"}}>{metrics.packedOrders}</p>
            </div>
            <div className="metric-card" style={{padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "5px solid #e91e63"}}>
                <h3>Active Shipments</h3>
                <p style={{fontSize: "24px", fontWeight: "bold"}}>{metrics.activeShipments}</p>
            </div>
            <div className="metric-card" style={{padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "5px solid #4caf50"}}>
                <h3>Delivered Shipments</h3>
                <p style={{fontSize: "24px", fontWeight: "bold"}}>{metrics.deliveredShipments}</p>
            </div>
        </div>
      </div>
    </Layout>
  );
};
export default DashboardPage;
