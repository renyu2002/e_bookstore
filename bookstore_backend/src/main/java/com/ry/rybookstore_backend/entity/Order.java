package com.ry.rybookstore_backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="orders")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Order {

    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @JsonManagedReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @JsonManagedReference
    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name="date_id", referencedColumnName = "dateID")
    @JsonIgnoreProperties({"orderList"})
    private DateT dateT;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name="order_id", referencedColumnName = "order_id")
    @JsonIgnoreProperties({"order"})
    private List<OrderItem> orderItems;

    public int getOrderId() { return orderId; }
    public User getUser() { return user; }
    public DateT getDateT() { return dateT; }
    public List<OrderItem> getOrderItems() { return orderItems; }

    public void setOrderId(int orderId) { this.orderId = orderId; }
    public void setUser(User user) { this.user = user; }
    public void setDateT(DateT dateT) { this.dateT = dateT; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }
}
