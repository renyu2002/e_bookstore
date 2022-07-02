package com.ry.rybookstore_backend.repository;

import com.ry.rybookstore_backend.entity.UserOrders;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserOrdersRepository extends JpaRepository<UserOrders,Integer> {
}
