package com.ry.rybookstore_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name="users")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class UserOrders {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "username")
    private String username;

    @Transient
    private Integer totalNum;

    @Transient
    private Integer totalPay;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Integer getTotalNum() { return totalNum; }
    public void setTotalNum(Integer totalNum) { this.totalNum = totalNum; }

    public Integer getTotalPay() { return totalPay; }
    public void setTotalPay(Integer totalPay) { this.totalPay = totalPay; }
}
