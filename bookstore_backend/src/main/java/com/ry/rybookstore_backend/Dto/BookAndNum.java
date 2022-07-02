package com.ry.rybookstore_backend.Dto;

import com.ry.rybookstore_backend.entity.BookBrief;

public class BookAndNum {
    private Integer num;
    private BookBrief bookBrief;

    public Integer getNum() { return num; }
    public BookBrief getBookBrief() { return bookBrief; }
    public void setNum(Integer num) { this.num = num; }
    public void setBookBrief(BookBrief bookBrief) { this.bookBrief = bookBrief; }
}
