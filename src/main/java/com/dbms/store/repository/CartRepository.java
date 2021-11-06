package com.dbms.store.repository;

import com.dbms.store.Mapper.CartMapper;
import com.dbms.store.model.Cart;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.stereotype.Repository;

@Repository
public class CartRepository {
    @Autowired
    private JdbcTemplate template;

    public List<Cart> getUserCart(String username) {
        String sql = "Select * from cart where username = ?";
        List<Cart> cart = template.query(sql, new CartMapper(), new Object[] { username });
        return cart;
    }

    public Boolean validCart(String username) throws SQLException {
        Connection conn = DataSourceUtils.getConnection(template.getDataSource());
        try {
            conn.setAutoCommit(false);
            PreparedStatement ps = conn.prepareStatement("SELECT credits from user where username = ?");
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            rs.next();
            int credits = rs.getInt(1);
            ps = conn.prepareStatement("SELECT cart.quantity*stock.price from cart,stock where cart.username = ? and stock.cloth_id = cart.cloth_id and stock.size = cart.size");
            ps.setString(1, username);
            rs = ps.executeQuery();
            rs.next();
            int cost = rs.getInt(1);
            Boolean flag = false;
            if (credits >= cost) {
                String sql = "SELECT COUNT(*) from cart,stock where cart.username = ? and cart.size = stock.size and cart.cloth_id = stock.cloth_id and cart.quantity > stock.quantity";
                ps = conn.prepareStatement(sql);
                ps.setString(1, username);
                rs = ps.executeQuery();
                rs.next();
                int bad = rs.getInt(1);
                sql = "SELECT COUNT(*) FROM cart WHERE username = ? and  (cloth_id,size) NOT IN (SELECT cloth_id,size from stock)";
                ps = conn.prepareStatement(sql);
                ps.setString(1, username);
                rs = ps.executeQuery();
                rs.next();
                bad += rs.getInt(1);
                if (bad == 0) {
                    // everything is fine'
                    sql = "UPDATE cart INNER JOIN stock on cart.cloth_id = stock.cloth_id and stock.size = cart.size SET stock.quantity = stock.quantity - cart.quantity where cart.username = ?";
                    ps = conn.prepareStatement(sql);
                    ps.setString(1, username);
                    ps.executeUpdate();
                    sql = "UPDATE user SET credits = credits - ? where username = ?";
                    ps = conn.prepareStatement(sql);
                    ps.setInt(1, cost);
                    ps.setString(2, username);
                    ps.executeUpdate();
                    sql = "INSERT INTO order_details(username,cloth_id,size,quantity,price) SELECT cart.username,cart.cloth_id,cart.size,cart.quantity,stock.price from cart,stock where cart.username = ? and cart.cloth_id = stock.cloth_id and cart.size = stock.size";
                    ps = conn.prepareStatement(sql);
                    ps.setString(1, username);
                    ps.executeUpdate();
                    sql = "DELETE FROM cart WHERE username = ?";
                    ps = conn.prepareStatement(sql);
                    ps.setString(1, username);
                    ps.executeUpdate();
                    flag = true;
                }
            }
            conn.commit();
            conn.setAutoCommit(true);
            return flag;
        } catch (SQLException e) {
            conn.rollback();
            e.printStackTrace();
        }
        return false;
    }

    public void empty(String username) {
        String sql = "DELETE FROM cart where username = ?";
        template.update(sql, username);
    }

    public void updateCart(Cart cart) {
        String sql = "INSERT INTO cart (username,cloth_id,quantity,size) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE quantity = ?";
        template.update(sql, cart.getUsername(), cart.getCloth_id(), cart.getQuantity(), cart.getSize(), cart.getQuantity());
    }

    public void removeCart(Cart cart) {
        String sql = "DELETE FROM cart where cloth_id = ? and size = ? and username = ?";
        template.update(sql, cart.getCloth_id(), cart.getSize(), cart.getUsername());
    }
}
