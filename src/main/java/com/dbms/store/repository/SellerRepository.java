package com.dbms.store.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.dbms.store.model.Cloth;

import java.sql.ResultSet;

import java.sql.SQLException;

@Repository
public class SellerRepository {
    
        @Autowired
        private JdbcTemplate template;


        public int getLastid(){
            String sql = "SELECT cloth_id FROM seller_cloth ORDER BY cloth_id desc LIMIT 1";
            return template.queryForObject(sql, int.class);
        }

        public int addCloth(String name, 
                                String brand,String category,
                                String short_description,
                                String long_description,
                                String seller) {
            String sql = "INSERT INTO seller_cloth (name, brand, category, short_description,long_description,seller) VALUES (?, ?, ?, ?, ?, ?)";
            template.update(sql, name, brand, category, short_description, long_description,seller);
            return getLastid();
        }

        public void addImage(String url,int cloth_id){
            String sql = "INSERT INTO seller_cloth_images (cloth_id,url) VALUES (?,?)";
            template.update(sql, cloth_id, url); 
        }

        
        public Cloth getCloth(int cloth_id){
            String sql = "SELECT * FROM seller_cloth where cloth_id = ?";
             return template.queryForObject(sql, new BeanPropertyRowMapper<>(Cloth.class), new Object[]{cloth_id});   
        }

        public List<Integer> listCloth(String user){
            String sql = "SELECT cloth_id FROM seller_cloth where seller = ?";
            return template.query(sql,new RowMapper<Integer>(){
                public Integer mapRow(ResultSet rs, int rowNum) throws SQLException{

                        return rs.getObject("cloth_id",Integer.class);
                }
            },new Object [] {user}) ;
        }

        public List<String> getClothImages(int cloth_id){
            String sql = "SELECT url FROM seller_cloth_images where cloth_id = ?";
            return template.query(sql, new RowMapper<String>() {
                public String mapRow(ResultSet rs, int rowNum) 
                                                throws SQLException {
                        return rs.getString("url");
                }
           },new Object[]{cloth_id});
        }
        public void changeHeading(int cloth_id,String name, String category, String brand,String short_description, String long_description){
            String sql = "UPDATE seller_cloth SET name = ?, category = ?, brand = ?, short_description = ?, long_description = ? where cloth_id = ?";
            template.update(sql, name, category, brand, short_description, long_description,cloth_id);
        }

        public void deleteCloth(int cloth_id){
            // Pending;
        }

}
