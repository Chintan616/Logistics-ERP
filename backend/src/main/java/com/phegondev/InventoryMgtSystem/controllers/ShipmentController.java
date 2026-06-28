package com.phegondev.InventoryMgtSystem.controllers;

import com.phegondev.InventoryMgtSystem.dtos.Response;
import com.phegondev.InventoryMgtSystem.dtos.ShipmentRequest;
import com.phegondev.InventoryMgtSystem.enums.ShipmentStatus;
import com.phegondev.InventoryMgtSystem.services.ShipmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipments")
@RequiredArgsConstructor
public class ShipmentController {

    private final ShipmentService shipmentService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
    public ResponseEntity<Response> createShipment(@RequestBody @Valid ShipmentRequest shipmentRequest) {
        return ResponseEntity.ok(shipmentService.createShipment(shipmentRequest));
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllShipments() {
        return ResponseEntity.ok(shipmentService.getAllShipments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getShipmentById(@PathVariable Long id) {
        return ResponseEntity.ok(shipmentService.getShipmentById(id));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
    public ResponseEntity<Response> updateShipmentStatus(@PathVariable Long id, @RequestParam ShipmentStatus status) {
        return ResponseEntity.ok(shipmentService.updateShipmentStatus(id, status));
    }
}
