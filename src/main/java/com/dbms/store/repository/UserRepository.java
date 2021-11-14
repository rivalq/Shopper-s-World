package com.dbms.store.repository;

import com.dbms.store.Mapper.UserMapper;
import com.dbms.store.model.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate template;

    public void addUser(User user) {
        String sql = "INSERT INTO user (username, password, email, first_name, last_name, phone, street, city, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql, user.getUsername(), user.getPassword(), user.getEmail(), user.getFirst_name(), user.getLast_name(), user.getPhone(), user.getStreet(), user.getCity(), user.getProfile_image());
    }

    public User getUser(String username) {
        String sql = "SELECT * FROM user WHERE username = ?";
        User user = new User();
        try {
            user = template.queryForObject(sql, new UserMapper(), new Object[] { username });
        } catch (Exception e) {}
        return user;
    }

    public List<User> getUsers() {
        String sql = "SELECT * FROM user";
        return template.query(sql, new UserMapper());
    }

    public User getUserByEmail(String email) {
        String sql = "SELECT * FROM user WHERE email = ?";
        try {
            User user = template.queryForObject(sql, new UserMapper(), new Object[] { email });
            return user;
        } catch (Exception e) {
            return new User();
        }
    }

    public User getUserByPhone(String phone) {
        String sql = "SELECT * FROM user WHERE phone = ?";
        try {
            User user = template.queryForObject(sql, new UserMapper(), new Object[] { phone });
            return user;
        } catch (Exception e) {
            return new User();
        }
    }

    public void updateUser(User user){
        String sql = "UPDATE user set first_name = ?, last_name = ?, city = ?, street = ? where username = ?";
        template.update(sql, user.getFirst_name(),user.getLast_name(),user.getCity(),user.getStreet(),user.getUsername());
    }

    public void changeCredits(User user) {
        String sql = "UPDATE user set credits = ? where username = ?";
        template.update(sql, user.getCredits(), user.getUsername());
    }

    public void changeRole(User user) {
        String sql = "UPDATE user set is_admin = ?, is_seller = ? where username = ?";
        template.update(sql, user.isIsAdmin(), user.isIsSeller(), user.getUsername());
    }

    public void deleteUser(User user) {
        template.update("DELETE FROM user where username = ?", user.getUsername());
    }
}
