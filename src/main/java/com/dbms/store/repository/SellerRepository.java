package com.dbms.store.repository;

import com.dbms.store.Mapper.FeatureMapper;
import com.dbms.store.Mapper.ImagesMapper;
import com.dbms.store.Mapper.SellerClothMapper;
import com.dbms.store.model.Cloth;
import com.dbms.store.model.Features;
import com.dbms.store.model.Images;
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
public class SellerRepository {
    @Autowired
    private JdbcTemplate template;

    public int addCloth(Cloth cloth) {
        String sql = "INSERT INTO seller_cloth (name, brand, category, short_description,long_description,gender,seller) VALUES (?, ?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        template.update(
            connection -> {
                java.sql.PreparedStatement ps = connection.prepareStatement(sql, new String[] { "ID" });
                ps.setString(1, cloth.getName());
                ps.setString(2, cloth.getBrand());
                ps.setString(3, cloth.getCategory());
                ps.setString(4, cloth.getShort_description());
                ps.setString(5, cloth.getLong_description());
                ps.setString(6, cloth.getGender());
                ps.setString(7, cloth.getSeller());
                return ps;
            },
            keyHolder
        );
        return keyHolder.getKey().intValue();
    }

    public void updateCloth(Cloth mp) {
        String sql = "UPDATE seller_cloth set name = ?, brand = ?, category = ?, short_description = ?,long_description = ?, gender = ? where cloth_id = ?";
        template.update(sql, mp.getName(), mp.getBrand(), mp.getCategory(), mp.getShort_description(), mp.getLong_description(), mp.getGender(), mp.getCloth_id());
    }

    public void addImage(String url, int cloth_id) {
        String sql = "INSERT INTO seller_cloth_images (cloth_id,url) VALUES (?,?)";
        template.update(sql, cloth_id, url);
    }

    public Cloth getCloth(int cloth_id) {
        String sql = "SELECT * FROM seller_cloth where cloth_id = ?";
        return template.queryForObject(sql, new SellerClothMapper(), new Object[] { cloth_id });
    }

    public List<Cloth> listCloth(String user) {
        String sql = "SELECT * FROM seller_cloth where seller = ?";
        return template.query(sql, new SellerClothMapper(), user);
    }

    public List<String> getClothImages(int cloth_id) {
        String sql = "SELECT url FROM seller_cloth_images where cloth_id = ?";
        return template.query(
            sql,
            new RowMapper<String>() {

                public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                    return rs.getString("url");
                }
            },
            new Object[] { cloth_id }
        );
    }

    public void addFeature(Features feature) {
        String sql = "INSERT into seller_cloth_features(cloth_id,feature_name,value) VALUES(?,?,?)";
        template.update(sql, feature.getCloth_id(), feature.getFeature_name(), feature.getValue());
    }

    public List<Features> getFeatures(int cloth_id) {
        String sql = "SELECT * from seller_cloth_features where cloth_id = ?";
        return template.query(sql, new FeatureMapper(), cloth_id);
    }

    public void clearFeatures(int cloth_id) {
        template.update("DELETE FROM seller_cloth_features where cloth_id = ?", cloth_id);
    }

    public void clearImages(int cloth_id) {
        template.update("DELETE FROM seller_cloth_images where cloth_id = ?", cloth_id);
    }

    public List<Images> getClothImages() {
        return template.query("SELECT * FROM seller_cloth_images", new ImagesMapper());
    }

    public List<Cloth> getSellerClothes() {
        return template.query("SELECT * FROM seller_cloth", new SellerClothMapper());
    }

    public void deleteCloth(int cloth_id) {
        template.update("DELETE FROM seller_cloth where cloth_id = ?", cloth_id);
    }
}
