package com.dbms.store.controller;

import com.dbms.store.model.Cart;
import com.dbms.store.repository.CartRepository;
import com.dbms.store.repository.OrderRepository;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CartController extends BaseController {
    @Autowired
    CartRepository cartRepository;

    @Autowired
    OrderRepository orderRepository;

    @GetMapping("/api/cart")
    @ResponseBody
    public List<Cart> getCart(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<Cart>();
        } else {
            String username = authService.getCurrentUser(session);
            List<Cart> cart = cartRepository.getUserCart(username);
            return cart;
        }
    }

    @PostMapping("/api/marketplace/cart/{cloth_id}")
    @ResponseBody
    public ResponseEntity<String> updateCart(HttpSession session, @PathVariable("cloth_id") int cloth_id, @RequestParam("quantity") int quantity, @RequestParam("size") String size) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            Cart cart = new Cart();
            cart.setCloth_id(cloth_id);
            cart.setQuantity(quantity);
            cart.setSize(size);
            cart.setUsername(authService.getCurrentUser(session));
            cartRepository.updateCart(cart);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @DeleteMapping("/api/marketplace/cart/{cloth_id}")
    @ResponseBody
    public ResponseEntity<String> removeCart(HttpSession session, @PathVariable("cloth_id") int cloth_id, @RequestBody Cart cart) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            cart.setUsername(authService.getCurrentUser(session));
            cartRepository.removeCart(cart);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PostMapping("/api/marketplace/checkout")
    @ResponseBody
    public ResponseEntity<String> completeOrder(HttpSession session) {
        ResponseEntity<String> err = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);
        if (!isAuthenticated(session)) {
            return err;
        }
        String username = authService.getCurrentUser(session);

        try {
            if (cartRepository.validCart(username) == true) {
                return ok;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return err;
    }
}
