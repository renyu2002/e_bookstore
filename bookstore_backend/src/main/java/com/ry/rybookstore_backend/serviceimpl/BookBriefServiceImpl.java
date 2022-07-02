package com.ry.rybookstore_backend.serviceimpl;

import com.ry.rybookstore_backend.dao.BookBriefDao;
import com.ry.rybookstore_backend.entity.BookBrief;
import com.ry.rybookstore_backend.service.BookBriefService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookBriefServiceImpl implements BookBriefService {
    @Autowired
    private BookBriefDao bookBriefDao;

    @Override
    public BookBrief findOne(Integer id){return bookBriefDao.findone(id);}
}
