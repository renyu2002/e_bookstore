package com.ry.rybookstore_backend.controller;

import com.ry.rybookstore_backend.entity.Comment;
import com.ry.rybookstore_backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @CrossOrigin
    @RequestMapping("/comments")
    public List<Comment> getComments(@RequestParam("bookid") String bookid) { return commentService.findCommentById(Integer.valueOf(bookid)); }
}
