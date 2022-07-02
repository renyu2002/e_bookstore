package com.ry.rybookstore_backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="book")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class BookDetail {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "image")
    private String image;

    @Column(name = "title")
    private String title;

    @Column(name = "price")
    private int price;

    @Column(name = "author")
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "content")
    private String content;

    @Column(name = "writer")
    private String writer;

    @Column(name = "inventory")
    private Integer inventory;

    @Column(name = "isbn")
    private String isbn;


    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getWriter() { return writer; }
    public void setWriter(String writer) { this.writer = writer; }

    public Integer getInventory() { return inventory; }

    public void setInventory(Integer inventory) { this.inventory = inventory; }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}

