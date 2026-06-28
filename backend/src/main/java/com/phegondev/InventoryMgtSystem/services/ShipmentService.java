package com.phegondev.InventoryMgtSystem.services;

import com.phegondev.InventoryMgtSystem.dtos.ShipmentRequest;
import com.phegondev.InventoryMgtSystem.dtos.Response;
import com.phegondev.InventoryMgtSystem.enums.ShipmentStatus;

public interface ShipmentService {
    Response createShipment(ShipmentRequest shipmentRequest);
    Response getAllShipments();
    Response getShipmentById(Long id);
    Response updateShipmentStatus(Long id, ShipmentStatus status);
}
