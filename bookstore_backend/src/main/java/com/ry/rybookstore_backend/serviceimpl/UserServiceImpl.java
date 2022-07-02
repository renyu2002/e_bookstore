package com.ry.rybookstore_backend.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.ry.rybookstore_backend.dao.UserDao;
import com.ry.rybookstore_backend.entity.User;
import com.ry.rybookstore_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public List<User> checkUser(String username, String password){ return userDao.checkUser(username, password); }

    @Override
    public User findUserById(Integer id){ return userDao.findUserById(id); }

    @Override
    public void addUser(User user){userDao.addUser(user);}

    @Override
    public List<User> findAllUser(){return userDao.findAllUser();}

    @Override
    public void modify(User user){userDao.modify(user);}

    @Override
    public List<User> findUsersByUsername(String username){return userDao.findUsersByUsername(username);}

    @Override
    public boolean checkDuplicate(String username){
        return userDao.findUsersByUsername(username).isEmpty();
    }

    @Override
    public User check(Map<String,Object> map){
        String username=(String) map.get("username");
        String password=(String) map.get("password");
        List<User> users=userDao.checkUser(username,password);
        if(users.isEmpty())
            return new User();
        else
            return users.get(0);
    }

    @Override
    public String addAUser(Map<String,Object> map){
        String username=(String)map.get("username");
        String password=(String)map.get("password");
        String live=(String)map.get("live");
        String address=(String)map.get("address");
        String email=(String)map.get("email");
        String telephone=(String)map.get("telephone");

        List<User> users=userDao.findUsersByUsername(username);
        if(!users.isEmpty())
            return JSON.toJSONString("Duplicate Username", SerializerFeature.BrowserCompatible);

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setLive(live);
        user.setAddress(address);
        user.setEmail(email);
        user.setTelephone(telephone);
        user.setBan(0);
        user.setAdministractor(0);

        userDao.addUser(user);
        return JSON.toJSONString("DONE", SerializerFeature.BrowserCompatible);
    }

    @Override
    public void banUser(String id){
        Integer userid=Integer.valueOf(id);
        User user=userDao.findUserById(userid);
        user.setBan(1);
        userDao.modify(user);
    }

    @Override
    public void unbanUser(String id) {
        Integer userid=Integer.valueOf(id);
        User user=userDao.findUserById(userid);
        user.setBan(0);
        userDao.modify(user);
    }

    @Override
    public String checkAdministrator(String userid){
        User user=userDao.findUserById(Integer.valueOf(userid));
        if(user.getAdministractor()==1)
            return JSON.toJSONString("yes", SerializerFeature.BrowserCompatible);
        else
            return JSON.toJSONString("no", SerializerFeature.BrowserCompatible);
    }


}
