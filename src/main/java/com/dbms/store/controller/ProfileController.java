package com.dbms.store.controller;

import com.dbms.store.model.User;
import com.dbms.store.repository.UserRepository;
import com.dbms.store.service.AuthService;
import com.dbms.store.service.UserService;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ProfileController extends BaseController {
    @Autowired
    UserRepository users;

    @Autowired
    AuthService authService;

    @Autowired
    UserService userService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/profile")
    public String AllUsers(Model model, HttpSession session) {
        String username = authService.getCurrentUser(session);
        return "redirect:/profile/" + username;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/profile/{username}")
    public String displayUser(Model model, @PathVariable("username") String username, HttpSession session) {
        String user = authService.getCurrentUser(session);
        if (user.equals(username) == true) {
            return "profile";
        } else if (authService.getRole(session) == "admin") {
            return "profile";
        } else {
            return "forbidden";
        }
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

    @GetMapping("/api/user/{username}")
    @ResponseBody
    public User getUser(HttpSession session, @PathVariable("username") String username) {
        User user_temp = users.getUser(username);
        user_temp.setPassword("You Can't See Me!");
        String user = authService.getCurrentUser(session);
        if (user.equals(username) == true) {
            return user_temp;
        } else if (authService.getRole(session) == "admin") {
            return user_temp;
        } else {
            return new User();
        }
    }

    @PutMapping("/api/user/")
    @ResponseBody
    public ResponseEntity<String> updateUser(HttpSession session, @RequestBody User user) {
        String loggedin = authService.getCurrentUser(session);
        if (user.getUsername().equals(loggedin) == true) {
            users.updateUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } else if (authService.getRole(session) == "admin") {
            users.updateUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/users")
    @ResponseBody
    public List<User> getUsers() {
        return users.getUsers();
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/api/admin/credits")
    @ResponseBody
    public void changeCredits(@RequestBody User user) {
        users.changeCredits(user);
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/api/admin/role")
    @ResponseBody
    public void changeRole(@RequestBody User user) {
        users.changeRole(user);
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/api/user")
    @ResponseBody
    public void deleteUser(@RequestBody User user) {
        users.deleteUser(user);
    }
}
