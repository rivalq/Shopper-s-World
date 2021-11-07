package com.dbms.store.controller;

import com.dbms.store.model.ClothRating;
import com.dbms.store.model.Features;
import com.dbms.store.model.Images;
import com.dbms.store.model.MarketPlace;
import com.dbms.store.model.Order;
import com.dbms.store.model.Ratings;
import com.dbms.store.model.Reviews;
import com.dbms.store.model.Stock;
import com.dbms.store.model.Wishlist;
import com.dbms.store.repository.MarketRepository;
import com.dbms.store.repository.OrderRepository;
import com.dbms.store.repository.RatingRepository;
import com.dbms.store.repository.ReviewRepository;
import com.dbms.store.repository.WishListRepository;
import com.dbms.store.repository.variableRepository;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private variableRepository variableRepository;

    @PreAuthorize("permitAll()")
    @GetMapping("/api/marketplace/clothes")
    @ResponseBody
    public List<MarketPlace> getMarketClothes(HttpSession session) {
        String role = authService.getRole(session);
        if (role != "admin") {
            int autoHide = variableRepository.getVariable("Hide out of Stock");
            return marketRepository.getVisibleClothes(autoHide);
        } else {
            return marketRepository.getMarketClothes();
        }
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/api/marketplace/clothes/{cloth_id}")
    @ResponseBody
    public MarketPlace getMarketClothes(@PathVariable("cloth_id") int cloth_id, HttpSession session) {
        String role = authService.getRole(session);
        if (role != "admin") {
            int autoHide = variableRepository.getVariable("Hide out of Stock");
            return marketRepository.getVisibleCloth(cloth_id, autoHide);
        } else {
            return marketRepository.getMarketClothes(cloth_id);
        }
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/api/marketplace/images/{cloth_id}")
    @ResponseBody
    public List<Images> getImages(@PathVariable("cloth_id") int cloth_id) {
        return marketRepository.getImages(cloth_id);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/api/marketplace/stock")
    @ResponseBody
    public List<Stock> getStock(HttpSession session) {
        String role = authService.getRole(session);
        if (role != "admin") {
            return marketRepository.getStocks(0);
        } else {
            return marketRepository.getStocks(1);
        }
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/api/marketplace/stock/{cloth_id}")
    @ResponseBody
    public List<Stock> getMarketStock(@PathVariable("cloth_id") int cloth_id, HttpSession session) {
        return marketRepository.getStock(cloth_id);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/api/marketplace/stock/{cloth_id}/{size}")
    @ResponseBody
    public int getPrice(@PathVariable("cloth_id") int cloth_id, @PathVariable("size") String size, HttpSession session) {
        return marketRepository.getPrice(cloth_id, size);
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/api/marketplace/clothes/{cloth_id}")
    @ResponseBody
    public void updateCloth(HttpSession session, @RequestBody MarketPlace mp) {
        marketRepository.updateCloth(mp);
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

    @PostMapping("/api/marketplace/wishlist/{cloth_id}")
    @ResponseBody
    public ResponseEntity<String> addWish(HttpSession session, @PathVariable("cloth_id") int cloth_id) {
        ResponseEntity<String> err = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);
        if (!isAuthenticated(session)) {
            return err;
        }
        Wishlist ws = new Wishlist();
        ws.setCloth_id(cloth_id);
        ws.setUsername(authService.getCurrentUser(session));
        wishListRepository.setWishList(ws);
        return ok;
    }

    @GetMapping("/api/marketplace/wishlist/{cloth_id}")
    @ResponseBody
    public Integer checkWish(HttpSession session, @PathVariable("cloth_id") int cloth_id) {
        if (!isAuthenticated(session)) return 0;
        return wishListRepository.checkWish(cloth_id, authService.getCurrentUser(session));
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/api/marketplace/reviews/{cloth_id}")
    @ResponseBody
    public List<Reviews> getClothReviews(@PathVariable("cloth_id") int cloth_id) {
        return reviewRepository.getClothReviews(cloth_id);
    }

    @PostMapping("/api/marketplace/reviews")
    @ResponseBody
    public ResponseEntity<String> addReview(HttpSession session, @RequestBody Reviews r) {
        ResponseEntity<String> err = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);
        if (!isAuthenticated(session)) return err;
        r.setUsername(authService.getCurrentUser(session));
        reviewRepository.addReview(r);
        return ok;
    }

    @GetMapping("/api/marketplace/reviews")
    @ResponseBody
    public List<Reviews> getUserReviews(HttpSession session) {
        if (!isAuthenticated(session)) return new ArrayList<>();
        return reviewRepository.getUserReviews(authService.getCurrentUser(session));
    }

    @DeleteMapping("/api/marketplace/reviews")
    @ResponseBody
    public ResponseEntity<String> deleteReview(HttpSession session, @RequestBody Reviews r) {
        ResponseEntity<String> err = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);
        if (!isAuthenticated(session)) {
            return err;
        }
        if ((authService.getRole(session) == "admin") || (authService.getCurrentUser(session).equals(r.getUsername()) == true)) {
            reviewRepository.removeReview(r.getUsername(), r.getCloth_id());
            return ok;
        }
        return err;
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/api/marketplace/features/{cloth_id}")
    @ResponseBody
    public List<Features> getFeatures(@PathVariable("cloth_id") int cloth_id) {
        return marketRepository.getFeatures(cloth_id);
    }
}
