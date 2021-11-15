package com.dbms.store.repository;

import com.dbms.store.Mapper.ContactMapper;
import com.dbms.store.model.Contact;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ContactRepository {
    @Autowired
    private JdbcTemplate template;

    public boolean exists(String email) {
        return template.queryForObject("SELECT COUNT(*) from messages where email = ?", Integer.class, email) > 0;
    }

    public void addContact(Contact contact) {
        template.update("INSERT INTO messages(email,name,message) VALUES (?,?,?)", contact.getEmail(), contact.getName(), contact.getMessage());
    }

    public List<Contact> getContacts() {
        return template.query("SELECT * from messages", new ContactMapper());
    }
}
