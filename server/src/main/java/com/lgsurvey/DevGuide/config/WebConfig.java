package com.lgsurvey.DevGuide.config;

import com.lgsurvey.DevGuide.interceptor.CommonAuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

  private final CommonAuthInterceptor commonAuthInterceptor;

  @Override
  public void addCorsMappings(CorsRegistry registry) {

    String[] allowedOrigins =
        {"http://localhost:9102", "http://localhost:9082", "http://localhost:8082", "http://localhost:8083",
            "http://localhost:3000", "http://localhost"};

    registry.addMapping("/**").allowedOriginPatterns(allowedOrigins)
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH").allowCredentials(true);
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {

    List<String> urlPatterns = Arrays.asList("/**");
    List<String> excludePatterns =
        Arrays.asList("/favicon.ico", "/swagger-ui/**", "/api-docs/**", "/swagger-ui.html",
            "/error", "/api/health");

    // 인증여부 검사
    registry.addInterceptor(commonAuthInterceptor).addPathPatterns(urlPatterns)
        .excludePathPatterns(excludePatterns);
  }

}
