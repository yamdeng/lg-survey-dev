package com.lgsurvey.DevGuide.utils;

import com.lgsurvey.DevGuide.dto.SessionDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SessionUtil {

  public static SessionDto getSessionDto() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof SessionDto) {
      return (SessionDto) authentication.getPrincipal();
    }
    return null;
  }

  public static String getSessionUserKey() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.isAuthenticated()) {
      return authentication.getName();
    }
    return null;
  }

}

