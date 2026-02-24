package com.lgsurvey.DevGuide.controller;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.*;
import com.lgsurvey.DevGuide.dto.response.CommonCodeResponseDto;
import com.lgsurvey.DevGuide.service.CommonCodeService;
import com.lgsurvey.DevGuide.service.CommonService;
import com.lgsurvey.DevGuide.service.CommonUserService;
import com.lgsurvey.DevGuide.utils.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class CommonController {

  private final CommonCodeService commonCodeService;

  private final CommonUserService commonUserService;

  private final ModelMapper modelMapper;

  private final CommonService commonService;

  @GetMapping("/initData")
  public ResponseEntity<?> getInitData() {

    PageInfo<CommonCodeDto> pageList = commonCodeService.selectCommonCodeList(new CommonCodeDto());

    List<CommonCodeDto> list = pageList.getList();

    List<CommonCodeResponseDto> commonCodeResponseDtoList = new ArrayList<>();

    list.forEach(commonCodeDto -> {
      CommonCodeResponseDto commonCodeResponseDto = modelMapper.map(commonCodeDto, CommonCodeResponseDto.class);
      commonCodeResponseDto.setCdGrp(commonCodeDto.getGroupCode());
      commonCodeResponseDto.setCd(commonCodeDto.getCode());
      commonCodeResponseDto.setCdNm(commonCodeDto.getCodeName());
      commonCodeResponseDto.setCdDesc(commonCodeDto.getDescription());
      commonCodeResponseDto.setSortOrd(commonCodeDto.getSortIndex());
      commonCodeResponseDtoList.add(commonCodeResponseDto);
    });

    CommonInitDataDto commonInitDataDto = new CommonInitDataDto();
    commonInitDataDto.setCodes(commonCodeResponseDtoList);

    return ResponseUtil.createSuccessResponse(commonInitDataDto);
  }

  @PostMapping("/auth/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginDto req) {

    return ResponseUtil.createSuccessResponse(commonService.login(req));
  }

  @GetMapping("/auth/logout")
  public ResponseEntity<?> logout(HttpServletRequest request) {
    // 세션 정보나 토큰 정보를 바탕으로 로그아웃 처리
    commonService.logout(request);
    return ResponseUtil.createSuccessResponse("Logout Success");
  }

  @GetMapping("/profile")
  public ResponseEntity<?> getProfile() {

    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    String userKey = auth.getName();
    CommonUserDto userInfo = commonUserService.selectUserDetail(userKey);

    return ResponseUtil.createSuccessResponse(userInfo);
  }

  @PostMapping("/auth/refresh")
  public ResponseEntity<?> refreshToken(@RequestBody TokenRequestDto tokenRequest) {
    log.info("Token Refresh Request: {}", tokenRequest.getRefreshToken());

    // Service 호출하여 토큰 재발급 수행
    Map<String, Object> tokenMap = commonService.refreshAccessToken(tokenRequest.getRefreshToken());

    // 응답 스펙에 맞게 데이터 구성
    Map<String, Object> response = new HashMap<>();
    response.put("accessToken", tokenMap.get("accessToken"));
    response.put("refreshToken", tokenMap.get("refreshToken"));
    response.put("tokenType", "Bearer");

    return ResponseUtil.createSuccessResponse(response);
  }


}
