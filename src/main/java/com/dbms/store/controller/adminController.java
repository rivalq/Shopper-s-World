package com.dbms.store.controller;

import com.dbms.store.model.Cloth;
import com.dbms.store.model.Features;
import com.dbms.store.model.Images;
import com.dbms.store.model.MarketPlace;
import com.dbms.store.model.Order;
import com.dbms.store.model.Request;
import com.dbms.store.model.Reviews;
import com.dbms.store.model.Stock;
import com.dbms.store.repository.MarketRepository;
import com.dbms.store.repository.OrderRepository;
import com.dbms.store.repository.RatingRepository;
import com.dbms.store.repository.RequestRepository;
import com.dbms.store.repository.ReviewRepository;
import com.dbms.store.repository.SellerRepository;
import com.dbms.store.repository.StockRepository;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@PreAuthorize("hasAuthority('admin')")
public class adminController extends BaseController {
    @Autowired
    SellerRepository sellerRepository;

    @Autowired
    RequestRepository requestRepository;

    @Autowired
    MarketRepository marketRepository;

    @Autowired
    StockRepository stockRepository;

    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Value("#{environment.api_root}")
    String context;

    @Value("${UPLOAD}")
    String val;

    @GetMapping("/admin")
    public String adminPanel(HttpSession session) {
        System.out.println(context);
        return "adminpanel";
    }

