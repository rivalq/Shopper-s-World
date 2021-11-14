package com.dbms.store.controller;

import com.dbms.store.model.User;
import com.dbms.store.service.AuthService;
import com.dbms.store.service.UserService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.WebAttributes;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Value("#{environment.api_root}")
    String context;

    @GetMapping("/login-success")
    public String loginSuccess(RedirectAttributes redirectAttributes) {
        redirectAttributes.addAttribute("message", "loggedin");
        return "redirect:/dashboard";
    }

    @GetMapping("/login")
    public String login(Model model, HttpServletRequest request, HttpSession st) {
        if (authService.isAuthenticated(st)) {
            return "redirect:/dashboard";
        }
        HttpSession session = request.getSession(false);
        String errorMessage = null;
        if (session != null) {
            AuthenticationException ex = (AuthenticationException) session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
            if (ex != null) {
                errorMessage = ex.getMessage();
            }
        }
        model.addAttribute("errorMessage", errorMessage);
        return "login";
    }

    @GetMapping("/register")
    public String register(HttpSession session) {
        if (authService.isAuthenticated(session)) {
            return "redirect:/";
        } else {
            return "register";
        }
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> submit_register(@RequestPart User user) {
        String error = "";
        User user_by_username = userService.findByUsername(user.getUsername());
        User user_by_email = userService.findByEmail(user.getEmail());
        User user_by_phone = userService.findByPhone(user.getPhone());
        if (user_by_username != null && user_by_username.getUsername() != null) {
            error = "This Username is used";
        } else if (user_by_email != null && user_by_email.getEmail() != null) {
            error = "This email address is already associated with another account";
        } else if (user_by_phone != null && user_by_phone.getPhone() != null) {
            error = "This Mobile Number is already associated with another account";
        } else {
            System.out.println(context);
            userService.register(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<String>(error, HttpStatus.NOT_ACCEPTABLE);
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
