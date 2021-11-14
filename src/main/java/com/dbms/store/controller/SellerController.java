package com.dbms.store.controller;

import com.dbms.store.model.Cloth;
import com.dbms.store.model.Features;
import com.dbms.store.model.Request;
import com.dbms.store.repository.RequestRepository;
import com.dbms.store.repository.SellerRepository;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@PreAuthorize("hasAnyAuthority('seller','admin')")
public class SellerController extends BaseController {
    @Value("#{environment.api_root}")
    private String context;

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private RequestRepository requestRepository;

    @GetMapping("/seller")
    public String SellerPanel(HttpSession session, Model model) {
        //if(authService.getRole(session) == "admin")return "redirect:/admin";
        return "seller";
    }

    @GetMapping("/seller/clothes/{cloth_id}")
    public String SellerclothInterface(@PathVariable("cloth_id") int cloth_id, HttpSession session) {
        if (!isAuthenticated(session)) {
            return "redirect:/login";
        }
        if (authService.getRole(session) == "user") {
            return "/accessDenied";
        }

        String user = authService.getCurrentUser(session);
        Cloth cloth = sellerRepository.getCloth(cloth_id);

        if ((user.equals(cloth.getSeller()) == false) && (authService.getRole(session) != "admin")) {
            return "/accessDenied";
        }
        return "SellerclothInterface";
    }

    /**  API ENDPOINTS **/

    @PostMapping("/api/seller/add/{selected}")
    public ResponseEntity<String> addCloth(HttpSession session, @RequestPart Cloth cloth, @RequestPart MultipartFile[] images, @PathVariable("selected") int selected, @RequestPart List<Features> features) {
        ResponseEntity<String> error = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        ResponseEntity<String> ok = new ResponseEntity<String>("Success", HttpStatus.OK);
        int auth = SellerAuthentication(session);
        if (auth != 1) {
            return error;
        }
        String user = authService.getCurrentUser(session);
        cloth.setSeller(user);
        int x = sellerRepository.addCloth(cloth);
        for (int i = 0; i < features.size(); i++) {
            features.get(i).setCloth_id(x);
            sellerRepository.addFeature(features.get(i));
        }
        String path = context + "/resources/static/images/" + user + "/created/" + Integer.toString(x);
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
                String url = "/images/" + user + "/created/" + Integer.toString(x) + "/" + name;
                File file = new File(pth);
                images[i].transferTo(file);
                sellerRepository.addImage(url, x);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ok;
    }

    @GetMapping("/api/seller/clothes")
    @ResponseBody
    public List<Cloth> listCloth(HttpSession session) {
        int auth = SellerAuthentication(session);
        if (auth != 1) {
            return new ArrayList<>();
        }
        String user = authService.getCurrentUser(session);
        return sellerRepository.listCloth(user);
    }

