package com.geektry.console.controller;

import com.geektry.console.framework.RuntimeExceptionMessage;
import com.geektry.console.framework.ServiceRuntimeException;
import com.geektry.console.framework.TokenRequired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * @author Chaohang Fu
 */
@RestController
public class IndexController {

    @GetMapping("/login")
    public ModelAndView viewLogin() {
        return new ModelAndView("login");
    }

    @PostMapping("/login")
    public void login(HttpServletResponse response,
                      @RequestBody Map<String, String> map) {

        if (!"z".equals(map.get("password"))) {
            throw new ServiceRuntimeException(RuntimeExceptionMessage.PASSWORD_INVALID);
        }
        response.addCookie(new Cookie("token", "token"));
    }

    @TokenRequired
    @GetMapping("")
    public ModelAndView viewIndex() {
        return new ModelAndView("index");
    }
}
