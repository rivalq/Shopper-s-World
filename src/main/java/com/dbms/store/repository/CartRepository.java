package com.dbms.store.repository;

import com.dbms.store.Mapper.CartMapper;
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
                String sql = "Select * from cart where username = ?";
                List<Cart> cart = template.query(sql,new CartMapper(),new Object[]{username});
                return cart;
        }

        public boolean validCart(String username){
                
                String sql = "UPDATE stock s,cart c SET s.quantity = s.quantity - c.quantity WHERE c.username = ? and c.cloth_id = s.cloth_id and c.size = s.size and (Select COUNT(*) from cart,stock where cart.username = ? and cart.cloth_id = stock.cloth_id and cart.size = stock.size and cart.quantity > stock.quantity) = 0";
                return template.update(sql, username,username) > 0;
        }

        public void empty(String username){
                String sql = "DELETE FROM cart where username = ?";
                template.update(sql, username);
        }

        public void updateCart(Cart cart){
                String sql  = "INSERT INTO cart (username,cloth_id,quantity,size) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE quantity = ?";
                template.update(sql, cart.getUsername(),cart.getCloth_id(),cart.getQuantity(),cart.getSize(),cart.getQuantity());
        }
        public void removeCart(Cart cart){
                String sql  = "DELETE FROM cart where cloth_id = ? and size = ? and username = ?";
                template.update(sql, cart.getCloth_id(),cart.getSize(),cart.getUsername());
        }
        
        
}
