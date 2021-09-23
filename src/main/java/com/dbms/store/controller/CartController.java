package com.dbms.store.controller;


import com.dbms.store.model.*;
import com.dbms.store.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;

@Controller
public class CartController extends BaseController {
    


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
    public void getCart(@PathVariable("username") String username, HttpSession session){
        if(!isAuthenticated(session)){
            return ;
        }else{
            
        }
    } 
}
