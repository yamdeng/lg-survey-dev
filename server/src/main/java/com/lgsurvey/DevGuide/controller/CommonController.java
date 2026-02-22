package com.lgsurvey.DevGuide.controller;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonCodeDto;
import com.lgsurvey.DevGuide.dto.CommonInitDataDto;
import com.lgsurvey.DevGuide.dto.response.CommonCodeResponseDto;
import com.lgsurvey.DevGuide.service.CommonCodeService;
import com.lgsurvey.DevGuide.utils.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class CommonController {

  private final CommonCodeService commonCodeService;

  private final ModelMapper modelMapper;

  // api/v1/profile
  // api/v1/auth/login
  // api/v1/auth/refresh
  // api/v1/test/file-upload1, api/v1/test/file-upload2
  // api/v1/error/auth, api/v1/error/notfound, api/v1/error/not-forbidden, api/v1/error/server-error

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


}
