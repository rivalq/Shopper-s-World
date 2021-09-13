package com.dbms.store.service;



import com.dbms.store.model.Cloth;
import com.dbms.store.repository.ClothRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class ClothService {
    
    @Autowired
    ClothRepository clothes;


    

}
