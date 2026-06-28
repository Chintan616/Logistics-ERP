package com.phegondev.InventoryMgtSystem.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.phegondev.InventoryMgtSystem.enums.ShipmentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "shipments", indexes = {
        @Index(name = "idx_shipment_status", columnList = "status"),
        @Index(name = "idx_shipment_tracking", columnList = "trackingNumber")
})
@Data
@Builder
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String trackingNumber;

    @NotBlank(message = "Courier Name is required")
    private String courierName;

    @Enumerated(EnumType.STRING)
    private ShipmentStatus status;

    private LocalDateTime shipmentDate;
    
    private final LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updateAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", unique = true)
    @JsonIgnore
    private Order order;

    @Override
    public String toString() {
        return "Shipment{" +
                "id=" + id +
                ", trackingNumber='" + trackingNumber + '\'' +
                ", courierName='" + courierName + '\'' +
                ", status=" + status +
                ", shipmentDate=" + shipmentDate +
                ", createdAt=" + createdAt +
                ", updateAt=" + updateAt +
                '}';
    }
}
