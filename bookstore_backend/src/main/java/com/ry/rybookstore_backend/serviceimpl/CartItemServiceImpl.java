package com.ry.rybookstore_backend.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.ry.rybookstore_backend.dao.*;
import com.ry.rybookstore_backend.entity.*;
import com.ry.rybookstore_backend.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class CartItemServiceImpl implements CartItemService {
    @Autowired
    private CartItemDao cartItemDao;
    @Autowired
    private BookBriefDao bookBriefDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private DateTDao dateTDao;
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private BookDetailDao bookDetailDao;
    @Autowired
    private OrderItemDao orderItemDao;

    @Override
    public List<CartItem> findCartItemsByUser_Id(Integer userId){return cartItemDao.findCartItemsByUser_Id(userId);}

    @Override
    public void saveAnItem(CartItem cartItem){cartItemDao.saveAnItem(cartItem);}

    @Override
    public void deleteAnItem(CartItem cartItem){cartItemDao.deleteAnItem(cartItem);}

    @Override
    public CartItem findCartItemByItemId(Integer itemId){return cartItemDao.findCartItemByItemId(itemId);}

    @Override
    public String putOrder(String bookid, String userid) {
        System.out.println("UserId= "+userid+" put an order");
        BookBrief bookBrief=bookBriefDao.findone(Integer.valueOf(bookid));
        User user=userDao.findUserById(Integer.valueOf(userid));

        List<CartItem> cartItems=cartItemDao.findCartItemsByUser_Id(Integer.valueOf(userid));
        for (CartItem cartItem:cartItems){
            if (cartItem.getBook().getId()==Integer.valueOf(bookid))
                return JSON.toJSONString("ALREADY IN", SerializerFeature.BrowserCompatible);
        }

        CartItem cartItem=new CartItem();
        cartItem.setBook(bookBrief);
        cartItem.setNum(1);
        cartItem.setUser(user);
        cartItemDao.saveAnItem(cartItem);

        BookDetail bookDetail=bookDetailDao.findOne(Integer.valueOf(bookid));
        int inventory=bookDetail.getInventory()-1;
        if (inventory<0)
            return JSON.toJSONString("inventory_empty", SerializerFeature.BrowserCompatible);
        bookDetail.setInventory(inventory);
        bookDetailDao.saveOne(bookDetail);

        return JSON.toJSONString("INSERT", SerializerFeature.BrowserCompatible);
    }

    @Override
    public void deleteOrder(String itemId){
        CartItem cartItem=cartItemDao.findCartItemByItemId(Integer.valueOf(itemId));
        Integer previousNum=cartItem.getNum();
        cartItemDao.deleteAnItem(cartItem);
        BookDetail bookDetail=bookDetailDao.findOne(cartItem.getBook().getId());
        Integer inventory=bookDetail.getInventory()+previousNum;
        bookDetail.setInventory(inventory);
        bookDetailDao.saveOne(bookDetail);
    }

    @Override
    public String updateOrder(String itemId, String number) {
        CartItem cartItem=cartItemDao.findCartItemByItemId(Integer.valueOf(itemId));
        Integer previousNum=cartItem.getNum();

        BookDetail bookDetail=bookDetailDao.findOne(cartItem.getBook().getId());
        int inventory=bookDetail.getInventory()+previousNum-Integer.parseInt(number);

        if(inventory<0)
            return JSON.toJSONString("inventory_empty", SerializerFeature.BrowserCompatible);
        else {
            bookDetail.setInventory(inventory);
            bookDetailDao.saveOne(bookDetail);
            cartItem.setNum(Integer.parseInt(number));
            cartItemDao.saveAnItem(cartItem);
            return JSON.toJSONString("success", SerializerFeature.BrowserCompatible);
        }
    }

    @Override
    public void payAllOrder(String userid) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy.MM.dd");
        Date date = new Date(System.currentTimeMillis());
        String strDate=formatter.format(date);
        List<DateT> dateT=dateTDao.findOne(strDate);
        if(dateT.isEmpty()){
            DateT dateT_new=new DateT();
            dateT_new.setDate(strDate);
            dateTDao.save(dateT_new);
        }
        DateT dateTToUse= dateTDao.findOne(strDate).get(0);

        Order order=new Order();
        User user=userDao.findUserById(Integer.valueOf(userid));
        order.setUser(user);
        order.setDateT(dateTToUse);
        orderDao.saveAnOrder(order);

        List<CartItem> cartItems=cartItemDao.findCartItemsByUser_Id(Integer.valueOf(userid));

        for(CartItem cartItem:cartItems){
            OrderItem orderItem=new OrderItem();
            orderItem.setNum(cartItem.getNum());
            orderItem.setBook(cartItem.getBook());
            orderItem.setOrder(order);

//            BookDetail bookDetail=bookDetailDao.findOne(cartItem.getBook().getId());
//            Integer inventory=bookDetail.getInventory()-cartItem.getNum();
//            bookDetail.setInventory(inventory);
//            bookDetailDao.saveOne(bookDetail);

            orderItemDao.save(orderItem);
            cartItemDao.deleteAnItem(cartItem);
        }
    }
}
