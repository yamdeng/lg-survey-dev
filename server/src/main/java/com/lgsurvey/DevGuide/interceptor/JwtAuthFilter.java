package com.lgsurvey.DevGuide.interceptor;

import com.lgsurvey.DevGuide.dto.SessionDto;
import com.lgsurvey.DevGuide.utils.CommonConfig;
import com.lgsurvey.DevGuide.utils.CommonUtil;
import com.lgsurvey.DevGuide.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;

  @Value("${spring.profiles.active:dev}")
  private String activeProfile;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String authorizationHeader = request.getHeader(CommonConfig.authHeaderKey);
    String token = authorizationHeader;
    String getParameterToken = request.getParameter(CommonConfig.authHeaderKey);
    if (CommonUtil.isEmpty(token)) {
      token = getParameterToken;
    }

    // JWT가 헤더에 있는 경우
    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      token = authorizationHeader.substring(7);
    }

    if (token != null && !"".equals(token)) {

      // JWT 유효성 검증
      if (jwtUtil.validateToken(token)) {

        // TODO : redis, db에서 조회할지 체크 필요
        SessionDto sessionDto = jwtUtil.getSessionDtoByAccessToken(token);

        if (sessionDto != null) {

          UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
              new UsernamePasswordAuthenticationToken(sessionDto, null,
                  sessionDto.getAuthorities());

          // 현재 Request의 Security Context에 접근권한 설정
          SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }
      }
    }

    filterChain.doFilter(request, response); // 다음 필터로 넘기기

  }

}

