package com.ry.rybookstore_backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name="datetable")
public class DateT {
    @Id
    @Column(name = "dateID")
    private int dateID;

    @Column(name = "date")
    private String date;

    @JsonManagedReference
    @OneToMany( fetch = FetchType.LAZY)
    @JoinColumn(name="date_id", referencedColumnName = "dateID")
    private List<Order> orderList;

    public int getDateID() { return dateID; }
    public void setDateID(int dateID) { this.dateID=dateID; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date=date; }

    public List<Order> getOrderList() { return orderList; }
}
