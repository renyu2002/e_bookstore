package com.ry.rybookstore_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name="book")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class BookRanking {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "price")
    private Integer price;

    @Column(name = "image")
    private String image;

    @Transient
    private Integer total;

    @Transient
    private Integer totalPay;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }

    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }

    public Integer getTotalPay() { return totalPay; }
    public void setTotalPay(Integer totalPay) { this.totalPay = totalPay; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
