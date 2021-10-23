package com.dbms.store.controller;

import com.dbms.store.model.Cloth;
import com.dbms.store.model.Stock;
import com.dbms.store.repository.ClothRepository;
import com.dbms.store.service.ClothService;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ClothController extends BaseController {
    @Autowired
    ClothService clothservice;

    @Autowired
    ClothRepository clothRepository;

    @GetMapping("/dashboard/clothes/{id}")
    public String clothInterface(@PathVariable("id") int id, Model model, HttpSession session) {
        if (!isAuthenticated(session)) {
            return "redirect:/login";
        }
        model.addAttribute("role", authService.getRole(session));
        return "clothInterface";
    }

    @GetMapping("/dashboard/clothes")
    public String marketArea(HttpSession session, Model model) {
        if (!isAuthenticated(session)) {
            return "redirect:/login";
        }
        return "market";
    }

    /*
     * Api endpoints to access database from js
     *
     */

    @GetMapping("/api/clothes/{id}")
    @ResponseBody
    public Cloth GetClothInfo(@PathVariable("id") int id, HttpSession session) {
        if (!isAuthenticated(session)) {
            return new Cloth();
        }

        Cloth cloth = clothRepository.getCloth(id);
        return cloth;
    }

    @GetMapping("/api/clothes/images/{id}")
    @ResponseBody
    public List<String> getClothImages(@PathVariable("id") int id, HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<String>();
        }
        List<String> images = clothRepository.getImages(id);
        return images;
    }

    @GetMapping("/api/clothes/stock/{id}")
    @ResponseBody
    public List<Stock> getStock(@PathVariable("id") int id, HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<Stock>();
        }
        return clothRepository.getStock(id);
    }

    @PutMapping("/api/clothes/heading/{id}")
    @ResponseBody
    public ResponseEntity<String> updateHeading(HttpSession session, @PathVariable("id") int id, @RequestParam("heading") String heading, @RequestParam("category") String category, @RequestParam("brand") String brand, @RequestParam("short_description") String short_description, @RequestParam("long_description") String long_description) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<String>("Access Denied", HttpStatus.FORBIDDEN);
        }

        clothRepository.changeHeading(id, heading, category, brand, short_description, long_description);
        return new ResponseEntity<String>("Success", HttpStatus.OK);
    }
}
