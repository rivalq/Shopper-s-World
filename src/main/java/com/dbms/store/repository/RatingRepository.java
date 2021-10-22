package com.dbms.store.repository;

import com.dbms.store.Mapper.ClothRatingMapper;
import com.dbms.store.Mapper.RatingMapper;
import com.dbms.store.model.ClothRating;
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
        String sql = "SELECT * from cloth_ratings where cloth_id = ?";
        return template.queryForObject(sql, new ClothRatingMapper(), cloth_id);
    }

    public List<ClothRating> getRatings() {
        return template.query("SELECT * FROM cloth_ratings", new ClothRatingMapper());
    }
}
