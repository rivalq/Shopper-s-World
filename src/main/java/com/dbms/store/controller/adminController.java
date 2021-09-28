package com.dbms.store.controller;

import java.util.List;
import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import com.dbms.store.model.Cloth;
import com.dbms.store.model.Request;

import com.dbms.store.repository.RequestRepository;
import com.dbms.store.repository.SellerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class adminController extends BaseController{


    @Autowired
    SellerRepository sellerRepository;
        
    @Autowired
    RequestRepository requestRepository;

    @PostMapping("/api/request")
    @ResponseBody
    public ResponseEntity<String> sendRequest(@RequestParam("price") int price,
                                              @RequestParam("quantity") int quantity,
                                              @RequestParam("size") String size,
                                              @RequestParam("cloth_id") int cloth_id,
                                              HttpSession session){
           int auth = SellerAuthentication(session);
           ResponseEntity<String> error = new ResponseEntity<>(HttpStatus.FORBIDDEN);
           if(auth != 1)return error;
           Cloth cloth = sellerRepository.getCloth(cloth_id);
           String user = authService.getCurrentUser(session);
           if(!user.equals(cloth.getSeller())){
                return error;
           }else{
              requestRepository.sendRequest(cloth_id, user, size, quantity, price);
            return new ResponseEntity<>(HttpStatus.OK);
           }
    }    
    
    @GetMapping("/admin")
    public String adminPanel(HttpSession session){
            if(!isAuthenticated(session)){
                return "redirect:/login";
            }
            if(authService.getRole(session) != "admin")return "/accessDenied";
            return "/admin";
    }

    @GetMapping("/api/admin/requests")
    @ResponseBody
    public List<Request> getRequests(HttpSession session){
        if(!isAuthenticated(session)){
            return new ArrayList<Request>();
        }
        if(authService.getRole(session) != "admin")return new ArrayList<Request>();
        return requestRepository.getRequests();
    }


}
