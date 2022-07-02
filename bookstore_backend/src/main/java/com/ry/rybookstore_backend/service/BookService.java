package com.ry.rybookstore_backend.service;

import com.ry.rybookstore_backend.entity.Book;
import com.ry.rybookstore_backend.Dto.SearchPage;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BookService {

    Book findBookById(Integer id);

    List<Book> getBooks();

    Page<Book> getBooksPage(Integer pageNum, Integer pageSize);

    SearchPage search(String pageNum,String needle);
}
