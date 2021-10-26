package com.dbms.store.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.dbms.store.model.Reviews;

import org.springframework.jdbc.core.RowMapper;

public class ReviewsMapper implements RowMapper<Reviews>{
    
    public Reviews mapRow(ResultSet rs,int rownum) throws SQLException {
        Reviews r = new Reviews();
        r.setUsername(rs.getString("username"));
        r.setCloth_id(rs.getInt("cloth_id"));
        r.setHide(rs.getBoolean("hide"));
        r.setHead(rs.getString("head"));
        r.setBody(rs.getString("body"));
        r.setTime(rs.getDate("time"));
        return r;
    }

    
}