    @DeleteMapping("/api/seller/clothes/{cloth_id}")
    @ResponseBody
    public ResponseEntity<String> deleteCloth(@PathVariable("cloth_id") int cloth_id, HttpSession session) {
        int auth = SellerAuthentication(session);
        ResponseEntity<String> error = new ResponseEntity<>(HttpStatus.FORBIDDEN);
        if (auth != 1) {
            return error;
        }
        Cloth cloth = sellerRepository.getCloth(cloth_id);
        String user = authService.getCurrentUser(session);
        if (user.equals(cloth.getSeller()) == false) {
            // Error
            return error;
        }
        sellerRepository.deleteCloth(cloth_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/seller/clothes/{cloth_id}")
    @ResponseBody
    public Cloth getCloth(@PathVariable("cloth_id") int cloth_id, HttpSession session) {
        int auth = SellerAuthentication(session);
        if (auth != 1) {
            return new Cloth();
        }
        Cloth cloth = sellerRepository.getCloth(cloth_id);
        String user = authService.getCurrentUser(session);
        if ((user.equals(cloth.getSeller()) == false) && (authService.getRole(session) != "admin")) {
            // Error
            return new Cloth();
        }
        return cloth;
    }

    @PostMapping("/api/seller/clothes/{cloth_id}")
    @ResponseBody
    public void updateCloth(@PathVariable("cloth_id") int cloth_id, HttpSession session, @RequestBody Cloth cloth) {
        int auth = SellerAuthentication(session);
        if (auth != 1) {
            return;
        }
        String user = authService.getCurrentUser(session);
        if ((user.equals(cloth.getSeller()) == false) && (authService.getRole(session) != "admin")) {
            // Error
            return;
        }
        sellerRepository.updateCloth(cloth);
    }

    @GetMapping("/api/seller/clothes/images/{cloth_id}")
    @ResponseBody
    public List<String> getClothImages(@PathVariable("cloth_id") int cloth_id, HttpSession session) {
        int auth = SellerAuthentication(session);
        if (auth != 1) {
            return new ArrayList<String>();
        }
        Cloth cloth = sellerRepository.getCloth(cloth_id);
        String user = authService.getCurrentUser(session);

        if ((user.equals(cloth.getSeller()) == false) && (authService.getRole(session) != "admin")) {
            // Error
            return new ArrayList<String>();
        }

        return sellerRepository.getClothImages(cloth_id);
    }

    @PutMapping("/api/seller/images/{cloth_id}/{selected}")
    @ResponseBody
    public void updateClothImages(@PathVariable("cloth_id") int cloth_id, @PathVariable("selected") int selected, HttpSession session, @RequestPart MultipartFile[] images) {
        int auth = SellerAuthentication(session);
        if (auth != 1) {
            return;
        }
        Cloth cloth = sellerRepository.getCloth(cloth_id);
        String user = authService.getCurrentUser(session);

        if ((user.equals(cloth.getSeller()) == false) && (authService.getRole(session) != "admin")) {
            // Error
            return;
        }
        sellerRepository.clearImages(cloth_id);
        String path = context + "/resources/static/images/" + user + "/created/" + Integer.toString(cloth_id);
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
                String url = "/images/" + user + "/created/" + Integer.toString(cloth_id) + "/" + name;
                File file = new File(pth);
                images[i].transferTo(file);
                sellerRepository.addImage(url, cloth_id);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/api/seller/clothes/features/{cloth_id}")
    @ResponseBody
    public List<Features> getClothFeaturs(@PathVariable("cloth_id") int cloth_id, HttpSession session) {
        int auth = SellerAuthentication(session);
        if (auth != 1) {
            return new ArrayList<>();
        }
        Cloth cloth = sellerRepository.getCloth(cloth_id);
        String user = authService.getCurrentUser(session);

        if ((user.equals(cloth.getSeller()) == false) && (authService.getRole(session) != "admin")) {
            // Error
            return new ArrayList<>();
        }

        return sellerRepository.getFeatures(cloth_id);
    }

    @PutMapping("/api/seller/features/{cloth_id}")
    @ResponseBody
    public void updateClothFeatures(@PathVariable("cloth_id") int cloth_id, HttpSession session, @RequestPart List<Features> features) {
        int auth = SellerAuthentication(session);
        if (auth != 1) {
            return;
        }
        Cloth cloth = sellerRepository.getCloth(cloth_id);
        String user = authService.getCurrentUser(session);

        if ((user.equals(cloth.getSeller()) == false) && (authService.getRole(session) != "admin")) {
            // Error
            return;
        }
        sellerRepository.clearFeatures(cloth_id);
        for (int i = 0; i < features.size(); i++) {
            features.get(i).setCloth_id(cloth_id);
            sellerRepository.addFeature(features.get(i));
        }
    }

    @GetMapping("/api/seller/request")
    @ResponseBody
    public List<Request> getSellerRequest(HttpSession session) {
        int auth = SellerAuthentication(session);
        if (auth != 1) {
            return new ArrayList<Request>();
        }
        String user = authService.getCurrentUser(session);

        return requestRepository.getRequestsBySeller(user);
    }

    @PostMapping("/api/seller/request")
    @ResponseBody
    public Request sendRequest(HttpSession session, @RequestBody Request request) {
        int auth = SellerAuthentication(session);
        if (auth != 1) {
            return new Request();
        }
        request.setSeller(authService.getCurrentUser(session));
        int x = requestRepository.sendRequest(request);
        request.setRequest_id(x);
        return request;
    }
}
