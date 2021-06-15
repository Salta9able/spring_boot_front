package com.example.demo.service;

import com.example.demo.entity.User;
//import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    List<User> findAll();
    User findById(int id);
    List<User> saveUser(User user);
    void deleteById(int id);
}
