package com.ry.rybookstore_backend.service;

import com.ry.rybookstore_backend.entity.BookRanking;

import java.text.ParseException;
import java.util.List;

public interface BookRankingService {
    List<BookRanking> getAll();
    List<BookRanking> getAllInAPeriodFromNow(Integer period);
    List<BookRanking> getAllInAPeriod(String begin,String end)throws ParseException;


    }
