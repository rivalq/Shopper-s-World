package com.dbms.store.Mapper;

import com.dbms.store.model.Contact;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class ContactMapper implements RowMapper<Contact> {

    public Contact mapRow(ResultSet rs, int rownum) throws SQLException {
        Contact ct = new Contact();
        ct.setEmail(rs.getString("email"));
        ct.setMessage(rs.getString("message"));
        ct.setName(rs.getString("name"));
        return ct;
    }
}
