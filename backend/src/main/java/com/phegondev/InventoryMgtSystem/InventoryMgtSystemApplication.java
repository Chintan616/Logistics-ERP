package com.phegondev.InventoryMgtSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class InventoryMgtSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryMgtSystemApplication.class, args);
    }

}
