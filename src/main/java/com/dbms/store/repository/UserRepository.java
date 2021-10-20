package com.dbms.store.repository;

import com.dbms.store.Mapper.UserMapper;
import com.dbms.store.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate template;

    public void createUser(String username, String password) {
        String sql = "INSERT INTO user (username, password, isAdmin) VALUES (?, ?, 0)";
        template.update(sql, username, password);
    }

    public User getUser(String username) {
        String sql = "SELECT * FROM user WHERE username = ?";
        User user = new User();
        try {
            user = template.queryForObject(sql, new UserMapper(), new Object[] { username });
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e);
        }
        return user;
    }

    public void updatePassword(User user) {
        String sql = "UPDATE user SET password = ? WHERE username = ?";
        template.update(sql, user.getPassword(), user.getUsername());
    }

    public void updateFirstName(User user) {
        String sql = "UPDATE user SET first_name = ? WHERE username = ?";
        template.update(sql, user.getFirst_name(), user.getUsername());
    }

    public void updateLastName(User user) {
        String sql = "UPDATE user SET last_name = ? WHERE username = ?";
        template.update(sql, user.getLast_name(), user.getUsername());
    }
}
