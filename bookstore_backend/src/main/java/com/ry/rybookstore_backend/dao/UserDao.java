package com.ry.rybookstore_backend.dao;

import com.ry.rybookstore_backend.entity.User;
import java.util.List;

public interface UserDao {
    List<User> checkUser(String username, String password);
    User findUserById(Integer id);
    void addUser(User user);
    List<User> findAllUser();
    void modify(User user);
    List<User> findUsersByUsername(String username);

}
