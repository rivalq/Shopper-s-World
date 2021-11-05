package com.dbms.store.Mapper;

import com.dbms.store.model.Cloth;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class SellerClothMapper implements RowMapper<Cloth> {

    public Cloth mapRow(ResultSet rs, int rownum) throws SQLException {
        Cloth cl = new Cloth();
        cl.setName(rs.getString("name"));
        cl.setCloth_id(rs.getInt("cloth_id"));
        cl.setBrand(rs.getString("brand"));
        cl.setCategory(rs.getString("category"));
        cl.setLong_description(rs.getString("long_description"));
        cl.setShort_description(rs.getString("short_description"));
        cl.setSeller(rs.getString("seller"));
        cl.setGender(rs.getString("gender"));
        return cl;
    }
}
