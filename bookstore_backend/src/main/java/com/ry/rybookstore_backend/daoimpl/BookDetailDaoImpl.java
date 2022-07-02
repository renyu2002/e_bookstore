package com.ry.rybookstore_backend.daoimpl;

import com.ry.rybookstore_backend.entity.BookDetail;
import com.ry.rybookstore_backend.repository.BookDetailRepository;
import com.ry.rybookstore_backend.dao.BookDetailDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class BookDetailDaoImpl implements BookDetailDao {

    @Autowired
    private BookDetailRepository bookDetailRepository;

    @Override
    public BookDetail findOne(Integer id){
        return bookDetailRepository.getOne(id);
    }

    @Override
    public void saveOne(BookDetail bookDetail){bookDetailRepository.save(bookDetail);}

    @Override
    public List<BookDetail> findAll(){return bookDetailRepository.findAll();}

    @Override
    public void delete(BookDetail bookDetail){bookDetailRepository.delete(bookDetail);}

}
