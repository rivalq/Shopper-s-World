package com.dbms.store.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.ArrayList;
import javax.servlet.http.HttpSession;

import com.dbms.store.model.Cloth;
import com.dbms.store.model.Request;
import com.dbms.store.repository.RequestRepository;
import com.dbms.store.repository.SellerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;



@Controller
public class SellerController extends BaseController {
        @Value("${API_CONTEXT_ROOT}")
        private String context;


        @Autowired
        private SellerRepository sellerRepository;


        @Autowired
        private RequestRepository requestRepository;
        


        @GetMapping("/seller")
        public String SellerPanel(HttpSession session, Model model){
                        if(SellerAuthentication(session) != 1){
                                return "redirect:/login";
                        }
                        return "/seller";
        }
        
    
        @GetMapping("/create")
        public String createClothInterface(Model model,HttpSession session){
                if(!isAuthenticated(session)){
                        return "redirect:/login";
                }
                if(SellerAuthentication(session) != 1){
                        return "/accessDenied";
                }
                return "/dashboard/ClothBuilder";
        }
        
        @GetMapping("/seller/clothes/{cloth_id}")
        public String SellerclothInterface(@PathVariable("cloth_id") int cloth_id,HttpSession session){
                if(!isAuthenticated(session)){
                        return "redirect:/login";
                }
                if(authService.getRole(session) == "customer"){
                        // Error
                        return "/accessDenied";
                }
                
                String user = authService.getCurrentUser(session);
                Cloth cloth = sellerRepository.getCloth(cloth_id);
                
                if((user.equals(cloth.getSeller()) == false) && (authService.getRole(session) != "admin")){
                        // Error
                        return "/accessDenied";
                }
                return "/SellerclothInterface";
        }
        @GetMapping("/seller/mycloths")
        public String sellerCloths(HttpSession session, Model model){
                if(!isAuthenticated(session)){
                        return "redirect:/login";
                }else if(authService.getRole(session) == "cutsomer" ){
                        return "/accessDenied";
                }else{
                        return "/sellerCloths";
                }
        }

        @GetMapping("/seller/requests")
        public String sellerRequests(HttpSession session, Model model){
                if(!isAuthenticated(session)){
                        return "redirect:/login";
                }else if(authService.getRole(session) == "cutsomer" ){
                        return "/accessDenied";
                }else{
                        return "/sellerRequests";
                }
        }

