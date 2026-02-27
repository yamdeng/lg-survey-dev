package com.lgsurvey.DevGuide.service;

import com.lgsurvey.DevGuide.dto.LoginDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface CommonService {

    Map<String, Object> login(LoginDto loginDto);

    void logout(HttpServletRequest request);

    Map<String, Object> refreshAccessToken(String refreshToken);

}
