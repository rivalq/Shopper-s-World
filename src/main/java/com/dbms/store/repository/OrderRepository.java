package com.dbms.store.repository;

import com.dbms.store.Mapper.OrderMapper;
import com.dbms.store.model.Order;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OrderRepository {
    @Autowired
    private JdbcTemplate template;

    public void newOrder(Order ord) {
        String sql = "INSERT INTO order_details(cloth_id,username,size,quantity,price) VALUES (?,?,?,?,?)";
        template.update(sql, ord.getCloth_id(), ord.getUsername(), ord.getSize(), ord.getQuantity(), ord.getPrice());
    }

    public List<Order> getOrder(String username) {
        String sql = "SELECT * from order_details where username = ?";
        return template.query(sql, new OrderMapper(), new Object[] { username });
    }
    public List<Order> getOrders() {
        String sql = "SELECT * from order_details";
        return template.query(sql, new OrderMapper());
    }
}
