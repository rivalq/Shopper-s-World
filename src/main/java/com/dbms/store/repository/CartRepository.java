package com.dbms.store.repository;

import com.dbms.store.Mapper.CartMapper;
import com.dbms.store.model.Cart;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CartRepository {
    
        @Autowired
        private JdbcTemplate template;

                

        public List<Cart> getUserCart(String username){
                String sql = "Select * from cart where username = ?";
                List<Cart> cart = template.query(sql,new CartMapper(),new Object[]{username});
                return cart;
        }

        public void updateCart(Cart cart){
                String sql  = "INSERT INTO cart (username,cloth_id,quantity,size) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + ?";
                template.update(sql, cart.getUsername(),cart.getCloth_id(),cart.getQuantity(),cart.getSize(),cart.getQuantity());
        }
        
        
}
