package com.dbms.store.Mapper;

import com.dbms.store.model.Images;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class ImagesMapper implements RowMapper<Images> {

    public Images mapRow(ResultSet rs, int row_num) throws SQLException {
        Images img = new Images();
        img.setCloth_id(rs.getInt("cloth_id"));
        img.setUrl(rs.getString("url"));
        return img;
    }
}
