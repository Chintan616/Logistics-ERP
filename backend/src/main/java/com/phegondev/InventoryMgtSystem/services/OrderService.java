package com.phegondev.InventoryMgtSystem.services;

import com.phegondev.InventoryMgtSystem.dtos.OrderRequest;
import com.phegondev.InventoryMgtSystem.dtos.Response;
import com.phegondev.InventoryMgtSystem.enums.OrderStatus;

public interface OrderService {
    Response createOrder(OrderRequest orderRequest);
    Response getAllOrders();
    Response getOrderById(Long id);
    Response updateOrderStatus(Long id, OrderStatus status);
}
