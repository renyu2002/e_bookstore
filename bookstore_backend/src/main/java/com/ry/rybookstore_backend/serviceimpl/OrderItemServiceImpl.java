package com.ry.rybookstore_backend.serviceimpl;

import com.ry.rybookstore_backend.dao.OrderItemDao;
import com.ry.rybookstore_backend.entity.OrderItem;
import com.ry.rybookstore_backend.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    @Autowired
    OrderItemDao orderItemDao;

    @Override
    public void save(OrderItem orderItem){orderItemDao.save(orderItem);}

}
