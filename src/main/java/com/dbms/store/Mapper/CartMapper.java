package com.dbms.store.Mapper;

import java.sql.ResultSet;

import com.dbms.store.model.Cart;

import org.springframework.jdbc.core.RowMapper;

public class CartMapper implements RowMapper<Cart> {
    
        public Cart mapRow(ResultSet rs,int rownum){

                Cart ct = new Cart();
                
                return ct;

        }

}
