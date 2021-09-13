package com.dbms.store.repository;

import com.dbms.store.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
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
        try{
            user = template.queryForObject(sql, new BeanPropertyRowMapper<>(User.class),new Object[] {username});
        }catch(Exception e){
            e.printStackTrace();
            System.out.println(e);
        }     
        return user;
    }

    public void update(User user) {
        String sql = "UPDATE user SET password = ? WHERE username = ?";
        template.update(sql, user.getPassword(), user.getUsername());
    }
}
