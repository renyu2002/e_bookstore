package com.ry.rybookstore_backend.service;

import com.ry.rybookstore_backend.entity.Order;

import java.util.List;

public interface OrderService {

    List<Order> findOrdersByUser_Id(Integer id);

    void saveAnOrder(Order order);

    List<Order> findAll();

}
