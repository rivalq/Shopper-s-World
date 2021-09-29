package com.dbms.store.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.RowMapper;

import com.dbms.store.model.Request;


@Repository
public class RequestRepository {
    

        @Autowired
        private JdbcTemplate template;

        public void sendRequest(int cloth_id, String seller, String size, int quantity,int price){
                String sql = "INSERT into requests (cloth_id,seller,quantity,price,size,request_status) VALUES(?,?,?,?,?,0)";
                template.update(sql, cloth_id,seller,quantity,price,size);
        }
        public List<Request> getRequests(){
                String sql = "SELECT * FROM requests";
                return template.query(sql, new RowMapper<Request>() {
                        public Request mapRow(ResultSet rs, int rowNum) 
                                                        throws SQLException {
                                Request request = new Request();
                                request.setCloth_id(rs.getInt("cloth_id")); 
                                request.setRequest_id(rs.getInt("request_id"));   
                                request.setQuantity(rs.getInt("quantity"));
                                request.setPrice(rs.getInt("price")); 
                                request.setStatus(rs.getBoolean("request_status"));
                                request.setSeller(rs.getString("seller"));
                                request.setSize(rs.getString("size"));
                                try{
                                        request.setResult(rs.getBoolean("request_result"));
                                }catch(Exception e){
                                        request.setResult(false);
                                }                       
                                
                                try{
                                        request.setMp_cloth(rs.getInt("mp_cloth"));
                                }catch(Exception e){

                                }

                                return request;
                        }
                },new Object[]{});    
        }
        
        public void acceptRequest(int request_id,int cloth_id){
                String sql = "UPDATE requests SET request_status = 1, request_result = 1, mp_cloth = ? where request_id = ?";
                template.update(sql,cloth_id,request_id);
        }

        public void rejectRequest(int request_id){
                String sql = "UPDATE requests SET request_status = 1, request_result = 0 where request_id = ?";
                template.update(sql,request_id);
        }

        public List<Request> getRequestsBySeller(String seller){
                String sql = "SELECT * FROM requests where seller = ?";
                return template.query(sql, new RowMapper<Request>() {
                        public Request mapRow(ResultSet rs, int rowNum) 
                                                        throws SQLException {
                                Request request = new Request();
                                request.setCloth_id(rs.getInt("cloth_id")); 
                                request.setRequest_id(rs.getInt("request_id"));   
                                request.setQuantity(rs.getInt("quantity"));
                                request.setPrice(rs.getInt("price")); 
                                request.setStatus(rs.getBoolean("request_status"));
                                request.setSeller(rs.getString("seller"));
                                request.setSize(rs.getString("size"));
                                try{
                                        request.setResult(rs.getBoolean("request_result"));
                                }catch(Exception e){
                                        request.setResult(false);
                                }                       
                                
                                try{
                                        request.setMp_cloth(rs.getInt("mp_cloth"));
                                }catch(Exception e){

                                }

                                return request;
                        }
                },new Object[]{seller});    
        }
        

}
