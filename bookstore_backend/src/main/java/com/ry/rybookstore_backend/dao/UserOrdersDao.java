package com.ry.rybookstore_backend.dao;

import com.ry.rybookstore_backend.entity.UserOrders;

import java.util.List;

public interface UserOrdersDao {
    List<UserOrders> getAll();
}
