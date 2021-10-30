package com.dbms.store.repository;

import com.dbms.store.Mapper.RequestMapper;
import com.dbms.store.model.Request;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RequestRepository {
    @Autowired
    private JdbcTemplate template;

    public void sendRequest(int cloth_id, String seller, String size, int quantity, int price) {
        String sql = "INSERT into requests (cloth_id,seller,quantity,price,size,request_status) VALUES(?,?,?,?,?,0)";
        template.update(sql, cloth_id, seller, quantity, price, size);
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
        String sql = "SELECT MAX(mp_cloth) where cloth_id = ? and status = 1 and result = 1";
        return template.queryForObject(sql, int.class, cloth_id);
    }
}
