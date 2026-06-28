import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const ShipmentsPage = () => {
    const [shipments, setShipments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState("");
    const [courierName, setCourierName] = useState("");

    useEffect(() => {
        fetchShipments();
        fetchPackedOrders();
    }, []);

    const fetchShipments = async () => {
        try {
            const response = await ApiService.getAllShipments();
            if (response.status === 200) {
                setShipments(response.shipments);
            }
        } catch (error) {
            showMessage("Error fetching shipments: " + (error.response?.data?.message || error.message));
        }
    };

    const fetchPackedOrders = async () => {
        try {
            const response = await ApiService.getAllOrders();
            if (response.status === 200) {
                const readyOrders = response.orders.filter(o => o.status === "PENDING" || o.status === "PACKED" || o.status === "PACKING_READY");
                setOrders(readyOrders);
                if (readyOrders.length > 0) {
                    setSelectedOrder(readyOrders[0].id);
                }
            }
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 4000);
    };

    const handleCreateShipment = async (e) => {
        e.preventDefault();
        try {
            const shipmentRequest = {
                orderId: selectedOrder,
                courierName: courierName
            };
            const response = await ApiService.createShipment(shipmentRequest);
            if (response.status === 200) {
                showMessage("Shipment created successfully!");
                setIsCreating(false);
                fetchShipments();
                fetchPackedOrders();
                setCourierName("");
            }
        } catch (error) {
            showMessage("Error creating shipment: " + (error.response?.data?.message || error.message));
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await ApiService.updateShipmentStatus(id, newStatus);
            if (response.status === 200) {
                showMessage(`Status updated to ${newStatus}`);
                fetchShipments();
            }
        } catch (error) {
            showMessage("Error updating status: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <Layout>
            {message && <div className="message">{message}</div>}
            <div className="page-content">
                <h2>Shipments Management</h2>
                <button className="add-btn" onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? "Cancel" : "Create New Shipment"}
                </button>

                {isCreating && (
                    <div className="form-container" style={{marginBottom: "20px"}}>
                        <form onSubmit={handleCreateShipment}>
                            <select 
                                value={selectedOrder} 
                                onChange={(e) => setSelectedOrder(e.target.value)} 
                                required
                            >
                                <option value="" disabled>Select Packed Order</option>
                                {orders.map(order => (
                                    <option key={order.id} value={order.id}>
                                        {order.orderNumber} - {order.customerName}
                                    </option>
                                ))}
                            </select>
                            <input 
                                type="text" 
                                placeholder="Courier Name (e.g. DHL, FedEx)" 
                                value={courierName} 
                                onChange={(e) => setCourierName(e.target.value)} 
                                required 
                            />
                            <button type="submit">Submit Shipment</button>
                        </form>
                    </div>
                )}

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Tracking No</th>
                            <th>Courier</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map(shipment => (
                            <tr key={shipment.id}>
                                <td>{shipment.trackingNumber}</td>
                                <td>{shipment.courierName}</td>
                                <td>
                                    <span className={`status-badge status-${shipment.status.toLowerCase()}`}>
                                        {shipment.status}
                                    </span>
                                </td>
                                <td>{shipment.shipmentDate ? new Date(shipment.shipmentDate).toLocaleString() : "Not Shipped"}</td>
                                <td>
                                    {shipment.status === "PENDING" && (
                                        <button onClick={() => handleStatusUpdate(shipment.id, "PACKED")}>Mark Packed</button>
                                    )}
                                    {shipment.status === "PACKED" && (
                                        <button onClick={() => handleStatusUpdate(shipment.id, "SHIPPED")}>Mark Shipped</button>
                                    )}
                                    {shipment.status === "SHIPPED" && (
                                        <button onClick={() => handleStatusUpdate(shipment.id, "DELIVERED")}>Mark Delivered</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default ShipmentsPage;
