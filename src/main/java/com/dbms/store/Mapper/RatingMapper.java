package com.dbms.store.Mapper;

import com.dbms.store.model.Ratings;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class RatingMapper implements RowMapper<Ratings> {

    public Ratings mapRow(ResultSet rs, int rownum) throws SQLException {
        Ratings rt = new Ratings();
        rt.setCloth_id(rs.getInt("cloth_id"));
        rt.setRating(rs.getFloat("rating"));
        rt.setUsername(rs.getString("username"));
        return rt;
    }
}
