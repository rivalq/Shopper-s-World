package com.dbms.store.service;

import com.dbms.store.repository.ClothRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClothService {
    @Autowired
    ClothRepository clothes;
}
