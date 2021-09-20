package com.dbms.store.controller;


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dbms.store.model.User;
import com.dbms.store.model.UserDetails;
import com.dbms.store.repository.UserRepository;
import com.dbms.store.service.AuthService;
import com.dbms.store.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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
            UserDetails uDetails = users.getUserDetails(username);
            model.addAttribute("uDetails", uDetails);
            return "profile";
    }
    @GetMapping("/profile")
    public String AllUsers(Model model, HttpSession session){
        if(!isAuthenticated(session)){
            return "redirect:/login";
        }
        String username = authService.getCurrentUser(session);
        if(userService.getRole(username) == "admin"){
            return "redirect:/profile/rivalq";
        }else{
            return "redirect:/profile/username";
        }
    }
    @PostMapping("/profile/{username}/details")    
    @ResponseBody
    public void check(@RequestBody UserDetails userDetails,HttpServletRequest request, HttpServletResponse response, Model model) {
                String first_name = userDetails.getFirst_name();
                String last_name = userDetails.getLast_name();
                String email = userDetails.getEmail();
                String phone = userDetails.getPhone();
                String street = userDetails.getStreet();
                String city = userDetails.getCity();
                Integer pincode = userDetails.getPincode();

                // change the database of non - null values       
    }    

}
