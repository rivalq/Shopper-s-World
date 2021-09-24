package com.dbms.store.controller;

import java.util.List;
import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import com.dbms.store.repository.CartRepository;
import com.dbms.store.model.Cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CartController extends BaseController {
    
    @Autowired
    CartRepository cartRepository;

    @GetMapping("/dashboard/cart")
    public String userCartRedirect(HttpSession session, Model model){
        if(!isAuthenticated(session)){
            return "redirect:/login";
        }
        String username = authService.getCurrentUser(session);
        String url = "redirect:/dashboard/cart/" + username;
        return url;
    }

    @GetMapping("/dashboard/cart/{username}")
    public String userCart(@PathVariable("username") String username,HttpSession session, Model model){
        if(!isAuthenticated(session)){
            return "redirect:/login";
        }
        return "/dashboard/Cart";
    }

    @GetMapping("/api/cart/{username}")
    @ResponseBody
    public List<Cart> getCart(@PathVariable("username") String username, HttpSession session){
        if(!isAuthenticated(session)){
            return new ArrayList<Cart>();
        }else{
              List<Cart> cart = cartRepository.getUserCart(username);
              return cart;  
        }
    } 
}
