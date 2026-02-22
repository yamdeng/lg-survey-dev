package com.lgsurvey.DevGuide.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lgsurvey.DevGuide.dto.ErrorResponseDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j(topic = "UNAUTHORIZATION_EXCEPTION_HANDLER")
@RequiredArgsConstructor
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

  private final ObjectMapper objectMapper;

  @Value("${app.sso-url}")
  private String ssoUrl;

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException, ServletException {
    log.error("Not Authenticated Request", authException);

    ErrorResponseDto errorResponseDto =
        new ErrorResponseDto(HttpStatus.UNAUTHORIZED.value(), authException.getMessage(),
            LocalDateTime.now(), ssoUrl);

    String responseBody = objectMapper.writeValueAsString(errorResponseDto);
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.setCharacterEncoding("UTF-8");
    response.getWriter().write(responseBody);
  }
}

