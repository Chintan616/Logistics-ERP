package com.phegondev.InventoryMgtSystem.services.impl;

import com.phegondev.InventoryMgtSystem.dtos.Response;
import com.phegondev.InventoryMgtSystem.dtos.ShipmentDTO;
import com.phegondev.InventoryMgtSystem.dtos.ShipmentRequest;
import com.phegondev.InventoryMgtSystem.enums.OrderStatus;
import com.phegondev.InventoryMgtSystem.enums.ShipmentStatus;
import com.phegondev.InventoryMgtSystem.exceptions.NotFoundException;
import com.phegondev.InventoryMgtSystem.models.Order;
import com.phegondev.InventoryMgtSystem.models.OrderItem;
import com.phegondev.InventoryMgtSystem.models.Product;
import com.phegondev.InventoryMgtSystem.models.Shipment;
import com.phegondev.InventoryMgtSystem.repositories.OrderRepository;
import com.phegondev.InventoryMgtSystem.repositories.ProductRepository;
import com.phegondev.InventoryMgtSystem.repositories.ShipmentRepository;
import com.phegondev.InventoryMgtSystem.services.ShipmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShipmentServiceImpl implements ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    @CacheEvict(value = "dashboard_metrics", allEntries = true)
    public Response createShipment(ShipmentRequest shipmentRequest) {
        try {
            Order order = orderRepository.findById(shipmentRequest.getOrderId())
                    .orElseThrow(() -> new NotFoundException("Order Not Found"));

            if (order.getShipment() != null) {
                throw new IllegalArgumentException("Shipment already exists for this order");
            }
            if (order.getStatus() != OrderStatus.PACKED && order.getStatus() != OrderStatus.PACKING_READY && order.getStatus() != OrderStatus.PENDING) {
                throw new IllegalArgumentException("Order must be pending, packed or ready for packing to create a shipment");
            }

            Shipment shipment = Shipment.builder()
                    .trackingNumber("TRK-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase())
                    .courierName(shipmentRequest.getCourierName())
                    .status(ShipmentStatus.PENDING)
                    .order(order)
                    .build();

            Shipment savedShipment = shipmentRepository.save(shipment);
            
            // Sync order status
            order.setStatus(OrderStatus.PACKED);
            orderRepository.save(order);

            return Response.builder()
                    .status(200)
                    .message("Shipment created successfully")
                    .shipment(modelMapper.map(savedShipment, ShipmentDTO.class))
                    .build();

        } catch (Exception e) {
            log.error("Error creating shipment", e);
            return Response.builder()
                    .status(500)
                    .message("Error creating shipment: " + e.getMessage())
                    .build();
        }
    }

    @Override
    public Response getAllShipments() {
        try {
            List<Shipment> shipments = shipmentRepository.findAll();
            List<ShipmentDTO> shipmentDTOs = modelMapper.map(shipments, new TypeToken<List<ShipmentDTO>>() {}.getType());
            return Response.builder()
                    .status(200)
                    .message("success")
                    .shipments(shipmentDTOs)
                    .build();
        } catch (Exception e) {
            log.error("Error fetching shipments", e);
            return Response.builder()
                    .status(500)
                    .message("Error fetching shipments: " + e.getMessage())
                    .build();
        }
    }

    @Override
    public Response getShipmentById(Long id) {
        try {
            Shipment shipment = shipmentRepository.findById(id).orElseThrow(() -> new NotFoundException("Shipment Not Found"));
            return Response.builder()
                    .status(200)
                    .message("success")
                    .shipment(modelMapper.map(shipment, ShipmentDTO.class))
                    .build();
        } catch (Exception e) {
            log.error("Error fetching shipment by id", e);
            return Response.builder()
                    .status(500)
                    .message("Error fetching shipment by id: " + e.getMessage())
                    .build();
        }
    }

    @Override
    @Transactional
    @CacheEvict(value = "dashboard_metrics", allEntries = true)
    public Response updateShipmentStatus(Long id, ShipmentStatus newStatus) {
        try {
            Shipment shipment = shipmentRepository.findById(id).orElseThrow(() -> new NotFoundException("Shipment Not Found"));
            ShipmentStatus currentStatus = shipment.getStatus();

            // Validate transition
            if (!isValidTransition(currentStatus, newStatus)) {
                throw new IllegalArgumentException("Invalid shipment status transition from " + currentStatus + " to " + newStatus);
            }

            shipment.setStatus(newStatus);
            shipment.setUpdateAt(java.time.LocalDateTime.now());

            // Handle business logic when shipped
            if (newStatus == ShipmentStatus.SHIPPED) {
                shipment.setShipmentDate(java.time.LocalDateTime.now());
                Order order = shipment.getOrder();
                order.setStatus(OrderStatus.SHIPPED);
                
                // Deduct reserved stock permanently
                for (OrderItem item : order.getOrderItems()) {
                    Product product = item.getProduct();
                    if (product.getReservedStock() >= item.getQuantity()) {
                        product.setReservedStock(product.getReservedStock() - item.getQuantity());
                        productRepository.save(product);
                    }
                }
                orderRepository.save(order);
            } else if (newStatus == ShipmentStatus.DELIVERED) {
                Order order = shipment.getOrder();
                order.setStatus(OrderStatus.DELIVERED);
                orderRepository.save(order);
            } else if (newStatus == ShipmentStatus.PACKED) {
                Order order = shipment.getOrder();
                order.setStatus(OrderStatus.PACKED);
                orderRepository.save(order);
            }

            Shipment updatedShipment = shipmentRepository.save(shipment);

            return Response.builder()
                    .status(200)
                    .message("Shipment status updated successfully")
                    .shipment(modelMapper.map(updatedShipment, ShipmentDTO.class))
                    .build();
        } catch (Exception e) {
            log.error("Error updating shipment status", e);
            return Response.builder()
                    .status(500)
                    .message("Error updating shipment status: " + e.getMessage())
                    .build();
        }
    }

    private boolean isValidTransition(ShipmentStatus current, ShipmentStatus next) {
        if (current == next) return true;
        switch (current) {
            case PENDING:
                return next == ShipmentStatus.PACKED || next == ShipmentStatus.CANCELLED;
            case PACKED:
                return next == ShipmentStatus.SHIPPED || next == ShipmentStatus.CANCELLED;
            case SHIPPED:
                return next == ShipmentStatus.DELIVERED;
            case DELIVERED:
                return false; // Final state
            case CANCELLED:
                return false; // Final state
            default:
                return false;
        }
    }
}
