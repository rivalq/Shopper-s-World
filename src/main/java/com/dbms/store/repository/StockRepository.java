package com.dbms.store.repository;

import com.dbms.store.Mapper.StockMapper;
import com.dbms.store.model.Stock;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class StockRepository {
    @Autowired
    private JdbcTemplate template;

    public List<Stock> getStocks() {
        return template.query("SELECT * FROM stock", new StockMapper());
    }
}
