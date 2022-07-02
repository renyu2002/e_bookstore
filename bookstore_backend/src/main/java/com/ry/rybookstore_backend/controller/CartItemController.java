package com.ry.rybookstore_backend.controller;

import com.ry.rybookstore_backend.entity.*;
import com.ry.rybookstore_backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;

    /* Add a new cart Item */
    @CrossOrigin
    @RequestMapping("/addorder")
    public String putOrder(
            @RequestParam("bookid") String bookid ,
            @RequestParam("userid") String userid) {
        return cartItemService.putOrder(bookid,userid);
    }

    @CrossOrigin
    @RequestMapping("/deleteorder")
    public String deleteOrder(@RequestParam("itemId") String itemId) {
        cartItemService.deleteOrder(itemId);
        return "DONE";
    }

    @CrossOrigin
    @RequestMapping("/updateorder")
    public String updateOrder(
            @RequestParam("itemId") String itemId,
            @RequestParam("number") String number) {
        return cartItemService.updateOrder(itemId,number);
    }

    @CrossOrigin
    @RequestMapping("/cartOrders")
    public List<CartItem> getCartOrders(@RequestParam("id") String id) {
            return cartItemService.findCartItemsByUser_Id(Integer.valueOf(id));
    }

    @CrossOrigin
    @RequestMapping("/payall")
    public String payAllOrder(@RequestParam("userid") String userid) {
        cartItemService.payAllOrder(userid);
        return "DONE";
    }
}