        @PostMapping("/create/submit")
        @ResponseBody
        public ResponseEntity<Integer> Submit(@RequestParam("name") String name,
                                        @RequestParam("short_description") String short_description,       
                                        @RequestParam("category") String category,
                                        @RequestParam("brand") String brand,
                                        @RequestParam("long_description") String long_description,
                                        HttpSession session){
                if(!isAuthenticated(session)){
                        return new ResponseEntity<Integer>(-1,HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
                }

                String seller = authService.getCurrentUser(session);
                if(authService.getRole(session) == "customer"){
                        return new ResponseEntity<>(-1,HttpStatus.FORBIDDEN);
                }

                Integer id = sellerRepository.addCloth(name, brand, category, short_description, long_description,seller);                           
                return new ResponseEntity<Integer>(id,HttpStatus.OK);                            
        }

        @PostMapping("/create/upload")
        @ResponseBody
        public ResponseEntity<String> imageUpload(@RequestParam("image_file") MultipartFile image,
                                                  @RequestParam("name") String name,      
                                                 @RequestParam("id") int id, HttpSession session){
                if(!isAuthenticated(session)){
                        return new ResponseEntity<String>("Permission Denied",HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
                }

                String seller = authService.getCurrentUser(session);
                if(authService.getRole(session) == "customer"){
                        return new ResponseEntity<String>("Permission Denied",HttpStatus.FORBIDDEN);
                }           

                if(image.getOriginalFilename() == ""){
                        return new ResponseEntity<String>("Failed",HttpStatus.BAD_GATEWAY);
                }
                try{    
                        String path = context + "/resources/static/images/" + seller + "/created/" + Integer.toString(id);
                        Files.createDirectories(Paths.get(path));
                        path = path + "/" + name;
                        String url = "/images/" + seller + "/created/" +Integer.toString(id) + "/" + name;
                        File File = new File(path);
                        image.transferTo(File);  
                        sellerRepository.addImage(url,id);
                        
                }catch (Exception e){
                        e.printStackTrace();
                        return new ResponseEntity<String>("Failed",HttpStatus.BAD_GATEWAY);
                }
                return new ResponseEntity<String>("Passed",HttpStatus.OK);
        }

        /**  API ENDPOINTS **/
        

        @GetMapping("/api/seller/clothes")
        @ResponseBody
        public List<Integer> listCloth(HttpSession session){
                int auth = SellerAuthentication(session);
                if(auth != 1){
                        return new ArrayList<Integer>();
                }
                String user = authService.getCurrentUser(session);
                return sellerRepository.listCloth(user);
                
        }
        @DeleteMapping("/api/seller/clothes/{cloth_id}")
        @ResponseBody
        public ResponseEntity<String> deleteCloth(@PathVariable("cloth_id") int cloth_id, HttpSession session){
                int auth = SellerAuthentication(session);
                ResponseEntity<String> error = new ResponseEntity<>(HttpStatus.FORBIDDEN);
                if(auth != 1){
                        return error;
                }
                Cloth cloth = sellerRepository.getCloth(cloth_id);
                String user = authService.getCurrentUser(session);
                if(user.equals(cloth.getSeller()) == false){
                        // Error
                        return error;
                }
                sellerRepository.deleteCloth(cloth_id);
                return new ResponseEntity<>(HttpStatus.OK);
        }

        @GetMapping("/api/seller/clothes/{cloth_id}")
        @ResponseBody
        public Cloth getCloth(@PathVariable("cloth_id") int cloth_id, HttpSession session){
                int auth = SellerAuthentication(session);
                if(auth != 1){
                        return new Cloth();
                }
                Cloth cloth = sellerRepository.getCloth(cloth_id);
                String user = authService.getCurrentUser(session);
                if((user.equals(cloth.getSeller()) == false) && (authService.getRole(session) != "admin")){
                        // Error
                        return new Cloth();
                }
                return cloth;
        }

        @GetMapping("/api/seller/clothes/images/{cloth_id}")
        @ResponseBody
        public List<String> getClothImages(@PathVariable("cloth_id") int cloth_id, HttpSession session){
                int auth = SellerAuthentication(session);
                if(auth != 1){
                        return new ArrayList<String>();
                }
                Cloth cloth = sellerRepository.getCloth(cloth_id);
                String user = authService.getCurrentUser(session);

                if((user.equals(cloth.getSeller()) == false) && (authService.getRole(session) != "admin")){
                        // Error
                        return new ArrayList<String>();
                }
                
                return sellerRepository.getClothImages(cloth_id);
        }

        @PutMapping("/api/seller/clothes/heading/{cloth_id}")
        @ResponseBody
        public ResponseEntity<String> updateHeading(HttpSession session,@PathVariable("cloth_id") int cloth_id,
                                  @RequestParam("heading") String heading,
                                  @RequestParam("category") String category,
                                  @RequestParam("brand") String brand,
                                  @RequestParam("short_description") String short_description,
                                  @RequestParam("long_description") String long_description){
            int auth = SellerAuthentication(session);                            
            if(auth != 1){
                return new ResponseEntity<String>("Access Denied",HttpStatus.FORBIDDEN);
            }
            Cloth cloth = sellerRepository.getCloth(cloth_id);
            String user = authService.getCurrentUser(session);

            if(user.equals(cloth.getSeller()) == false){
                    // Error
                    return new ResponseEntity<String>("Access Denied",HttpStatus.FORBIDDEN);
            }
                                    
            sellerRepository.changeHeading(cloth_id, heading, category, brand, short_description,long_description);   
            return new ResponseEntity<String>("Success",HttpStatus.OK);               
        }

        @GetMapping("/api/seller/requests")
        @ResponseBody
        public List<Request> getSellerRequest(HttpSession session){
                int auth = SellerAuthentication(session);
                if(auth != 1){
                        return new ArrayList<Request>();
                }
                String user = authService.getCurrentUser(session);

                return requestRepository.getRequestsBySeller(user);

                
        }
}
