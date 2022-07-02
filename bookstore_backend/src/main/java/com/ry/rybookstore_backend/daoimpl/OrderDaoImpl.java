package com.ry.rybookstore_backend.daoimpl;

import com.ry.rybookstore_backend.dao.OrderDao;
import com.ry.rybookstore_backend.entity.Order;
import com.ry.rybookstore_backend.entity.OrderItem;
import com.ry.rybookstore_backend.repository.OrderItemRepository;
import com.ry.rybookstore_backend.repository.OrderPepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    private OrderPepository orderPepository;

    @Override
    public List<Order> findOrdersByUser_Id(Integer id){return orderPepository.findOrdersByUser_Id(id);}

    @Override
    public void saveAnOrder(Order order){orderPepository.save(order);}

    @Override
    public List<Order> findAll(){return orderPepository.findAll();}

    @Override
    public List<Order> findOrdersByUser_IdAndDateT_Date(Integer userId,String date){return orderPepository.findOrdersByUser_IdAndDateT_Date(userId,date);}

}
