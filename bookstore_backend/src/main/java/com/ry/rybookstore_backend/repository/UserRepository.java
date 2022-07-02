package com.ry.rybookstore_backend.repository;

import com.ry.rybookstore_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "from User where username = :username and password = :password")
    List<User> checkUser(@Param("username") String username, @Param("password") String password);

    @Query(value = "from User where id = :id")
    User findUserById(@Param("id")Integer id);

    List<User> findUsersByUsername(String username);
}
