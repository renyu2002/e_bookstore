package com.ry.rybookstore_backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
@Table(name="cart_item")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class CartItem {

    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    @Column(name = "num")
    private int num;

    @JsonManagedReference
    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name="book_id", referencedColumnName = "id")
    private BookBrief book;

    @JsonManagedReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    public int getItemId() { return itemId; }
    public int getNum() { return num; }
    public BookBrief getBook() { return book; }
    public User getUser() { return user; }

    public void setItemId(int itemId) { this.itemId = itemId; }
    public void setNum(int num) { this.num = num; }
    public void setBook(BookBrief book) { this.book = book; }
    public void setUser(User user) { this.user = user; }
}
