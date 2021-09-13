package com.dbms.store.service;

import com.dbms.store.model.User;
import com.dbms.store.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository users;

    public String getRole(String username) {
        User user = users.getUser(username);
        if (user.getIsAdmin()) {
            return "admin";
        }
        return "user";
    }
}
