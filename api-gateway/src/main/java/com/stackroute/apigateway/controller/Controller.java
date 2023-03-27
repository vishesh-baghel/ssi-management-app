package com.stackroute.apigateway.controller;

import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("api/v1/gateway")
@RefreshScope
public class Controller {

    @GetMapping("message")
    public String getMessage() {
        return "Hai, from gateway";
    }

    @GetMapping("info")
    public String getInfo() {
        return "hai, this is information";
    }
}
