package com.ry.rybookstore_backend.repository;

import com.ry.rybookstore_backend.entity.BookBrief;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookBriefRepository extends JpaRepository<BookBrief,Integer> {
}
