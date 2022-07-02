package com.ry.rybookstore_backend.dao;

import com.ry.rybookstore_backend.entity.Order;
import com.ry.rybookstore_backend.entity.OrderItem;

import java.util.List;

public interface OrderDao {
    List<Order> findOrdersByUser_Id(Integer id);

    void saveAnOrder(Order order);

    List<Order> findAll();

    List<Order> findOrdersByUser_IdAndDateT_Date(Integer userId, String date);

}
