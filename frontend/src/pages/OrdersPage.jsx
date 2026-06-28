import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState(1);
    
    // In a real app we'd allow multiple items, keeping it simple with one item for now based on UI limits
    const [orderItems, setOrderItems] = useState([]); 

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await ApiService.getAllOrders();
            if (response.status === 200) {
                setOrders(response.orders);
            }
        } catch (error) {
            showMessage("Error fetching orders: " + (error.response?.data?.message || error.message));
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await ApiService.getAllProducts();
            if (response.status === 200) {
                setProducts(response.products);
                if (response.products.length > 0) {
                    setSelectedProduct(response.products[0].id);
                }
            }
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 4000);
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        try {
            const orderRequest = {
                customerName,
                deliveryAddress,
                orderItems: [{
                    productId: selectedProduct,
                    quantity: quantity
                }]
            };
            const response = await ApiService.createOrder(orderRequest);
            if (response.status === 200) {
                showMessage("Order created successfully!");
                setIsCreating(false);
                fetchOrders();
                setCustomerName("");
                setDeliveryAddress("");
            }
        } catch (error) {
            showMessage("Error creating order: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <Layout>
            {message && <div className="message">{message}</div>}
            <div className="page-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h2 style={{ marginBottom: '8px' }}>Manage Orders</h2>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>Track customer orders end-to-end — from placement through fulfillment to dispatch.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="ghost-btn" style={{ background: 'var(--surface)', border: '1px solid var(--hairline)', color: 'var(--foreground)' }}>Export CSV</button>
                        <button className="add-btn" style={{ marginBottom: 0 }} onClick={() => setIsCreating(!isCreating)}>
                            {isCreating ? "Cancel" : "+ Add New Order"}
                        </button>
                    </div>
                </div>

                {isCreating && (
                    <div className="form-container" style={{marginBottom: "20px"}}>
                        <form onSubmit={handleCreateOrder}>
                            <input 
                                type="text" 
                                placeholder="Customer Name" 
                                value={customerName} 
                                onChange={(e) => setCustomerName(e.target.value)} 
                                required 
                            />
                            <input 
                                type="text" 
                                placeholder="Delivery Address" 
                                value={deliveryAddress} 
                                onChange={(e) => setDeliveryAddress(e.target.value)} 
                                required 
                            />
                            <select 
                                value={selectedProduct} 
                                onChange={(e) => setSelectedProduct(e.target.value)} 
                                required
                            >
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} (Stock: {product.stockQuantity})
                                    </option>
                                ))}
                            </select>
                            <input 
                                type="number" 
                                placeholder="Quantity" 
                                min="1"
                                value={quantity} 
                                onChange={(e) => setQuantity(Number(e.target.value))} 
                                required 
                            />
                            <button type="submit">Submit Order</button>
                        </form>
                    </div>
                )}

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Customer / Destination</th>
                            <th>Status</th>
                            <th>Placed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>
                                    <div style={{ color: 'var(--brand)', fontWeight: 600, marginBottom: '4px' }}>#{order.orderNumber}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--foreground)' }}>{order.customerName}</div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 500 }}>{order.customerName}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Standard Shipping</div>
                                </td>
                                <td>
                                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>
                                    <button className="ghost-btn" style={{ padding: '4px 8px', fontSize: '12px', background: 'transparent', color: 'var(--muted-foreground)' }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default OrdersPage;
