package com.ry.rybookstore_backend.repository;

import com.ry.rybookstore_backend.entity.DateT;
import com.ry.rybookstore_backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem,Integer> {
    List<OrderItem> findOrderItemsByBook_Id(Integer bookId);

    List<OrderItem> findOrderItemsByBook_IdAndOrder_DateT_Date(Integer bookId,String date);
}
