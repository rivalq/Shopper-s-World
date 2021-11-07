package com.dbms.store.controller;

import com.dbms.store.model.User;
import com.dbms.store.repository.UserRepository;
import com.dbms.store.service.AuthService;
import com.dbms.store.service.UserService;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ProfileController extends BaseController {
    @Autowired
    UserRepository users;

    @Autowired
    AuthService authService;

    @Autowired
    UserService userService;

    @GetMapping("/profile")
    public String AllUsers(Model model, HttpSession session) {
        String username = authService.getCurrentUser(session);
        return "redirect:/profile/" + username;
    }

    // api endpoints
    @PreAuthorize("permitAll()")
    @GetMapping("/api/user")
    @ResponseBody
    public User getCurrentUser(HttpSession session) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return userService.findByUsername(username);
        }
        return new User();
    }
}
