package com.ry.rybookstore_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name="book")
public class BookBrief {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "image")
    private String image;

    @Column(name = "title")
    private String title;

    @Column(name = "price")
    private int price;

    @Column(name = "description")
    private String description;

    @Column(name = "inventory")
    private Integer inventory;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="book_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"book","user"})
    private List<CartItem> cartItems;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="book_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"book","order"})
    private List<OrderItem> orderItems;

    public String getTitle() { return title; }

    public int getId() { return id; }

    public int getPrice() { return price; }

    public String getImage() { return image; }

    public String getDescription() { return description; }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public Integer getInventory() {
        return inventory;
    }
}