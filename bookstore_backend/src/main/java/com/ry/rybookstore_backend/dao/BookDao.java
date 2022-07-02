package com.ry.rybookstore_backend.dao;

import com.github.pagehelper.PageInfo;
import com.ry.rybookstore_backend.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface BookDao {
    Book findOne(Integer id);
    List<Book> getBooks();
    Page<Book> getBooksPage(Integer pageNum,Integer pageSize);
}


