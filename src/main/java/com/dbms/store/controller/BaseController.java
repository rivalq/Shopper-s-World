package com.dbms.store.controller;


import com.dbms.store.service.UserService;
import com.dbms.store.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;

import javax.servlet.http.HttpSession;


abstract class BaseController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    public Boolean isAuthenticated(HttpSession session) {
        return authService.isAuthenticated(session);
    }

    public void addDefaultAttributes(Model model, HttpSession session) {
        String currentUser = authService.getCurrentUser(session);
        if (currentUser != null) {
            model.addAttribute("username", currentUser);

        }
    }
}