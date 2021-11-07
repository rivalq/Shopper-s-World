package com.dbms.store.controller;

import com.dbms.store.service.AuthService;
import com.dbms.store.service.UserService;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;

abstract class BaseController {
    @Autowired
    public AuthService authService;

    @Autowired
    public UserService userService;

    public Boolean isAuthenticated(HttpSession session) {
        return authService.isAuthenticated(session);
    }

    public void addDefaultAttributes(Model model, HttpSession session) {
        String currentUser = authService.getCurrentUser(session);
        if (currentUser != null) {
            model.addAttribute("username", currentUser);
        }
    }

    public int SellerAuthentication(HttpSession session) {
        if (!isAuthenticated(session)) {
            return 0;
        }
        if (authService.getRole(session) == "user") {
            // Error
            return -1;
        }
        return 1;
    }

    public int checkAdmin(HttpSession session) {
        if (!isAuthenticated(session) || authService.getRole(session) != "admin") return 0;
        return 1;
    }
}
