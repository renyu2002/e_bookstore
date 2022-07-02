package com.ry.rybookstore_backend.serviceimpl;

import com.ry.rybookstore_backend.dao.BookDetailDao;
import com.ry.rybookstore_backend.entity.BookDetail;
import com.ry.rybookstore_backend.service.BookDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BookDetailServiceImpl implements BookDetailService {

    @Autowired
    private BookDetailDao bookDetailDao;

    @Override
    public BookDetail findBookDetailById(Integer id){ return bookDetailDao.findOne(id);}

    @Override
    public void saveOne(BookDetail bookDetail){bookDetailDao.saveOne(bookDetail);}

    @Override
    public List<BookDetail> findAll(){return bookDetailDao.findAll();}

    @Override
    public void delete(BookDetail bookDetail){bookDetailDao.delete(bookDetail);}

    @Override
    public void saveABook(Map<String,Object> map){
        Integer id=(Integer) map.get("id");
        String image=(String)map.get("image");
        String title=(String)map.get("title");
        Integer price=(Integer) map.get("price");
        String author=(String)map.get("author");
        String description=(String)map.get("description");
        String content=(String)map.get("content");
        String writer=(String)map.get("writer");
        Integer inventory=(Integer) map.get("inventory");
        String isbn=(String)map.get("isbn");

        BookDetail bookDetail=bookDetailDao.findOne(id);
        bookDetail.setImage(image);
        bookDetail.setTitle(title);
        bookDetail.setPrice(price);
        bookDetail.setAuthor(author);
        bookDetail.setDescription(description);
        bookDetail.setContent(content);
        bookDetail.setWriter(writer);
        bookDetail.setInventory(inventory);
        bookDetail.setIsbn(isbn);
        bookDetailDao.saveOne(bookDetail);
    }

    @Override
    public void newABook(Map<String,Object> map){
        String image=(String)map.get("image");
        String title=(String)map.get("title");
        Integer price=(Integer)map.get("price");
        String author=(String)map.get("author");
        String description=(String)map.get("description");
        String content=(String)map.get("content");
        String writer=(String)map.get("writer");
        Integer inventory=(Integer) map.get("inventory");
        String isbn=(String)map.get("isbn");

        BookDetail bookDetail=new BookDetail();
        bookDetail.setImage(image);
        bookDetail.setTitle(title);
        bookDetail.setPrice(price);
        bookDetail.setAuthor(author);
        bookDetail.setDescription(description);
        bookDetail.setContent(content);
        bookDetail.setWriter(writer);
        bookDetail.setInventory(inventory);
        bookDetail.setIsbn(isbn);
        bookDetailDao.saveOne(bookDetail);
    }

    @Override
    public void deleteById(String id){
        BookDetail bookDetail=bookDetailDao.findOne(Integer.valueOf(id));
        bookDetailDao.delete(bookDetail);
    }

}