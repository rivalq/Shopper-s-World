package com.dbms.store.controller;

import com.dbms.store.repository.ClothRepository;
import com.dbms.store.service.ClothService;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DashboardController extends BaseController {
    @Autowired
    ClothService clothservice;

    @Autowired
    ClothRepository clothRepository;

    @GetMapping("/")
    public String forward_dashboard() {
        return "redirect:/dashboard";
    }

    @RequestMapping("/dashboard")
    public String dashboard(Model model, HttpSession session) {
        return "dashboard/index";
    }

    @GetMapping("/dashboard/clothes/{id}")
    public String clothInterface(@PathVariable("id") int id, Model model, HttpSession session) {
        String role = authService.getRole(session);
        model.addAttribute("role", role);
        return "clothInterface";
    }

    @GetMapping("/dashboard/clothes")
    public String marketArea(HttpSession session, Model model) {
        return "market";
    }

    @GetMapping("/dashboard/orders")
    public String OrderInterface(HttpSession session) {
        /*if (!isAuthenticated(session)) {
            return "redirect:/login";
        }*/
        return "orderInterface";
    }

    @GetMapping("/dashboard/wishlist")
    public String wishlist(HttpSession session) {
        /*if (!isAuthenticated(session)) {
            return "redirect:/login";
        }*/
        return "wishlist";
    }

    @GetMapping("/dashboard/reviews")
    public String reviews(HttpSession session) {
        /*if (!isAuthenticated(session)) {
            return "redirect:/login";
        }*/
        return "reviews";
    }

    @GetMapping("/dashboard/cart")
    public String userCartRedirect(HttpSession session, Model model) {
        /*if (!isAuthenticated(session)) {
            return "redirect:/login";
        }*/
        return "cart";
    }
}
