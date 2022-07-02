package com.ry.rybookstore_backend.dao;

import com.ry.rybookstore_backend.entity.DateT;
import java.util.List;

public interface DateTDao {
    void save(DateT dateT);
    List<DateT> findOne(String date);
}