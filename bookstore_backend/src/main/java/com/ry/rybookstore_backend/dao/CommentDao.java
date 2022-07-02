package com.ry.rybookstore_backend.dao;

import com.ry.rybookstore_backend.entity.Comment;
import java.util.List;

public interface CommentDao {
    List<Comment> findCommentById(Integer id);
}