package com.dbms.store.repository;

import com.dbms.store.Mapper.RequestMapper;
import com.dbms.store.model.Request;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class RequestRepository {
    @Autowired
    private JdbcTemplate template;

    public int sendRequest(Request request) {
        String sql = "INSERT into requests (cloth_id,seller,quantity,price,size,request_status) VALUES(?,?,?,?,?,0)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        template.update(
            connection -> {
                java.sql.PreparedStatement ps = connection.prepareStatement(sql, new String[] { "ID" });
                ps.setInt(1, request.getCloth_id());
                ps.setString(2, request.getSeller());
                ps.setInt(3, request.getQuantity());
                ps.setInt(4, request.getPrice());
                ps.setString(5, request.getSize());
                return ps;
            },
            keyHolder
        );
        return keyHolder.getKey().intValue();
    }

    public List<Request> getRequests() {
        String sql = "SELECT * FROM requests";
        return template.query(sql, new RequestMapper());
    }

    public void acceptRequest(int request_id, int cloth_id) {
        String sql = "UPDATE requests SET request_status = 1, request_result = 1, mp_cloth = ? where request_id = ?";
        template.update(sql, cloth_id, request_id);
    }

    public void rejectRequest(int request_id) {
        String sql = "UPDATE requests SET request_status = 1, request_result = 0 where request_id = ?";
        template.update(sql, request_id);
    }

    public List<Request> getRequestsBySeller(String seller) {
        String sql = "SELECT * FROM requests where seller = ?";
        return template.query(sql, new RequestMapper(), new Object[] { seller });
    }

    public int exists(int cloth_id) {
        String sql = "SELECT MAX(mp_cloth) from requests where cloth_id = ? and request_status = 1 and request_result = 1";
        List<Integer> ls = template.query(
            sql,
            new RowMapper<Integer>() {

                public Integer mapRow(ResultSet rs, int rownum) throws SQLException {
                    return rs.getInt(1);
                }
            },
            cloth_id
        );
        if (ls.size() == 0) {
            return 0;
        } else {
            return ls.get(0);
        }
    }
}
