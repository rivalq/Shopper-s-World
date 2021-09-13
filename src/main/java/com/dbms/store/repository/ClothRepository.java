package com.dbms.store.repository;


import java.util.ArrayList;
import java.util.List;

import com.dbms.store.model.Cloth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ClothRepository {
    
    @Autowired
    private JdbcTemplate template;

    public void createCloth(String name, 
                                String type,String category,
                                String short_description,
                                String long_description) {
        String sql = "INSERT INTO cloth (name, type, category, short_descritption,long_description) VALUES (?, ?, ?, ?, ?)";
        template.update(sql, name, type, category,short_description,long_description);
    }
    public Cloth getCloth(int id){
            Cloth cloth = new Cloth();
            try{
                String sql = "SELECT * FROM cloth WHERE id = ?";
                cloth = template.queryForObject(sql, new BeanPropertyRowMapper<>(Cloth.class),new Object[] {id});
            }catch(Exception e){
                    e.printStackTrace();
                    System.out.println(e);
            }
            return cloth;
    }
    public List<String> getImages(int id){
        List<String> urls = new ArrayList<String>();
        String sql = "SELECT url FROM images where id = %s";
        sql = String.format(sql,id);
        try{
            urls = template.queryForList(sql,String.class);   
        }catch(Exception e){
            e.printStackTrace();
            System.out.println(e);
            urls.add("NULL");
        }
        return urls;
    }
    public List<Cloth> getAllClothes(){
        List<Cloth> clothes = new ArrayList<Cloth>();
        String sql = "SELECT * FROM cloth";
        try{
            clothes = template.query(sql,new BeanPropertyRowMapper<>(Cloth.class));
        }catch(Exception e){
            e.printStackTrace();
            System.out.println(e);
        }
        return clothes;
    }

    public String getProfileImage(int id){
        String sql = "SELECT url FROM images where id = %s LIMIT 1";
        sql = String.format(sql,id);
        return template.queryForObject(sql, String.class);
    }
}
