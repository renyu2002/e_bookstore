package com.ry.rybookstore_backend.serviceimpl;

import com.ry.rybookstore_backend.dao.OrderDao;
import com.ry.rybookstore_backend.entity.Order;
import com.ry.rybookstore_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;

    @Override
    public  List<Order> findOrdersByUser_Id(Integer id){return orderDao.findOrdersByUser_Id(id);}

    @Override
    public void saveAnOrder(Order order){orderDao.saveAnOrder(order);}

    @Override
    public List<Order> findAll(){return orderDao.findAll();}

}
