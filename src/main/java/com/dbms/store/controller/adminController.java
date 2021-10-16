package com.dbms.store.controller;

import java.util.List;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.dbms.store.model.Cloth;
import com.dbms.store.model.Images;
import com.dbms.store.model.Request;
import com.dbms.store.model.Stock;
import com.dbms.store.repository.RequestRepository;
import com.dbms.store.repository.SellerRepository;
import com.dbms.store.repository.StockRepository;
import com.dbms.store.repository.MarketRepository;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class adminController extends BaseController{


    @Autowired
    SellerRepository sellerRepository;
        
    @Autowired
    RequestRepository requestRepository;

    @Autowired
    MarketRepository marketRepository;

    @Autowired
    StockRepository stockRepository;

    @Value("${API_CONTEXT_ROOT}")
    String context;

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
    
    @GetMapping("/admin/requests")
    public String ClothRequests(HttpSession session){
            if(!isAuthenticated(session)){
                return "redirect:/login";
            }
            if(authService.getRole(session) != "admin")return "/accessDenied";
            return "/admin";
    }


    @GetMapping("/admin")
    public String adminPanel(HttpSession session){
        if(!isAuthenticated(session)){
            return "redirect:/login";
        }
        if(authService.getRole(session) != "admin")return "/accessDenied";
        return "/adminpanel";
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

    @PostMapping("/api/admin/accept_request")
    @ResponseBody
    public ResponseEntity<String> updateStock(HttpSession session,@RequestBody Request request,HttpServletRequest servlet_request) throws IOException{
        ResponseEntity<String> error = new ResponseEntity<String>(HttpStatus.FORBIDDEN);
        if(!isAuthenticated(session)){
            return error;
        }
        if(authService.getRole(session) != "admin")return error;

        int cloth_id = request.getCloth_id();
        Cloth cloth = sellerRepository.getCloth(cloth_id);
        // This will add cloth into marketplace table (if not exists)
        marketRepository.addCloth(cloth, request.getRequest_id());
        
        // stock update
        marketRepository.updateStock(request);

        String path = context + "/resources/static/images/marketplace/" + Integer.toString(cloth_id);
        Files.createDirectories(Paths.get(path));
        List<String> Images = sellerRepository.getClothImages(cloth_id);
        String old = context + "/resources/static";

        for(int i = 0; i < Images.size(); i++){
            String new_path = path + "/";
            String old_path = old + Images.get(i);
            String name = Images.get(i).split("/")[5];
            String url = "/images/marketplace/" + Integer.toString(cloth_id) + "/" + name;
            new_path += name;
            File src = new File(old_path);
            File des = new File(new_path);
            try{
                // Copying Images and updating them on database
                FileUtils.copyFile(src, des);
                marketRepository.addImage(cloth_id, url);
            }catch(Exception e){
                //e.printStackTrace();
            }
        }
        // Finally request is accepeted
        requestRepository.acceptRequest(request.getRequest_id(),cloth_id);
        return new ResponseEntity<String>(HttpStatus.OK);
    }
    @PostMapping("/api/admin/reject_request/{id}")
    @ResponseBody
    public void rejectRequest(@PathVariable("id") int request_id, HttpSession session){
        if(!isAuthenticated(session)){
            return;
        }
        if(authService.getRole(session) != "admin")return;

        requestRepository.rejectRequest(request_id);
        return;

    } 
    
    @GetMapping("/api/admin/images")
    @ResponseBody
    public List<Images> getImages(HttpSession session){
        if(!isAuthenticated(session)){
            return new ArrayList<>();
        }
        if(authService.getRole(session) != "admin")return new ArrayList<>();

        return marketRepository.getImages();
    }

    @GetMapping("/api/admin/stock")
    @ResponseBody
    public List<Stock> getStocks(HttpSession session){
        if(!isAuthenticated(session)){
            return new ArrayList<>();
        }
        if(authService.getRole(session) != "admin")return new ArrayList<>();

        return stockRepository.getStocks();
    }

    @GetMapping("/api/admin/seller_clothes/images")
    @ResponseBody
    public List<Images> getSellerClothImages(HttpSession session){
        if(!isAuthenticated(session)){
            return new ArrayList<>();
        }
        if(authService.getRole(session) != "admin")return new ArrayList<>();

        return sellerRepository.getClothImages();
    }
    @GetMapping("/api/admin/seller_clothes")
    @ResponseBody
    public List<Cloth> getSellerClothes(HttpSession session){
        if(!isAuthenticated(session)){
            return new ArrayList<>();
        }
        if(authService.getRole(session) != "admin")return new ArrayList<>();

        return sellerRepository.getSellerClothes();
    }
}
