package com.dbms.store.Mapper;

import com.dbms.store.model.Features;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class FeatureMapper implements RowMapper<Features> {

    public Features mapRow(ResultSet rs, int rownum) throws SQLException {
        Features fr = new Features();
        fr.setCloth_id(rs.getInt("cloth_id"));
        fr.setFeature_name(rs.getString("feature_name"));
        fr.setValue(rs.getString("value"));
        return fr;
    }
}
