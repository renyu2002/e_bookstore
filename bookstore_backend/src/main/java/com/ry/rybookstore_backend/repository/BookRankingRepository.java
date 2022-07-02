package com.ry.rybookstore_backend.repository;

import com.ry.rybookstore_backend.entity.BookRanking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRankingRepository extends JpaRepository<BookRanking,Integer> {
}
