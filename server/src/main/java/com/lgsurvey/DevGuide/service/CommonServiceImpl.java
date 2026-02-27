package com.lgsurvey.DevGuide.service;

import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.constants.StatusCodeConstants;
import com.lgsurvey.DevGuide.dto.CommonUserDto;
import com.lgsurvey.DevGuide.dto.LoginDto;
import com.lgsurvey.DevGuide.dto.SessionDto;
import com.lgsurvey.DevGuide.exception.CustomBusinessException;
import com.lgsurvey.DevGuide.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CommonServiceImpl extends AbstractCommonDaoService implements CommonService {

    private final JwtUtil jwtUtil;

    private final PasswordEncoder passwordEncoder;

    private final ModelMapper modelMapper;

    @Override
    public Map<String, Object> login(LoginDto loginDto) {
        String userId = loginDto.getUserId();
        CommonUserDto userInfo = commonSqlDao.selectOne("CommonUser.selectDetailByUserId", userId);
        String userPass = userInfo.getUserPassword();
        boolean matchPassword = passwordEncoder.matches(loginDto.getPassword(), userPass);
        if (!matchPassword) {
            throw new CustomBusinessException("password not match", "login fail");
        }


        SessionDto sessionDto = modelMapper.map(userInfo, SessionDto.class);

        String accessToken = jwtUtil.createAccessToken(sessionDto);
        String refreshToken = jwtUtil.createRefreshToken(sessionDto);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("accessToken", accessToken);
        resultMap.put("refreshToken", refreshToken);

        return resultMap;
    }

    @Override
    public void logout(HttpServletRequest request) {
        // 1. 헤더에서 토큰 추출 (JwtUtil 활용)
        // 2. Refresh Token이 DB나 Redis에 저장되어 있다면 삭제 로직 수행
        // 예: commonSqlDao.update("CommonUser.deleteRefreshToken", userId);

        // 3. SecurityContext 초기화
        SecurityContextHolder.clearContext();
    }

    @Override
    public Map<String, Object> refreshAccessToken(String refreshToken) {
        // 1. Refresh Token 유효성 검증 (만료 여부 및 조작 여부)
        // HttpServletRequest가 필요한 구조라면 여기서 null을 넘기거나
        // 유효성 체크를 위한 단순 오버로딩 메서드를 사용하세요.
        if (refreshToken == null || !jwtUtil.validateToken(refreshToken)) {
            throw new CustomBusinessException(StatusCodeConstants.SESSION_EXPIRE, "리프레시 토큰이 만료되었거나 유효하지 않습니다.");
        }

        // 2. Token에서 세션 정보 추출
        SessionDto sessionDto = jwtUtil.getSessionDtoByAccessToken(refreshToken);
        if (sessionDto == null) {
            throw new CustomBusinessException("USER_NOT_FOUND", "사용자 정보를 확인할 수 없습니다.");
        }

        // 3. 새로운 토큰 쌍 생성
        String newAccessToken = jwtUtil.createAccessToken(sessionDto);
        String newRefreshToken = jwtUtil.createRefreshToken(sessionDto); // RTR 방식: 리프레시 토큰도 갱신

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("accessToken", newAccessToken);
        resultMap.put("refreshToken", newRefreshToken);

        return resultMap;
    }


}
