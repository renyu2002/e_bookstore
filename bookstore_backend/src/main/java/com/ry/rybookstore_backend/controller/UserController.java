package com.ry.rybookstore_backend.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.ry.rybookstore_backend.entity.User;
import com.ry.rybookstore_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin
    @RequestMapping("/checkduplicate")
    public String checkDuplicate(@RequestParam("username") String username) {
        if(userService.checkDuplicate(username))
            return JSON.toJSONString("Welcome", SerializerFeature.BrowserCompatible);
        else
            return JSON.toJSONString("Duplicate Username", SerializerFeature.BrowserCompatible);
    }

    @CrossOrigin
    @RequestMapping("/user")
    public User userinfo(@RequestParam("userid") String userid) { return userService.findUserById(Integer.valueOf(userid)); }

    @CrossOrigin
    @RequestMapping("/checkuser")
    public User check(@RequestBody Map<String,Object> map) { return userService.check(map); }

    @CrossOrigin
    @RequestMapping("/adduser")
    public String addUser(@RequestBody Map<String,Object> map) { return userService.addAUser(map); }

    @CrossOrigin
    @RequestMapping("/usersmanagement")
    public List<User> allUser() {
        return userService.findAllUser();
    }

    @CrossOrigin
    @RequestMapping("/banuser")
    public void banUser(@RequestParam("userid") String id) { userService.banUser(id); }

    @CrossOrigin
    @RequestMapping("/unbanuser")
    public void unbanUser(@RequestParam("userid") String id) { userService.unbanUser(id); }

    @CrossOrigin
    @RequestMapping("/checkAdministrator")
    public String checkAdministrator(@RequestParam("userid") String userid){
        return userService.checkAdministrator(userid);
    }
}