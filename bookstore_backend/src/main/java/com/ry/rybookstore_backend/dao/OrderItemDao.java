package com.ry.rybookstore_backend.dao;

import com.ry.rybookstore_backend.entity.OrderItem;

import java.util.List;

public interface OrderItemDao {
    void save(OrderItem orderItem);
    List<OrderItem> findOrderItemsByBook_Id(Integer bookId);

    List<OrderItem> findOrderItemsByBook_IdAndOrder_DateT_Date(Integer bookId,String date);

}
