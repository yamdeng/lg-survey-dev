package com.lgsurvey.DevGuide.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class BasicAuthInterceptor implements CommonAuthInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
      Object handler) {

    if (!isExclusion(request)) {
      log.info("Pre Handle : {}", request.getRequestURI());
    }

    return true;
  }

  @Override
  public boolean isExclusion(HttpServletRequest request) {
    String contextPath = request.getContextPath();
    String requestUri = request.getRequestURI();

    // contextPath 제외한 실제 uri만 추출
    String path = requestUri.substring(contextPath.length());

    if (request.getMethod().equals(HttpMethod.OPTIONS.name())) {
      return true;
    }

    if (path.startsWith("/api")) {
      return false;
    }

    return true;
  }

}
