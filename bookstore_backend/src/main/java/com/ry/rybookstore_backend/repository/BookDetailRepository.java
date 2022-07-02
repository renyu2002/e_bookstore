package com.ry.rybookstore_backend.repository;

import com.ry.rybookstore_backend.entity.BookDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookDetailRepository extends JpaRepository<BookDetail,Integer> {

}