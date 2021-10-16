package com.dbms.store.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.dbms.store.model.Order;

import org.springframework.jdbc.core.RowMapper;

public class OrderMapper implements RowMapper<Order>{
    
    public Order mapRow(ResultSet rs, int rownum) throws SQLException{
        Order ord = new Order();
        ord.setCloth_id(rs.getInt("cloth_id"));
        ord.setOrder_id(rs.getInt("order_id"));
        ord.setPrice(rs.getInt("price"));
        ord.setQuantity(rs.getInt("quantity"));
        ord.setSize(rs.getString("size"));
        ord.setUsername(rs.getString("username"));
        return ord;
    }
}
