package com.dbms.store.controller;

import com.dbms.store.model.Contact;
import com.dbms.store.repository.ClothRepository;
import com.dbms.store.repository.ContactRepository;
import com.dbms.store.service.ClothService;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DashboardController extends BaseController {
    @Autowired
    ClothService clothservice;

    @Autowired
    ClothRepository clothRepository;

    @Autowired
    ContactRepository contactRepository;

    @GetMapping("/")
    public String forward_dashboard() {
        return "redirect:/dashboard";
    }

    @GetMapping("/contact")
    public String contact() {
        return "contact";
    }

    @PostMapping("/api/contact")
    public ResponseEntity<String> sendMessage(@RequestBody Contact contact) {
        if (contactRepository.exists(contact.getEmail())) {
            return new ResponseEntity<>("You have Already Sent Message", HttpStatus.FORBIDDEN);
        } else {
            contactRepository.addContact(contact);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/contact")
    @ResponseBody
    public List<Contact> getContacts() {
        return contactRepository.getContacts();
    }

    @RequestMapping("/dashboard")
    public String dashboard(Model model, HttpSession session, @ModelAttribute("message") String msg) {
        if (msg == "loggedin") {
            model.addAttribute("username", authService.getCurrentUser(session));
        }
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
