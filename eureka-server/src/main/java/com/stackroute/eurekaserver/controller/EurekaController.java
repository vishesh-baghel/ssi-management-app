package com.stackroute.eurekaserver.controller;

import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("api/v1/eureka")
@RefreshScope
public class EurekaController {

    @GetMapping("/message")
    public String getMessage() {
        return "Hai, message from eureka";
    }
}
