package com.phegondev.InventoryMgtSystem.services.impl;

import com.phegondev.InventoryMgtSystem.dtos.OrderDTO;
import com.phegondev.InventoryMgtSystem.dtos.OrderItemRequest;
import com.phegondev.InventoryMgtSystem.dtos.OrderRequest;
import com.phegondev.InventoryMgtSystem.dtos.Response;
import com.phegondev.InventoryMgtSystem.enums.OrderStatus;
import com.phegondev.InventoryMgtSystem.exceptions.NotFoundException;
import com.phegondev.InventoryMgtSystem.models.Order;
import com.phegondev.InventoryMgtSystem.models.OrderItem;
import com.phegondev.InventoryMgtSystem.models.Product;
import com.phegondev.InventoryMgtSystem.repositories.OrderRepository;
import com.phegondev.InventoryMgtSystem.repositories.ProductRepository;
import com.phegondev.InventoryMgtSystem.services.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public Response createOrder(OrderRequest orderRequest) {
        try {
            Order order = Order.builder()
                    .orderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                    .customerName(orderRequest.getCustomerName())
                    .deliveryAddress(orderRequest.getDeliveryAddress())
                    .status(OrderStatus.PENDING)
                    .build();

            List<OrderItem> orderItems = new ArrayList<>();

            for (OrderItemRequest itemRequest : orderRequest.getOrderItems()) {
                Product product = productRepository.findById(itemRequest.getProductId())
                        .orElseThrow(() -> new NotFoundException("Product not found with id: " + itemRequest.getProductId()));

                if (product.getStockQuantity() < itemRequest.getQuantity()) {
                    throw new IllegalArgumentException("Insufficient stock for product: " + product.getName());
                }

                // Inventory reservation
                product.setStockQuantity(product.getStockQuantity() - itemRequest.getQuantity());
                product.setReservedStock(product.getReservedStock() + itemRequest.getQuantity());
                productRepository.save(product);

                OrderItem orderItem = OrderItem.builder()
                        .product(product)
                        .quantity(itemRequest.getQuantity())
                        .price(product.getPrice()) // Snapshot the price
                        .order(order)
                        .build();

                orderItems.add(orderItem);
            }

            order.setOrderItems(orderItems);
            Order savedOrder = orderRepository.save(order);

            return Response.builder()
                    .status(200)
                    .message("Order created successfully")
                    .order(modelMapper.map(savedOrder, OrderDTO.class))
                    .build();

        } catch (Exception e) {
            log.error("Error creating order", e);
            return Response.builder()
                    .status(500)
                    .message("Error creating order: " + e.getMessage())
                    .build();
        }
    }

    @Override
    public Response getAllOrders() {
        try {
            List<Order> orders = orderRepository.findAll();
            List<OrderDTO> orderDTOs = modelMapper.map(orders, new TypeToken<List<OrderDTO>>() {}.getType());
            return Response.builder()
                    .status(200)
                    .message("success")
                    .orders(orderDTOs)
                    .build();
        } catch (Exception e) {
            log.error("Error fetching orders", e);
            return Response.builder()
                    .status(500)
                    .message("Error fetching orders: " + e.getMessage())
                    .build();
        }
    }

    @Override
    public Response getOrderById(Long id) {
        try {
            Order order = orderRepository.findById(id).orElseThrow(() -> new NotFoundException("Order Not Found"));
            return Response.builder()
                    .status(200)
                    .message("success")
                    .order(modelMapper.map(order, OrderDTO.class))
                    .build();
        } catch (Exception e) {
            log.error("Error fetching order by id", e);
            return Response.builder()
                    .status(500)
                    .message("Error fetching order by id: " + e.getMessage())
                    .build();
        }
    }

    @Override
    @Transactional
    public Response updateOrderStatus(Long id, OrderStatus status) {
        try {
            Order order = orderRepository.findById(id).orElseThrow(() -> new NotFoundException("Order Not Found"));
            order.setStatus(status);
            order.setUpdateAt(java.time.LocalDateTime.now());
            Order updatedOrder = orderRepository.save(order);

            return Response.builder()
                    .status(200)
                    .message("Order status updated successfully")
                    .order(modelMapper.map(updatedOrder, OrderDTO.class))
                    .build();
        } catch (Exception e) {
            log.error("Error updating order status", e);
            return Response.builder()
                    .status(500)
                    .message("Error updating order status: " + e.getMessage())
                    .build();
        }
    }
}
