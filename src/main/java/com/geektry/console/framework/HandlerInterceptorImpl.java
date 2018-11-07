package com.geektry.console.framework;

import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Chaohang Fu
 */
@Component
public class HandlerInterceptorImpl implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        HandlerMethod handlerMethod = (HandlerMethod) handler;

        boolean isMethodBeanAnnotated = handlerMethod.getBeanType().isAnnotationPresent(TokenRequired.class);
        boolean isMethodAnnotated = handlerMethod.getMethod().isAnnotationPresent(TokenRequired.class);
        if (!isMethodBeanAnnotated && !isMethodAnnotated) {
            return true;
        }

        boolean isTokenValid = this.isTokenValid(request.getCookies());
        if (isTokenValid) {
            return true;
        }

        boolean isReturnTypeModelAndView = handlerMethod.getMethod().getReturnType().equals(ModelAndView.class);
        if (isReturnTypeModelAndView) {
            response.sendRedirect("/login");
            return false;
        }

        throw new ServiceRuntimeException(RuntimeExceptionMessage.SESSION_EXPIRED);
    }

    private boolean isTokenValid(Cookie[] cookies) {

        if (cookies == null) {
            return false;
        }

        for (Cookie cookie : cookies) {
            if ("token".equals(cookie.getName())) {
                return true;
            }
        }

        return false;
    }
}
