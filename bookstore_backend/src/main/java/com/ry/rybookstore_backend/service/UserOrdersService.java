package com.ry.rybookstore_backend.service;

import com.ry.rybookstore_backend.Dto.UserPurchaseStatistics;
import com.ry.rybookstore_backend.entity.UserOrders;

import java.text.ParseException;
import java.util.List;

public interface UserOrdersService {
    List<UserOrders> getAll();

    List<UserOrders> getAllWeek();

    List<UserOrders> getAllMonth();

    List<UserOrders> getAllInAPeriod(String begin, String end) throws ParseException;

    UserPurchaseStatistics getPeriodStatics(String userid, String begin, String end) throws ParseException ;

    UserPurchaseStatistics getAllStatics(String userid);

    }
