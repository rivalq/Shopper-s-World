package com.dbms.store.service;

import com.dbms.store.model.MyUserDetails;
import com.dbms.store.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserService userDao;

    @Override
    public MyUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username");
        }
        return new MyUserDetails(user);
    }
}
