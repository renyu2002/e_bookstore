package com.ry.rybookstore_backend.repository;

import com.ry.rybookstore_backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem,Integer> {
    List<CartItem> findCartItemsByUser_Id(Integer userId);
    CartItem findCartItemByItemId(Integer itemId);
}
