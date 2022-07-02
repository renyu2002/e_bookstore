package com.ry.rybookstore_backend.service;

import com.ry.rybookstore_backend.entity.BookDetail;

import java.util.List;
import java.util.Map;


public interface BookDetailService {

    BookDetail findBookDetailById(Integer id);

    void saveOne(BookDetail bookDetail);

    List<BookDetail> findAll();

    void delete(BookDetail bookDetail);

    void saveABook(Map<String,Object> map);

    void newABook(Map<String,Object> map);

    void deleteById(String id);

}