    @GetMapping("/api/admin/requests")
    @ResponseBody
    public List<Request> getRequests(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<Request>();
        }
        if (authService.getRole(session) != "admin") return new ArrayList<Request>();
        return requestRepository.getRequests();
    }

    @PostMapping("/api/admin/accept_request")
    @ResponseBody
    public ResponseEntity<String> updateStock(HttpSession session, @RequestBody Request request, HttpServletRequest servlet_request) throws IOException {
        ResponseEntity<String> error = new ResponseEntity<String>(HttpStatus.FORBIDDEN);
        if (!isAuthenticated(session)) {
            return error;
        }
        if (authService.getRole(session) != "admin") return error;

        int cloth_id = request.getCloth_id();
        Cloth cloth = sellerRepository.getCloth(cloth_id);
        List<Features> fr = sellerRepository.getFeatures(cloth_id);
        int x = requestRepository.exists((cloth_id));
        if (x == 0) {
            cloth.setAdmin_rating(5);
            cloth.setCustom(true);
            x = marketRepository.addCloth(cloth);
            request.setCloth_id(x);
            String path = context + "/resources/static/images/marketplace/" + Integer.toString(x);
            Files.createDirectories(Paths.get(path));
            List<String> Images = sellerRepository.getClothImages(cloth_id);
            String old = context + "/resources/static";

            for (int i = 0; i < Images.size(); i++) {
                String new_path = path + "/";
                String old_path = old + Images.get(i);
                String name = Images.get(i).split("/")[5];
                String url = "/images/marketplace/" + Integer.toString(x) + "/" + name;
                new_path += name;
                File src = new File(old_path);
                File des = new File(new_path);
                try {
                    // Copying Images and updating them on database
                    FileUtils.copyFile(src, des);
                    marketRepository.addImage(x, url);
                } catch (Exception e) {
                    //e.printStackTrace();
                }
            }
            for (int i = 0; i < fr.size(); i++) {
                fr.get(i).setCloth_id(x);
                marketRepository.addFeature(fr.get(i));
            }
        }

        marketRepository.updateStock(request);
        requestRepository.acceptRequest(request.getRequest_id(), x);

        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @PostMapping("/api/admin/reject_request/{id}")
    @ResponseBody
    public void rejectRequest(@PathVariable("id") int request_id, HttpSession session) {
        if (!isAuthenticated(session)) {
            return;
        }
        if (authService.getRole(session) != "admin") return;

        requestRepository.rejectRequest(request_id);
        return;
    }

    @GetMapping("/api/admin/images")
    @ResponseBody
    public List<Images> getImages(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<>();
        }
        if (authService.getRole(session) != "admin") return new ArrayList<>();

        return marketRepository.getImages();
    }

    @GetMapping("/api/admin/stock")
    @ResponseBody
    public List<Stock> getStocks(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<>();
        }
        if (authService.getRole(session) != "admin") return new ArrayList<>();

        return stockRepository.getStocks();
    }

    @GetMapping("/api/admin/seller_clothes/images")
    @ResponseBody
    public List<Images> getSellerClothImages(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<>();
        }
        if (authService.getRole(session) != "admin") return new ArrayList<>();

        return sellerRepository.getClothImages();
    }

    @GetMapping("/api/admin/seller_clothes")
    @ResponseBody
    public List<Cloth> getSellerClothes(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ArrayList<>();
        }
        if (authService.getRole(session) != "admin") return new ArrayList<>();

        return sellerRepository.getSellerClothes();
    }

    @PutMapping("/api/admin/stock")
    @ResponseBody
    public ResponseEntity<String> updateAdminStock(HttpSession session, @RequestBody List<Stock> stocks) {
        ResponseEntity<String> error = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);

        if (!isAuthenticated(session)) {
            return error;
        }
        if (authService.getRole(session) != "admin") return error;

        for (int i = 0; i < stocks.size(); i++) {
            marketRepository.updateStock(stocks.get(i));
        }

        return ok;
    }

    @PutMapping("/api/admin/rating")
    @ResponseBody
    public ResponseEntity<String> changeRating(HttpSession session, @RequestBody MarketPlace mp) {
        ResponseEntity<String> error = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);
        if (checkAdmin(session) == 0) return error;

        ratingRepository.updateRating(mp);

        return ok;
    }

    @GetMapping("/api/admin/purchased")
    @ResponseBody
    public List<Order> getPurchased(HttpSession session) {
        if (checkAdmin(session) == 0) {
            return new ArrayList<>();
        } else {
            return orderRepository.getOrders();
        }
    }

    @GetMapping("/api/admin/reviews")
    @ResponseBody
    public List<Reviews> getReviews(HttpSession session) {
        if (checkAdmin(session) == 0) {
            return new ArrayList<>();
        } else {
            return reviewRepository.getReviews();
        }
    }

    @PostMapping("/api/admin/add/{selected}")
    @ResponseBody
    public ResponseEntity<String> addCloth(HttpSession session, @RequestPart MarketPlace cloth, @RequestPart List<Stock> stock, @RequestPart List<Features> fr, @RequestPart MultipartFile[] images, @PathVariable("selected") int selected) {
        ResponseEntity<String> error = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<>(HttpStatus.OK);

        if (checkAdmin(session) == 0) {
            return error;
        }
        String user = authService.getCurrentUser(session);
        cloth.setSeller(user);
        int x = marketRepository.addCloth(cloth);
        for (int i = 0; i < stock.size(); i++) {
            stock.get(i).setCloth_id(x);
            marketRepository.updateStock(stock.get(i));
        }
        for (int i = 0; i < fr.size(); i++) {
            fr.get(i).setCloth_id(x);
            marketRepository.addFeature(fr.get(i));
        }
        String path = context + "/resources/static/images/marketplace/" + Integer.toString(x);
        try {
            Files.createDirectories(Paths.get(path));
            int cnt = 0;
            for (int i = 0; i < images.length; i++) {
                String name = "";
                if (i == selected) {
                    name = "profile";
                } else {
                    cnt++;
                    name = Integer.toString(cnt);
                }
                String pth = path + "/" + name;
                String url = "/images/marketplace/" + Integer.toString(x) + "/" + name;
                File file = new File(pth);
                images[i].transferTo(file);
                marketRepository.addImage(x, url);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ok;
    }

    @PostMapping("/api/admin/upload")
    @ResponseBody
    public void uploadData(@RequestPart MultipartFile file) {
        File f = new File(val + "/file");
        try {
            file.transferTo(f);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @PutMapping("/api/admin/images/{cloth_id}/{selected}")
    @ResponseBody
    public void updateImages(@RequestPart MultipartFile[] images,@PathVariable("cloth_id") int cloth_id, @PathVariable("selected") int selected){
        
        marketRepository.clearImages(cloth_id);
        String path = context + "/resources/static/images/marketplace/" + Integer.toString(cloth_id);
        try {
            Files.createDirectories(Paths.get(path));
            int cnt = 0;
            for (int i = 0; i < images.length; i++) {
                String name = "";
                if (i == selected) {
                    name = "profile";
                } else {
                    cnt++;
                    name = Integer.toString(cnt);
                }
                String pth = path + "/" + name;
                String url = "/images/marketplace/" + Integer.toString(cloth_id) + "/" + name;
                File file = new File(pth);
                images[i].transferTo(file);
                marketRepository.addImage(cloth_id, url);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @PutMapping("/api/admin/features/{cloth_id}")
    @ResponseBody
    public void updateFeatures(@RequestPart List<Features> features,@PathVariable("cloth_id") int cloth_id){
        marketRepository.clearFeatures(cloth_id);
        for(int i = 0; i < features.size(); i++){
            features.get(i).setCloth_id(cloth_id);
            marketRepository.addFeature(features.get(i));
        }
    }

    @GetMapping("/admin/secret")
    public String secret() {
        return "upload";
    }
}
