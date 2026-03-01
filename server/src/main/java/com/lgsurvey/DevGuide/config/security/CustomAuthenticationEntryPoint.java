package com.lgsurvey.DevGuide.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lgsurvey.DevGuide.dto.ErrorResponseDto;
import com.lgsurvey.DevGuide.utils.CommonUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j(topic = "UNAUTHORIZATION_EXCEPTION_HANDLER")
@RequiredArgsConstructor
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

  private final ObjectMapper objectMapper;

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
                       AuthenticationException authException) throws IOException {

    // 필터에서 설정한 에러 코드 가져오기
    String exception = "";

    if(CommonUtil.isNotEmpty(request.getAttribute("exception"))) {
      exception = (String) request.getAttribute("exception");
    }

    String errorCode = "UNAUTHORIZED"; // 기본값
    String message = "인증에 실패하였습니다.";

    if ("TOKEN_EXPIRED".equals(exception)) {
      errorCode = "TOKEN_EXPIRED";
      message = "토큰이 만료되었습니다.";
    } else if ("INVALID_TOKEN".equals(exception)) {
      errorCode = "INVALID_TOKEN";
      message = "유효하지 않은 토큰입니다.";
    }

    // 공통 포맷으로 응답 생성
    ErrorResponseDto errorResponse = new ErrorResponseDto(
            errorCode,
            message
    );

    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.setCharacterEncoding("UTF-8");
    response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
  }
}

