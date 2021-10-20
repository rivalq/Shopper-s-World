package com.dbms.store.controller;

import com.dbms.store.model.Cloth;
import com.dbms.store.repository.ClothRepository;
import com.dbms.store.service.ClothService;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DashboardController extends BaseController {
    @Autowired
    ClothService clothservice;

    @Autowired
    ClothRepository clothRepository;

    @Value("${API_CONTEXT_ROOT}")
    private String context;

    public class Pair {
        public String profile_url;
        public Cloth cloth;

        Pair(String profile_url, Cloth cloth) {
            this.profile_url = profile_url;
            this.cloth = cloth;
        }
    }

    @RequestMapping("/dashboard")
    public String dashboard(Model model, HttpSession session) {
        if (!isAuthenticated(session)) {
            return "redirect:/login";
        }
        addDefaultAttributes(model, session);
        return "dashboard/index";
    }

    @GetMapping("/dashboard/orders")
    public String OrderInterface(HttpSession session) {
        if (!isAuthenticated(session)) {
            return "redirect:/login";
        }
        return "orderInterface";
    }
}
