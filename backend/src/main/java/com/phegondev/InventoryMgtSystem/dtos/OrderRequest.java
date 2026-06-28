package com.phegondev.InventoryMgtSystem.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Delivery address is required")
    private String deliveryAddress;

    private List<OrderItemRequest> orderItems;
}
