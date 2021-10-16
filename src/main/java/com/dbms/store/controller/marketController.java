package com.dbms.store.controller;

import java.util.List;
import java.util.ArrayList;



import javax.servlet.http.HttpSession;

import com.dbms.store.repository.MarketRepository;
import com.dbms.store.model.MarketPlace;
import com.dbms.store.model.Stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class marketController extends BaseController{
    

        @Autowired
        private MarketRepository marketRepository;



        


        @GetMapping("/api/marketplace/clothes")
        @ResponseBody
        public List<MarketPlace> getMarketClothes(HttpSession session){
                if(!isAuthenticated(session)){
                    return new ArrayList<MarketPlace>();
                }
                return marketRepository.getMarketClothes();
        }

        @GetMapping("/api/marketplace/clothes/{cloth_id}")
        @ResponseBody
        public MarketPlace getMarketClothes(@PathVariable("cloth_id") int cloth_id,HttpSession session){
                if(!isAuthenticated(session)){
                    return new MarketPlace();
                }
                return marketRepository.getMarketClothes(cloth_id);
        }


        @GetMapping("/api/marketplace/stock/{cloth_id}")
        @ResponseBody
        public List<Stock> getMarketStock(@PathVariable("cloth_id") int cloth_id,HttpSession session){
                if(!isAuthenticated(session)){
                    return new ArrayList<Stock>();
                }
                return marketRepository.getStock(cloth_id);
        }
        @GetMapping("/api/marketplace/stock/{cloth_id}/{size}")
        @ResponseBody
        public int getPrice(@PathVariable("cloth_id") int cloth_id,@PathVariable("size") String size,HttpSession session){
                if(!isAuthenticated(session))return -1;
                return marketRepository.getPrice(cloth_id,size);
        }

        
        @PutMapping("/api/marketplace/clothes/{cloth_id}")
        @ResponseBody
        public ResponseEntity<String> updateCloth(HttpSession session,@RequestBody MarketPlace mp) {
               ResponseEntity<String> err = new ResponseEntity<>(HttpStatus.FORBIDDEN);
               ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);
               if(checkAdmin(session) == 0)return err;
               marketRepository.updateCloth(mp);
               return ok; 
        }

        
}
