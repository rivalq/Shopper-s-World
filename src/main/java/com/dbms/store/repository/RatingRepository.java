package com.dbms.store.repository;

import com.dbms.store.Mapper.ClothRatingMapper;
import com.dbms.store.model.ClothRating;
import com.dbms.store.model.MarketPlace;
import com.dbms.store.model.Ratings;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RatingRepository {
    @Autowired
    private JdbcTemplate template;

    public void setRating(Ratings rt) {
        String sql = "INSERT INTO ratings(username,cloth_id,rating) VALUES (?,?,?) ON DUPLICATE KEY UPDATE rating = ?";

        template.update(sql, rt.getUsername(), rt.getCloth_id(), rt.getRating(), rt.getRating());
    }

    public ClothRating getRating(int cloth_id) {
        String sql = "SELECT rating,custom,cloth_id,admin_rating from marketplace where cloth_id = ?";
        return template.queryForObject(sql, new ClothRatingMapper(), cloth_id);
    }

    public List<ClothRating> getRatings() {
        return template.query("SELECT rating,custom,cloth_id,admin_rating FROM marketplace", new ClothRatingMapper());
    }

    public void updateRating(MarketPlace mp) {
        String sql = "UPDATE marketplace set custom = ?, admin_rating = ? where cloth_id = ?";
        template.update(sql, mp.isCustom(), mp.getAdmin_rating(), mp.getCloth_id());
    }
}
