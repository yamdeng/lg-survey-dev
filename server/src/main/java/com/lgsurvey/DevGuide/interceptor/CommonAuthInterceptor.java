package com.lgsurvey.DevGuide.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

public interface CommonAuthInterceptor extends HandlerInterceptor {

  default boolean isExclusion(HttpServletRequest request) {
    if (request.getMethod().equals(HttpMethod.OPTIONS.name())) {
      return true;
    }
    return false;
  }

}
