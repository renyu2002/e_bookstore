package com.ry.rybookstore_backend.daoimpl;

import com.ry.rybookstore_backend.dao.CartItemDao;
import com.ry.rybookstore_backend.entity.CartItem;
import com.ry.rybookstore_backend.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartItemDaoImpl implements CartItemDao {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public List<CartItem> findCartItemsByUser_Id(Integer userId){ return cartItemRepository.findCartItemsByUser_Id(userId); }

    @Override
    public void saveAnItem(CartItem cartItem){cartItemRepository.save(cartItem);}

    @Override
    public void deleteAnItem(CartItem cartItem){cartItemRepository.delete(cartItem);}

    @Override
    public CartItem findCartItemByItemId(Integer itemId){return cartItemRepository.findCartItemByItemId(itemId);}

}
