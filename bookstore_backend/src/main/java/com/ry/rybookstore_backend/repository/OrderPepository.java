package com.ry.rybookstore_backend.repository;

import com.ry.rybookstore_backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface OrderPepository extends JpaRepository<Order,Integer> {
    List<Order> findOrdersByUser_Id(Integer id);
    List<Order> findOrdersByUser_IdAndDateT_Date(Integer userId, String date);

}
