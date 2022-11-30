package com.example.sportclub.service;

import java.util.List;

import com.example.sportclub.model.User;

public interface UserService {
    User findById(Long id);
    User findByUsername(String username);
    List<User> findAll ();

    User save(User userDtoToUser);
}
