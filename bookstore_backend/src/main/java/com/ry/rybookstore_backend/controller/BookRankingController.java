package com.ry.rybookstore_backend.controller;

import com.ry.rybookstore_backend.entity.BookRanking;
import com.ry.rybookstore_backend.service.BookRankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
public class BookRankingController {
    @Autowired
    private BookRankingService bookRankingService;

    @CrossOrigin
    @RequestMapping("/bookranking")
    public List<BookRanking> getAll(){ return bookRankingService.getAll(); }

    @CrossOrigin
    @RequestMapping("/bookrankingweek")
    public List<BookRanking> getAllWeek(){ return bookRankingService.getAllInAPeriodFromNow(7); }

    @CrossOrigin
    @RequestMapping("/bookrankingmonth")
    public List<BookRanking> getAllMonth(){ return bookRankingService.getAllInAPeriodFromNow(30); }

    @CrossOrigin
    @RequestMapping("/bookrankingperiod")
    public List<BookRanking> getAllPeriod(@RequestParam("begin") String begin,@RequestParam("end") String end) throws ParseException { return bookRankingService.getAllInAPeriod(begin,end); }
}
