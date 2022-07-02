package com.ry.rybookstore_backend.daoimpl;

import com.ry.rybookstore_backend.dao.BookRankingDao;
import com.ry.rybookstore_backend.entity.BookRanking;
import com.ry.rybookstore_backend.repository.BookRankingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookRankingDaoImpl implements BookRankingDao {
    @Autowired
    private BookRankingRepository bookRankingRepository;

    @Override
    public List<BookRanking> getAll(){return bookRankingRepository.findAll();}
}
