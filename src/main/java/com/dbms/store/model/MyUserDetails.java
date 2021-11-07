package com.dbms.store.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class MyUserDetails implements UserDetails {
    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> grantList = new ArrayList<>();
        System.out.println("DEBUG" + this.user.getRole());
        GrantedAuthority authority = new SimpleGrantedAuthority(this.user.getRole());
        System.out.println(authority.getAuthority());
        grantList.add(authority);
        return grantList;
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // verified email
    @Override
    public boolean isEnabled() {
        return true;
    }

    public MyUserDetails() {}

    public MyUserDetails(User user) {
        this.user = user;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
