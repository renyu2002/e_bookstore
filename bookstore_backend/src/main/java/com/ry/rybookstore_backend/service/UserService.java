package com.ry.rybookstore_backend.service;

import com.ry.rybookstore_backend.entity.User;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;


public interface UserService {

    List<User> checkUser(String username, String password);

    User findUserById(Integer id);

    void addUser(User user);

    List<User> findAllUser();

    void modify(User user);

    List<User> findUsersByUsername(String username);

    boolean checkDuplicate(String username);

    User check(Map<String,Object> map);

    String addAUser(Map<String,Object> map);

    void banUser(String id);

    void unbanUser(String id);

    String checkAdministrator(String userid);
    }
