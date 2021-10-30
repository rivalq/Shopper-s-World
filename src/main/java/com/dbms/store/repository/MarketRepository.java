package com.dbms.store.repository;

import com.dbms.store.Mapper.ImagesMapper;
import com.dbms.store.Mapper.MarketPlaceMapper;
import com.dbms.store.Mapper.StockMapper;
import com.dbms.store.model.Cloth;
import com.dbms.store.model.Images;
import com.dbms.store.model.MarketPlace;
import com.dbms.store.model.Request;
import com.dbms.store.model.Stock;
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
public class MarketRepository {
    @Autowired
    private JdbcTemplate template;

    public int addCloth(Cloth cloth) {
        String sql = "INSERT INTO marketplace (name, brand, category, short_description,long_description,seller) VALUES (?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        template.update(connection -> {
            java.sql.PreparedStatement ps = connection.prepareStatement(sql, new String[] { "ID" });
            ps.setString(1, cloth.getName());
            ps.setString(2, cloth.getBrand());
            ps.setString(3, cloth.getCategory());
            ps.setString(4,cloth.getShort_description());
            ps.setString(5, cloth.getLong_description());
            ps.setString(6, cloth.getSeller());
            return ps;
            }, keyHolder);
        return keyHolder.getKey().intValue();
    }

    public List<MarketPlace> getMarketClothes() {
        String sql = "SELECT * FROM marketplace";
        return template.query(sql, new MarketPlaceMapper());
    }

    public MarketPlace getMarketClothes(int cloth_id) {
        String sql = "SELECT * FROM marketplace where cloth_id = ?";
        return template.query(sql, new MarketPlaceMapper(), new Object[] { cloth_id }).get(0);
    }

    public List<Stock> getStock(int cloth_id) {
        String sql = "SELECT * FROM stock where cloth_id = ?";
        return template.query(sql, new StockMapper(), new Object[] { cloth_id });
    }

    public int getPrice(int cloth_id, String size) {
        String sql = "SELECT price from stock where cloth_id = ? and size = ?";
        return template
            .query(
                sql,
                new RowMapper<Integer>() {

                    public Integer mapRow(ResultSet rs, int rownum) throws SQLException {
                        return rs.getInt("price");
                    }
                },
                new Object[] { cloth_id, size }
            )
            .get(0);
    }

    public void updateCloth(MarketPlace mp) {
        String sql = "UPDATE marketplace set name = ?, brand = ?, category = ?, short_description = ?,long_description = ? where cloth_id = ?";
        template.update(sql, mp.getName(), mp.getBrand(), mp.getCategory(), mp.getShort_description(), mp.getLong_description(), mp.getCloth_id());
    }

    public void updateStock(Request request) {
        String sql = "INSERT INTO stock (cloth_id,price,size,quantity) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + ?, price = ?";
        template.update(sql, request.getCloth_id(), request.getPrice(), request.getSize(), request.getQuantity(), request.getQuantity(), request.getPrice());
    }

    public void updateStock(Stock stk) {
        String sql = "INSERT INTO stock (cloth_id,price,size,quantity) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE quantity = ?, price = ?";
        template.update(sql, stk.getCloth_id(), stk.getPrice(), stk.getSize(), stk.getQuantity(), stk.getQuantity(), stk.getPrice());
    }

    public void addImage(int cloth_id, String url) {
        String sql = "INSERT INTO images (cloth_id,url) VALUES (?,?)";
        template.update(sql, cloth_id, url);
    }

    public List<Images> getImages() {
        return template.query("SELECT * FROM images", new ImagesMapper());
    }
}
