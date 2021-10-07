package com.dbms.store.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.dbms.store.model.Cart;

import org.springframework.jdbc.core.RowMapper;

public class CartMapper implements RowMapper<Cart> {
    
        public Cart mapRow(ResultSet rs,int rownum) throws SQLException  {

                Cart ct = new Cart();
                ct.setCloth_id(rs.getInt("cloth_id"));
                ct.setQuantity(rs.getInt("quantity"));
                ct.setSize(rs.getString("size"));
                ct.setUsername(rs.getString("username"));
                return ct;

        }

}
