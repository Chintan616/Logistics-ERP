package com.phegondev.InventoryMgtSystem.repositories;

import com.phegondev.InventoryMgtSystem.models.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
