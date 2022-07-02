package com.ry.rybookstore_backend.Dto;

import com.ry.rybookstore_backend.entity.BookBrief;
import org.springframework.data.util.Pair;

import java.util.List;

public class UserPurchaseStatistics {
    private Integer totalBook;
    private Integer totalPay;
    private String beginDate;
    private String endDate;
    private List<BookAndNum> bookBriefs;

    public Integer getTotalBook() { return totalBook; }
    public Integer getTotalPay() { return totalPay; }
    public String getBeginDate() { return beginDate; }
    public String getEndDate() { return endDate; }
    public List<BookAndNum> getBookBriefs() { return bookBriefs; }

    public void setTotalBook(Integer totalBook) { this.totalBook = totalBook; }
    public void setTotalPay(Integer totalPay) { this.totalPay = totalPay; }
    public void setBeginDate(String beginDate) { this.beginDate = beginDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
    public void setBookBriefs(List<BookAndNum> bookBriefs) { this.bookBriefs = bookBriefs; }
}
