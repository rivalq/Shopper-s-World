package com.dbms.store.Mapper;

import com.dbms.store.model.Request;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class RequestMapper implements RowMapper<Request> {

    public Request mapRow(ResultSet rs, int rownum) throws SQLException {
        Request rq = new Request();
        rq.setCloth_id(rs.getInt("cloth_id"));
        rq.setRequest_id(rs.getInt("request_id"));
        rq.setSeller(rs.getString("seller"));
        rq.setPrice(rs.getInt("price"));
        try {
            rq.setMp_cloth(rs.getInt("mp_cloth"));
        } catch (Exception e) {}
        rq.setSize(rs.getString("size"));
        rq.setQuantity(rs.getInt("quantity"));
        rq.setStatus(rs.getBoolean("request_status"));
        rq.setResult(rs.getBoolean("request_result"));
        return rq;
    }
}
