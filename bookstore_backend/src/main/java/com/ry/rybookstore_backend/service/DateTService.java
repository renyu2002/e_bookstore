package com.ry.rybookstore_backend.service;

import com.ry.rybookstore_backend.entity.DateT;

import java.util.List;

public interface DateTService {
    void save(DateT dateT);
    List<DateT> findOne(String date);
}
