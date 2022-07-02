package com.ry.rybookstore_backend.Dto;

import com.ry.rybookstore_backend.entity.Book;

import java.util.List;

public class SearchPage {
    private Integer totalPage;
    private Integer currentPage;
    private String needle;
    private List<Book> books;
    private Integer pageSize;
    private Integer total;

    public void setTotalPage(Integer totalPage) { this.totalPage = totalPage; }
    public void setCurrentPage(Integer currentPage) { this.currentPage = currentPage; }
    public void setNeedle(String needle) { this.needle = needle; }
    public void setBooks(List<Book> books) { this.books = books; }
    public void setPageSize(Integer pageSize) { this.pageSize = pageSize; }
    public void setTotal(Integer total) { this.total = total; }

    public Integer getTotalPage() { return totalPage; }
    public Integer getCurrentPage() { return currentPage; }
    public String getNeedle() { return needle; }
    public List<Book> getBooks() { return books; }
    public Integer getPageSize() { return pageSize; }
    public Integer getTotal() { return total; }
}