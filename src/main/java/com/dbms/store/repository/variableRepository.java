package com.dbms.store.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class variableRepository {
    @Autowired
    private JdbcTemplate template;

    public Integer getVariable(String variable) {
        return template.queryForObject("SELECT value from db_variables where variable = ?", Integer.class, variable);
    }

    public void setVariable(String variable, int value) {
        template.update("INSERT INTO db_variables(variable,value) VALUES (?,?) ON DUPLICATE KEY UPDATE value = ?", variable, value, value);
    }
}
