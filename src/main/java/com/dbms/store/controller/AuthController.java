package com.dbms.store.controller;

import com.dbms.store.model.User;
import com.dbms.store.service.AuthService;
import com.dbms.store.service.ToastService;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private ToastService toastService;

    @GetMapping("/login")
    public String login(Model model, HttpSession session) {
        if (authService.isAuthenticated(session)) {
            return "redirect:/dashboard";
        }

        model.addAttribute("credentials", new User());
        return "dashboard/login";
    }

    @PostMapping("/login")
    public String postLogin(@ModelAttribute User credentials, Model model, HttpSession session, RedirectAttributes redirectAttributes) {
        if (authService.isAuthenticated(session)) {
            return "redirect:/dashboard";
        }
        String username = credentials.getUsername();
        String password = credentials.getPassword();

        String errorMessage = null;

        try {
            if (authService.checkCredentials(username, password)) {
                authService.loginUser(session, username);

                toastService.redirectWithSuccessToast(redirectAttributes, "Successfully logged in.");
                return "redirect:/dashboard";
            }
            errorMessage = "Incorrect password.";
        } catch (Exception e) {
            errorMessage = "No user with this username found.";
        }

        model.addAttribute("credentials", credentials);
        toastService.displayErrorToast(model, errorMessage);
        return "dashboard/login";
    }

    @GetMapping("/logout")
    public String logout(Model model, HttpSession session) {
        authService.logoutUser(session);
        return "redirect:/dashboard";
    }

    @GetMapping("/api/permission")
    @ResponseBody
    public String getPermissions(HttpSession session) {
        if (!authService.isAuthenticated(session)) {
            return "null";
        } else {
            return authService.getRole(session);
        }
    }
}
