package com.ry.rybookstore_backend.daoimpl;

import com.ry.rybookstore_backend.dao.BookDao;
import com.ry.rybookstore_backend.entity.Book;
import com.ry.rybookstore_backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book findOne(Integer id){
        return bookRepository.getOne(id);
    }

    @Override
    public List<Book> getBooks() { return bookRepository.getBooks(); }

    @Override
    public Page<Book> getBooksPage(Integer pageNum,Integer pageSize){
        PageRequest pageRequest = PageRequest.of(pageNum - 1, pageSize); // （当前页， 每页记录数， 排序方式）
        Page<Book> list = bookRepository.findAll(pageRequest);
        return list;
    }
}
