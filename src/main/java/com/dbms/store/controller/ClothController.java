package com.dbms.store.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.dbms.store.model.Cloth;
import com.dbms.store.model.Stock;
import com.dbms.store.repository.ClothRepository;
import com.dbms.store.service.ClothService;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;



@Controller
public class ClothController extends BaseController{

    @Autowired
    ClothService clothservice;

    @Autowired
    ClothRepository clothRepository;   

    @Value("${API_CONTEXT_ROOT}")
    private String context;

    
    @GetMapping("/create")
    public String createClothInterface(Model model,HttpSession session){
        if(!isAuthenticated(session)){
            return "redirect:/login";
        }
        return "/dashboard/ClothBuilder";
    }

    @PostMapping("/create/submit")
    @ResponseBody
    public ResponseEntity<Integer> Submit(@RequestParam("name") String name,
                                      @RequestParam("short_description") String short_description,       
                                      @RequestParam("category") String category,
                                      @RequestParam("brand") String brand,
                                      @RequestParam("long_description") String long_description ){
        
        Integer id = clothRepository.createCloth(name, brand, category, short_description, long_description);                           
        return new ResponseEntity<Integer>(id,HttpStatus.OK);                            
    }

    @PostMapping("/create/upload")
    @ResponseBody
    public ResponseEntity<String> imageUpload(@RequestParam("image_file") MultipartFile image,
                                              @RequestParam("id") int id                     ){
        if(image.getOriginalFilename() == ""){
            return new ResponseEntity<String>("Failed",HttpStatus.BAD_GATEWAY);
        }
        try{  
              String extension = FilenameUtils.getExtension(image.getOriginalFilename());
              String name = String.valueOf(id) + "_1." + extension;
              String path = context + "/resources/static/images/" + name;
              File File = new File(path);
              image.transferTo(File);  
              clothRepository.addImage(name,id);
            
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("Failed",HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<String>("Passed",HttpStatus.OK);
    }
    
    @GetMapping("/dashboard/clothes/{id}")
    public String clothInterface(@PathVariable("id") int id, Model model, HttpSession session){
            if (!isAuthenticated(session)) {
                return "redirect:/login";
            }
            model.addAttribute("role", authService.getRole(session));
            return "/clothWithEdit";
    }


    /* 
    * Api endpoints to access database from js
    * 
    */

    @GetMapping("/api/clothes/{id}")
    @ResponseBody
    public Cloth GetClothInfo(@PathVariable("id") int id,HttpSession session){
        if(!isAuthenticated(session)){
            return new Cloth();
        }
    
        Cloth cloth = clothRepository.getCloth(id);
        return cloth;
    }
    @GetMapping("/api/clothes/images/{id}")
    @ResponseBody
    public List<String> getClothImages(@PathVariable("id") int id,HttpSession session){
        if(!isAuthenticated(session)){
               return new ArrayList<String>(); 
        }
        List<String> images = clothRepository.getImages(id);
        return images;
    }

    @GetMapping("/api/clothes/stock/{id}")
    @ResponseBody
    public List<Stock> getStock(@PathVariable("id") int id, HttpSession session){
        if(!isAuthenticated(session)){
            return new ArrayList<Stock>();
        }
        return clothRepository.getStock(id);
    }

    @PutMapping("/api/clothes/heading/{id}")
    @ResponseBody
    public ResponseEntity<String> updateHeading(HttpSession session,@PathVariable("id") int id,
                              @RequestParam("heading") String heading,
                              @RequestParam("category") String category,
                              @RequestParam("brand") String brand,
                              @RequestParam("short_description") String short_description,
                              @RequestParam("long_description") String long_description){
        if(!isAuthenticated(session)){
            return new ResponseEntity<String>("Access Denied",HttpStatus.FORBIDDEN);
        }
                                
        clothRepository.changeHeading(id, heading, category, brand, short_description,long_description);   
        return new ResponseEntity<String>("Success",HttpStatus.OK);               
    }
}
