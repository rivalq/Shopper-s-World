package com.dbms.store.Mapper;

import com.dbms.store.model.MarketPlace;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class MarketPlaceMapper implements RowMapper<MarketPlace> {

    public MarketPlace mapRow(ResultSet rs, int rownum) throws SQLException {
        MarketPlace mp = new MarketPlace();
        mp.setName(rs.getString("name"));
        mp.setCloth_id(rs.getInt("cloth_id"));
        mp.setBrand(rs.getString("brand"));
        mp.setCategory(rs.getString("category"));
        mp.setLong_description(rs.getString("long_description"));
        mp.setShort_description(rs.getString("short_description"));
        mp.setSeller(rs.getString("seller"));
        mp.setAdmin_rating(rs.getFloat("admin_rating"));
        mp.setRating(rs.getFloat("rating"));
        mp.setCustom(rs.getBoolean("custom"));
        return mp;
    }
}
