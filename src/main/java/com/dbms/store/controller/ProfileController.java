package com.dbms.store.controller;



import javax.servlet.http.HttpSession;

import com.dbms.store.model.User;
import com.dbms.store.repository.UserRepository;
import com.dbms.store.service.AuthService;
import com.dbms.store.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class ProfileController extends BaseController{
    
    @Autowired
    UserRepository users;

    @Autowired
    AuthService authService;

    @Autowired
    UserService userService;

    @GetMapping("/profile/{username}")
    public String UserProfile(@PathVariable("username") String username,Model model, HttpSession session){
            if(!isAuthenticated(session)){
                return "redirect:/login";
            }
            User uDetails = users.getUser(username);
            
            model.addAttribute("uDetails", uDetails);
            return "profile";
    }
    @GetMapping("/profile")
    public String AllUsers(Model model, HttpSession session){
        if(!isAuthenticated(session)){
            return "redirect:/login";
        }
        String username = authService.getCurrentUser(session);
        return "redirect:/profile/" + username;
    } 

}
