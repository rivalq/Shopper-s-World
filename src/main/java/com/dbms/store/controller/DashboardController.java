package com.dbms.store.controller;


import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.dbms.store.model.Cloth;
import com.dbms.store.repository.ClothRepository;
import com.dbms.store.service.ClothService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;




@Controller
public class DashboardController extends BaseController {

        @Autowired
        ClothService clothservice;

        @Autowired
        ClothRepository clothRepository;   

        public class Pair{
         
            public String profile_url;
            public Cloth cloth;
            Pair(String profile_url,Cloth cloth){
                this.profile_url = profile_url;
                this.cloth = cloth;
            }
        }

        @GetMapping("/dashboard")
        public String dashboard(Model model, HttpSession session) {
            if (!isAuthenticated(session)) {
                return "redirect:/login";
            }
    
            addDefaultAttributes(model, session);
            return "dashboard/index";
        }
        @GetMapping("/dashboard/clothes/{id}")
        public String clothInterface(@PathVariable("id") int id, Model model, HttpSession session){
            if (!isAuthenticated(session)) {
                return "redirect:/login";
            }
            Cloth cloth = clothRepository.getCloth(id);
            List<String> urls = clothRepository.getImages(id);
            model.addAttribute("profile", urls.get(0));
            model.addAttribute("name", cloth.getName());
            model.addAttribute("brand", cloth.getBrand());
            model.addAttribute("category", cloth.getCategory());
            model.addAttribute("short_description", cloth.getShort_description());
            model.addAttribute("long_description",cloth.getLong_description());
            model.addAttribute("snapshots", urls);
            return "/dashboard/clothes";
        }
        @GetMapping("/dashboard/clothes")
        public String listclothes(Model model, HttpSession session){
            if (!isAuthenticated(session)) {
                return "redirect:/login";
            }
            List<Cloth> clothes_temp = clothRepository.getAllClothes();
            List<List<Pair>> clothes = new ArrayList<>();
            List<String> image_urls = new ArrayList<String>();
            for(int i = 0; i < clothes_temp.size(); i++){
                    image_urls.add(clothRepository.getProfileImage(clothes_temp.get(i).getId()));
            }
            int i = 0;
            while(i < clothes_temp.size()){
                    int j = i;
                    List<Pair> temp = new ArrayList<>();
                    while(j < clothes_temp.size() && j - i < 4){
                        Pair pair = new Pair(image_urls.get(j),clothes_temp.get(j));
                        temp.add(pair);
                        j++;
                    }
                    clothes.add(temp);
                    i = j;
            }
            
            model.addAttribute("clothes", clothes);
            model.addAttribute("image_urls", image_urls);
            return "/dashboard/listclothes";
        }
        @GetMapping("/create")
        public String createClothInterface(Model model,HttpSession session){
            if(!isAuthenticated(session)){
                return "redirect:/login";
            }
            return "/dashboard/ClothBuilder";
        }
        @PostMapping("/create/upload")
        @ResponseBody
        public String imageUpload(@RequestParam("file") MultipartFile image){
            if(image == null){
                System.out.println("NUll file");
                return "fail";
            }
            try{
                String path = "/home/rivalq/spring.jpg";
                File file = new File(path);
                image.transferTo(file);
                
            }catch (Exception e){
                e.printStackTrace();
            }
            return "Pass";
        }
}    