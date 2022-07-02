package com.ry.rybookstore_backend.daoimpl;

import com.ry.rybookstore_backend.dao.BookBriefDao;
import com.ry.rybookstore_backend.entity.BookBrief;
import com.ry.rybookstore_backend.repository.BookBriefRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BookBriefDaoImpl implements BookBriefDao {
    @Autowired
    private BookBriefRepository bookBriefRepository;

    @Override
    public BookBrief findone(Integer id){return bookBriefRepository.getOne(id);}
}
