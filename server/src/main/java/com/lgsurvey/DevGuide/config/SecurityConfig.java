package com.lgsurvey.DevGuide.config;

import com.lgsurvey.DevGuide.config.security.CustomAccessDeniedHandler;
import com.lgsurvey.DevGuide.config.security.CustomAuthenticationEntryPoint;
import com.lgsurvey.DevGuide.interceptor.JwtAuthFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.lgsurvey.DevGuide.constants.CommonConstants.AUTH_WHITELIST;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {

  private final CustomAccessDeniedHandler accessDeniedHandler;
  private final CustomAuthenticationEntryPoint authenticationEntryPoint;
  private final JwtAuthFilter jwtAuthFilter;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // CSRF, CORS
    http.csrf((csrf) -> csrf.disable());
    http.cors(Customizer.withDefaults());

    http.headers(headers -> headers
        .frameOptions(frame -> frame.sameOrigin()) // H2 콘솔의 iframe 허용
    );

    // FormLogin, BasicHttp 비활성화
    http.formLogin((form) -> form.disable());
    http.httpBasic(HttpBasicConfigurer::disable);

    // 401, 403 커스텀 매핑
    http.exceptionHandling(
        (exceptionHandling) -> exceptionHandling.authenticationEntryPoint(authenticationEntryPoint)
            .accessDeniedHandler(accessDeniedHandler));

    // 권한 규칙 작성
    http.authorizeHttpRequests(authorize -> authorize.requestMatchers(AUTH_WHITELIST).permitAll()
        .requestMatchers("/aaa/api/**").authenticated().anyRequest().permitAll());

    http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

}
