package com.ry.rybookstore_backend.dao;

import com.ry.rybookstore_backend.entity.CartItem;

import java.util.List;

public interface CartItemDao {
    List<CartItem> findCartItemsByUser_Id(Integer userId);

    void saveAnItem(CartItem cartItem);

    void deleteAnItem(CartItem cartItem);

    CartItem findCartItemByItemId(Integer itemId);

}
