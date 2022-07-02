package com.ry.rybookstore_backend.service;

import com.ry.rybookstore_backend.entity.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> findCommentById(Integer id);
}
