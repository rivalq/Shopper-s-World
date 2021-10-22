package com.dbms.store.Mapper;

import com.dbms.store.model.ClothRating;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class ClothRatingMapper implements RowMapper<ClothRating> {

    public ClothRating mapRow(ResultSet rs, int rownum) throws SQLException {
        ClothRating cr = new ClothRating();
        cr.setCloth_id(rs.getInt("cloth_id"));
        cr.setRating(rs.getFloat("rating"));
        cr.setAdmin_rating(rs.getFloat("admin_rating"));
        cr.setCustom(rs.getBoolean("custom"));
        return cr;
    }
}
