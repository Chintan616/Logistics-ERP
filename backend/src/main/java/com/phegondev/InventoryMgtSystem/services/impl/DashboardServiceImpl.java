package com.phegondev.InventoryMgtSystem.services.impl;

import com.phegondev.InventoryMgtSystem.dtos.DashboardMetricsDTO;
import com.phegondev.InventoryMgtSystem.dtos.Response;
import com.phegondev.InventoryMgtSystem.enums.OrderStatus;
import com.phegondev.InventoryMgtSystem.enums.ShipmentStatus;
import com.phegondev.InventoryMgtSystem.repositories.OrderRepository;
import com.phegondev.InventoryMgtSystem.repositories.ProductRepository;
import com.phegondev.InventoryMgtSystem.repositories.ShipmentRepository;
import com.phegondev.InventoryMgtSystem.services.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardServiceImpl implements DashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final ShipmentRepository shipmentRepository;

    @Override
    public Response getDashboardMetrics() {
        try {
            long totalProducts = productRepository.count();
            
            // Note: Since JpaRepository gives us a list, we will filter in memory for simplicity, 
            // or we could use custom queries. For a small dataset, this is fine.
            long totalOrders = orderRepository.count();
            long pendingOrders = orderRepository.findAll().stream().filter(o -> o.getStatus() == OrderStatus.PENDING).count();
            long packedOrders = orderRepository.findAll().stream().filter(o -> o.getStatus() == OrderStatus.PACKED).count();
            
            long activeShipments = shipmentRepository.findAll().stream()
                    .filter(s -> s.getStatus() == ShipmentStatus.PENDING || s.getStatus() == ShipmentStatus.PACKED || s.getStatus() == ShipmentStatus.SHIPPED)
                    .count();
            long deliveredShipments = shipmentRepository.findAll().stream().filter(s -> s.getStatus() == ShipmentStatus.DELIVERED).count();
            
            long lowStockProducts = productRepository.findAll().stream().filter(p -> p.getStockQuantity() <= 5).count(); // Threshold of 5

            DashboardMetricsDTO metrics = DashboardMetricsDTO.builder()
                    .totalProducts(totalProducts)
                    .totalOrders(totalOrders)
                    .pendingOrders(pendingOrders)
                    .packedOrders(packedOrders)
                    .activeShipments(activeShipments)
                    .deliveredShipments(deliveredShipments)
                    .lowStockProducts(lowStockProducts)
                    .build();

            return Response.builder()
                    .status(200)
                    .message("success")
                    .dashboardMetrics(metrics)
                    .build();
        } catch (Exception e) {
            log.error("Error getting dashboard metrics", e);
            return Response.builder()
                    .status(500)
                    .message("Error getting dashboard metrics: " + e.getMessage())
                    .build();
        }
    }
}
