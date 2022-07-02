package com.ry.rybookstore_backend.daoimpl;

import com.ry.rybookstore_backend.dao.UserDao;
import com.ry.rybookstore_backend.entity.User;
import com.ry.rybookstore_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> checkUser(String username, String password){return userRepository.checkUser(username,password);}

    @Override
    public User findUserById(Integer id){return userRepository.findUserById(id);}

    @Override
    public void addUser(User user){userRepository.save(user);}

    @Override
    public List<User> findAllUser(){return userRepository.findAll();}

    @Override
    public void modify(User user){userRepository.save(user);}

    @Override
    public List<User> findUsersByUsername(String username){return userRepository.findUsersByUsername(username);}

}
