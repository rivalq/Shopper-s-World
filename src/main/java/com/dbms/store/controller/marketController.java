package com.dbms.store.controller;

import com.dbms.store.model.ClothRating;
import com.dbms.store.model.MarketPlace;
import com.dbms.store.model.Order;
import com.dbms.store.model.Ratings;
import com.dbms.store.model.Stock;
import com.dbms.store.model.Wishlist;
import com.dbms.store.repository.MarketRepository;
import com.dbms.store.repository.OrderRepository;
import com.dbms.store.repository.RatingRepository;
import com.dbms.store.repository.WishListRepository;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class marketController extends BaseController {
    @Autowired
    private MarketRepository marketRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private WishListRepository wishListRepository;

    @GetMapping("/api/marketplace/clothes")
    @ResponseBody
    public List<MarketPlace> getMarketClothes(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<MarketPlace>();
        }
        return marketRepository.getMarketClothes();
    }

    @GetMapping("/api/marketplace/clothes/{cloth_id}")
    @ResponseBody
    public MarketPlace getMarketClothes(@PathVariable("cloth_id") int cloth_id, HttpSession session) {
        if (!isAuthenticated(session)) {
            return new MarketPlace();
        }
        return marketRepository.getMarketClothes(cloth_id);
    }

    @GetMapping("/api/marketplace/stock/{cloth_id}")
    @ResponseBody
    public List<Stock> getMarketStock(@PathVariable("cloth_id") int cloth_id, HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<Stock>();
        }
        return marketRepository.getStock(cloth_id);
    }

    @GetMapping("/api/marketplace/stock/{cloth_id}/{size}")
    @ResponseBody
    public int getPrice(@PathVariable("cloth_id") int cloth_id, @PathVariable("size") String size, HttpSession session) {
        if (!isAuthenticated(session)) return -1;
        return marketRepository.getPrice(cloth_id, size);
    }

    @PutMapping("/api/marketplace/clothes/{cloth_id}")
    @ResponseBody
    public ResponseEntity<String> updateCloth(HttpSession session, @RequestBody MarketPlace mp) {
        ResponseEntity<String> err = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);
        if (checkAdmin(session) == 0) return err;
        marketRepository.updateCloth(mp);
        return ok;
    }

    @GetMapping("/api/marketplace/orders")
    @ResponseBody
    public List<Order> getUserOrders(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<Order>();
        }
        return orderRepository.getOrder(authService.getCurrentUser(session));
    }

    @PutMapping("/api/marketplace/sendrating")
    @ResponseBody
    public ResponseEntity<String> updateRating(HttpSession session, @RequestBody Ratings rt) {
        ResponseEntity<String> err = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);
        if (!isAuthenticated(session)) {
            return err;
        }
        rt.setUsername(authService.getCurrentUser(session));
        ratingRepository.setRating(rt);
        return ok;
    }

    @GetMapping(value = "/api/marketplace/wishlist")
    @ResponseBody
    public List<Integer> getWishlist(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<>();
        }
        return wishListRepository.getWishList(authService.getCurrentUser(session));
    }

    @GetMapping("/api/marketplace/ratings/{cloth_id}")
    @ResponseBody
    public float getRatingCloth(@PathVariable("cloth_id") int cloth_id) {
        ClothRating rt = ratingRepository.getRating(cloth_id);

        if (rt.isCustom() == true) return rt.getAdmin_rating();
        return rt.getRating();
    }

    @DeleteMapping("/api/marketplace/wishlist/{cloth_id}")
    @ResponseBody
    public ResponseEntity<String> removeWish(HttpSession session, @PathVariable("cloth_id") int cloth_id) {
        ResponseEntity<String> err = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);
        if (!isAuthenticated(session)) {
            return err;
        }
        Wishlist ws = new Wishlist();
        ws.setCloth_id(cloth_id);
        ws.setUsername(authService.getCurrentUser(session));
        wishListRepository.deleteWishList(ws);
        return ok;
    }
}
