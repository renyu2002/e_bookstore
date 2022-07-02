package com.ry.rybookstore_backend.repository;

import com.ry.rybookstore_backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Integer> {

    @Query(value = "from Comment where id = :id")
    List<Comment> findCommentById(@Param("id")Integer id);
}