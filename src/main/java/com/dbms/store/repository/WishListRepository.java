package com.dbms.store.repository;

import com.dbms.store.model.Wishlist;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class WishListRepository {
    @Autowired
    private JdbcTemplate template;

    public void setWishList(Wishlist ws) {
        String sql = "INSERT INTO wishlist(username,cloth_id) VALUES(?,?)";
        template.update(sql, ws.getUsername(), ws.getCloth_id());
    }

    public void deleteWishList(Wishlist ws) {
        String sql = "DELETE FROM wishlist where username = ? and cloth_id = ?";
        template.update(sql, ws.getUsername(), ws.getCloth_id());
    }

    public List<Integer> getWishList(String username) {
        String sql = "SELECT cloth_id from wishlist where username = ?";
        return template.queryForList(sql, Integer.class, username);
    }

    public Integer checkWish(int cloth_id, String user) {
        return template.queryForObject("SELECT COUNT(*) from wishlist where username = ? and cloth_id = ?", Integer.class, new Object[] { user, cloth_id });
    }

    public int count(int cloth_id) {
        String sql = "SELECT COUNT(*) from wishlist where cloth_id = ?";
        return template.queryForObject(sql, int.class, cloth_id);
    }
}
