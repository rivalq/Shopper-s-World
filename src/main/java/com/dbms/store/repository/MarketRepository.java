package com.dbms.store.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

import javax.print.DocFlavor.STRING;

import com.dbms.store.model.*;

import java.sql.ResultSet;

import java.sql.SQLException;


@Repository
public class MarketRepository {
    
    @Autowired
    private JdbcTemplate template;


    public void addCloth(Cloth cloth,int request_id){
        String sql = "INSERT INTO marketplace (cloth_id,name, brand, category, short_description,long_description,seller) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE cloth_id = cloth_id;";
        template.update(sql,cloth.getId(),
                            cloth.getName(),
                            cloth.getBrand(),
                            cloth.getCategory(),
                            cloth.getShort_description(),
                            cloth.getLong_description(),
                            cloth.getSeller());    
    }


    public void updateStock(Request request){
        String sql = "INSERT INTO stock (cloth_id,price,size,quantity) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + ?, price = ?";
        template.update(sql, request.getCloth_id(),request.getPrice(),request.getSize(),request.getQuantity(),request.getQuantity(),request.getPrice());
    }

    public void addImage(int cloth_id,String url){
        String sql = "INSERT INTO images (cloth_id,url) VALUES (?,?)";
        template.update(sql,cloth_id,url); 
    }    

}