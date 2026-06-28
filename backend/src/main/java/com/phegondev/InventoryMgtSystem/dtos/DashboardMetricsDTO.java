package com.phegondev.InventoryMgtSystem.dtos;

import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardMetricsDTO {
    private long totalProducts;
    private long totalOrders;
    private long pendingOrders;
    private long packedOrders;
    private long activeShipments;
    private long deliveredShipments;
    private long lowStockProducts;
}
