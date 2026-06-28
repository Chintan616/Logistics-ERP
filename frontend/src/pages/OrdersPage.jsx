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
                <h2>Orders Management</h2>
                <button className="add-btn" onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? "Cancel" : "Create New Order"}
                </button>

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
                            <th>Order No</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.orderNumber}</td>
                                <td>{order.customerName}</td>
                                <td>{order.status}</td>
                                <td>{new Date(order.orderDate).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default OrdersPage;
