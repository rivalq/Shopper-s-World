package com.dbms.store.Mapper;

import com.dbms.store.model.Stock;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class StockMapper implements RowMapper<Stock> {

    public Stock mapRow(ResultSet rs, int rownum) throws SQLException {
        Stock st = new Stock();
        st.setCloth_id(rs.getInt("cloth_id"));
        st.setPrice(rs.getInt("price"));
        st.setQuantity(rs.getInt("quantity"));
        st.setSize(rs.getString("size"));
        return st;
    }
}
