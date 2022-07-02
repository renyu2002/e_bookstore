package com.ry.rybookstore_backend.repository;

import com.github.pagehelper.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ry.rybookstore_backend.entity.Book;
import org.springframework.data.jpa.repository.Query;

import java.awt.print.Pageable;
import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {
    @Query("select b from Book b")
    List<Book> getBooks();

}