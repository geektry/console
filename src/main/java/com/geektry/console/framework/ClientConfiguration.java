package com.geektry.console.framework;

import feign.auth.BasicAuthRequestInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Chaohang Fu
 */
@Configuration
public class ClientConfiguration {

    @Value("${feign-client.basic-auth.username}")
    private String username;

    @Value("${feign-client.basic-auth.password}")
    private String password;

    @Bean
    public BasicAuthRequestInterceptor basicAuthRequestInterceptor() {
        return new BasicAuthRequestInterceptor(username, password);
    }
}
