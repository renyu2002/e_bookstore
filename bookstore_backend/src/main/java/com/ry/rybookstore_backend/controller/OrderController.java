package com.ry.rybookstore_backend.controller;

import com.ry.rybookstore_backend.entity.Order;
import com.ry.rybookstore_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @CrossOrigin
    @RequestMapping("/orders")
    public List<Order> getOrder(@RequestParam("id") String id) { return orderService.findOrdersByUser_Id(Integer.valueOf(id)); }

    @CrossOrigin
    @RequestMapping("/allorder")
    public List<Order> allOrder() {
        return orderService.findAll();
    }
}