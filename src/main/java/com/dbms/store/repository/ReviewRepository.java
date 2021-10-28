package com.dbms.store.repository;

import com.dbms.store.Mapper.ReviewsMapper;
import com.dbms.store.model.Reviews;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewRepository {
    @Autowired
    private JdbcTemplate template;

    public List<Reviews> getClothReviews(int cloth_id) {
        String sql = "SELECT * from reviews where cloth_id = ? and hide = 0";
        return template.query(sql, new ReviewsMapper(), cloth_id);
    }

    public List<Reviews> getUserReviews(String username) {
        String sql = "SELECT * from reviews where username = ? and hide = 0";
        return template.query(sql, new ReviewsMapper(), username);
    }

    public List<Reviews> getReviews() {
        String sql = "SELECT * from reviews";
        return template.query(sql, new ReviewsMapper());
    }

    public void addReview(Reviews r) {
        String sql = "INSERT INTO reviews(username,cloth_id,head,body,hide,time) VALUES(?,?,?,?,?,?) ON DUPLICATE KEY UPDATE head = ?, body = ?, hide = ?";
        template.update(sql, r.getUsername(), r.getCloth_id(), r.getHead(), r.getBody(), r.isHide(), r.getTime(), r.getHead(), r.getBody(), r.isHide());
    }

    public void removeReview(String username, int cloth_id) {
        String sql = "DELETE FROM reviews where username = ? and cloth_id = ?";
        template.update(sql, username, cloth_id);
    }
}
