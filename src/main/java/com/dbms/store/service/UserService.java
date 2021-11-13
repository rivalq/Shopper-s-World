package com.dbms.store.service;

import com.dbms.store.model.User;
import com.dbms.store.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository users;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    

    public String getRole(String username) {
        User user = users.getUser(username);
        if (user.isIsAdmin()) {
            return "admin";
        }
        return "user";
    }

    public User findByUsername(String username) {
        return users.getUser(username);
    }

    public User findByEmail(String email){
        return users.getUserByEmail(email);
    }
    public User findByPhone(String phone){
        return users.getUserByPhone(phone);
    }

    public void register(User user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        users.addUser(user);
    }
}
