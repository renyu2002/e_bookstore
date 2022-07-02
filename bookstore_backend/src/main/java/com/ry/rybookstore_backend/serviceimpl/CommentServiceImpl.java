package com.ry.rybookstore_backend.serviceimpl;

import com.ry.rybookstore_backend.dao.CommentDao;
import com.ry.rybookstore_backend.entity.Comment;
import com.ry.rybookstore_backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentDao commentDao;

    @Override
    public List<Comment> findCommentById(Integer id){
        return commentDao.findCommentById(id);
    }

}