package com.dbms.store;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
@EnableWebMvc
public class WebMvc implements WebMvcConfigurer {
    @Value("${IMAGE_DIR}")
    private String context;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/css/**", "/js/**", "/images/**").addResourceLocations("classpath:/static/css/", "classpath:/static/js/", "file:" + context).setCachePeriod(31536000).resourceChain(true).addResolver(new PathResourceResolver());
    }
}
