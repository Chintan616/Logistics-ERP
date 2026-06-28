package com.phegondev.InventoryMgtSystem.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ShipmentRequest {
    private Long orderId;
    
    @NotBlank(message = "Courier name is required")
    private String courierName;
}
