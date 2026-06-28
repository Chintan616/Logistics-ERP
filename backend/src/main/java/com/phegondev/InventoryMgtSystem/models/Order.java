package com.phegondev.InventoryMgtSystem.models;

import com.phegondev.InventoryMgtSystem.enums.OrderStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
@Data
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotBlank(message = "Order Number is required")
    private String orderNumber;

    @NotBlank(message = "Customer Name is required")
    private String customerName;

    @NotBlank(message = "Delivery Address is required")
    private String deliveryAddress;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private final LocalDateTime orderDate = LocalDateTime.now();
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Shipment shipment;

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", orderNumber='" + orderNumber + '\'' +
                ", customerName='" + customerName + '\'' +
                ", deliveryAddress='" + deliveryAddress + '\'' +
                ", status=" + status +
                ", orderDate=" + orderDate +
                ", updateAt=" + updateAt +
                '}';
    }
}
