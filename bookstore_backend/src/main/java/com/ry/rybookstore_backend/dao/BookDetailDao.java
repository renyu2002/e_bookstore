package com.ry.rybookstore_backend.dao;

import com.ry.rybookstore_backend.entity.BookDetail;

import java.util.List;

public interface BookDetailDao {
    BookDetail findOne(Integer id);

    void saveOne(BookDetail bookDetail);

    List<BookDetail> findAll();

    void delete(BookDetail bookDetail);
}
