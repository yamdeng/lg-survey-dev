package com.lgsurvey.DevGuide.controller;

import com.lgsurvey.DevGuide.constants.CommonConstants;
import com.lgsurvey.DevGuide.utils.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonErrorLogDto;
import com.lgsurvey.DevGuide.service.CommonErrorLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "에러로그관리", description = "에러로그관리 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class CommonErrorLogController {

  private final CommonErrorLogService commonErrorLogService;

  @Operation(summary = "에러 로그 목록 조회", description = "에러 로그 목록 조회 API")
  @GetMapping("/error-log")
  public ResponseEntity<?> selectErrorLogList(
      @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
      @RequestParam(value = "pageSize", required = false, defaultValue = "50") int pageSize,
      @ModelAttribute CommonErrorLogDto paramDto) {

    return ResponseUtil.createSuccessResponse(commonErrorLogService.selectErrorLogList(paramDto));
  }

  @Operation(summary = "에러 로그 상세 조회", description = "에러 로그 상세 조회 API")
  @GetMapping("/error-log/{logKey}")
  public ResponseEntity<?> selectErrorLogDetail(
      @PathVariable(value = "logKey", required = true) String logKey) {

    CommonErrorLogDto result = commonErrorLogService.selectErrorLogDetail(logKey);
    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "에러 로그 등록", description = "에러 로그 등록 API (시스템 내부용)")
  @PostMapping(value = "/error-log")
  public ResponseEntity<?> insertErrorLog(
      @Valid @RequestBody CommonErrorLogDto reqDto) {

    reqDto.setLogKindCode(CommonConstants.LOG_TYPE_FRONT);
    commonErrorLogService.insertErrorLog(reqDto);
    return ResponseUtil.createSuccessResponse();
  }

  @Operation(summary = "에러 로그 삭제", description = "에러 로그 삭제 API")
  @DeleteMapping(value = "/error-log/{logKey}")
  public ResponseEntity<?> deleteErrorLog(
      @PathVariable(value = "logKey", required = true) String logKey) {

    commonErrorLogService.deleteErrorLog(logKey);
    return ResponseUtil.createSuccessResponse();
  }
}
