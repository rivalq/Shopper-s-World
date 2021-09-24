package com.dbms.store.repository;

import com.dbms.store.model.Cart;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CartRepository {
    
        @Autowired
        private JdbcTemplate template;

        

        public List<Cart> getUserCart(String username){
                String sql = "SELECT cart.cloth_id,cart.quantity,stock.price,cart.username,cart.size " +  
                             "FROM cart " +
                             "INNER JOIN stock " + 
                             "on  cart.cloth_id = stock.cloth_id and stock.size = cart.size " +
                             "where cart.username = ?";
                List<Cart> cart = template.query(sql,new BeanPropertyRowMapper<>(Cart.class),new Object[]{username});
                return cart;
        }
}
