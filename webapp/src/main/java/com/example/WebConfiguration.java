package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration {

    @Autowired
    private Environment env;

    @Bean
    public FilterRegistrationBean corsFilter() {
        System.out.println(env.getProperty("REACT_APP_HOST_IP_ADDRESS"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://" + env.getProperty("REACT_APP_HOST_IP_ADDRESS") + ":4200");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        System.out.println(config.getAllowedOrigins());
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(0);
        return bean;
    }
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        System.out.println("http://" + env.getProperty("REACT_APP_HOST_IP_ADDRESS") + ":4200");
//        registry.addMapping("/")
//                .allowedOrigins(env.getProperty("REACT_APP_HOST_IP_ADDRESS"))
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD")
//                .allowCredentials(true);
//    }
}
