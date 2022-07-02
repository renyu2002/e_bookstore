package com.ry.rybookstore_backend.controller;

import com.ry.rybookstore_backend.Dto.UserPurchaseStatistics;
import com.ry.rybookstore_backend.entity.UserOrders;
import com.ry.rybookstore_backend.service.UserOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
public class UserOrdersController {
    @Autowired
    private UserOrdersService userOrdersService;

    @CrossOrigin
    @RequestMapping("/userranking")
    public List<UserOrders> allUserOrders(){
        return userOrdersService.getAll();
    }

    @CrossOrigin
    @RequestMapping("/userrankingweek")
    public List<UserOrders> allUserOrdersWeek(){
        return userOrdersService.getAllWeek();
    }

    @CrossOrigin
    @RequestMapping("/userrankingmonth")
    public List<UserOrders> allUserOrdersMonth(){
        return userOrdersService.getAllMonth();
    }

    @CrossOrigin
    @RequestMapping("/userrankingperiod")
    public List<UserOrders> allUserOrdersPeriod(@RequestParam("begin") String begin, @RequestParam("end") String end) throws ParseException {
        return userOrdersService.getAllInAPeriod(begin,end);
    }

    @CrossOrigin
    @RequestMapping("/userOrderStaticsAll")
    public UserPurchaseStatistics userOrderStaticsAll(@RequestParam("userid") String userid){
        return userOrdersService.getAllStatics(userid);
    }

    @CrossOrigin
    @RequestMapping("/userOrderStaticsPeriod")
    public UserPurchaseStatistics userOrderStaticsPeriod(@RequestParam("userid") String userid, @RequestParam("begin") String begin, @RequestParam("end") String end) throws ParseException {
        return userOrdersService.getPeriodStatics(userid,begin,end);
    }
}
