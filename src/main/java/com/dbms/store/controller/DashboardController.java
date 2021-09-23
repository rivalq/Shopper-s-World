package com.dbms.store.controller;


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.dbms.store.model.Cloth;
import com.dbms.store.repository.ClothRepository;
import com.dbms.store.service.ClothService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
public class DashboardController extends BaseController {

        @Autowired
        ClothService clothservice;

        @Autowired
        ClothRepository clothRepository;   

        @Value("${API_CONTEXT_ROOT}")
        private String context;

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
       
}    