package com.ry.rybookstore_backend.service;

import com.ry.rybookstore_backend.entity.CartItem;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CartItemService {
    List<CartItem> findCartItemsByUser_Id(Integer userId);

    void saveAnItem(CartItem cartItem);

    void deleteAnItem(CartItem cartItem);

    CartItem findCartItemByItemId(Integer itemId);

    String putOrder(String bookid, String userid);

    void deleteOrder(String itemId);

    String updateOrder(String itemId, String number);

    void payAllOrder(String userid);

}
