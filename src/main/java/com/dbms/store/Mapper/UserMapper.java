package com.dbms.store.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.dbms.store.model.User;

import org.springframework.jdbc.core.RowMapper;

public class UserMapper implements RowMapper<User> {
    
        public User mapRow(ResultSet rs,int rownum) throws SQLException {
                User us = new User();
                us.setUsername(rs.getString("username"));
                us.setFirst_name(rs.getString("first_name"));
                us.setLast_name(rs.getString("last_name"));
                us.setCity(rs.getString("city"));
                us.setStreet(rs.getString("street"));
                us.setPincode(rs.getString("pincode"));    
                us.setEmail(rs.getString("email"));    
                us.setPassword(rs.getString("password"));
                us.setPhone(rs.getString("phone"));
                us.setProfile_image(rs.getString("profile_image"));
                us.setIsAdmin(rs.getBoolean("is_admin"));
                us.setIsSeller(rs.getBoolean("is_seller"));

                return us;
        }

}
