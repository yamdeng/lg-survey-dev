package com.lgsurvey.DevGuide.controller;

import com.lgsurvey.DevGuide.utils.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonDeptDto;
import com.lgsurvey.DevGuide.service.CommonDeptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "부서관리", description = "부서관리 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class CommonDeptController {

  private final CommonDeptService commonDeptService;

  @Operation(summary = "부서 목록 조회", description = "부서 목록 조회 API")
  @GetMapping("/dept")
  public ResponseEntity<?> selectDeptList(
      @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
      @RequestParam(value = "pageSize", required = false, defaultValue = "1000") int pageSize,
      @ModelAttribute CommonDeptDto paramDto) {

    return ResponseUtil.createSuccessResponse(commonDeptService.selectDeptList(paramDto));
  }

  @Operation(summary = "부서 상세 조회", description = "부서 상세 조회 API")
  @GetMapping("/dept/{deptKey}")
  public ResponseEntity<?> selectDeptDetail(
      @PathVariable(value = "deptKey", required = true) String deptKey) {

    CommonDeptDto result = commonDeptService.selectDeptDetail(deptKey);
    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "부서 등록", description = "부서 등록 API")
  @PostMapping(value = "/dept")
  public ResponseEntity<?> createDept(@Valid @RequestBody CommonDeptDto reqDto) {

    CommonDeptDto result = commonDeptService.createDept(reqDto);
    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "부서 수정", description = "부서 수정 API")
  @PutMapping(value = "/dept/{deptKey}")
  public ResponseEntity<?> updateDept(
      @PathVariable(value = "deptKey", required = true) String deptKey,
      @Valid @RequestBody CommonDeptDto reqDto) {

    reqDto.setDeptKey(deptKey);
    commonDeptService.updateDept(reqDto);
    return ResponseUtil.createSuccessResponse();
  }

  @Operation(summary = "부서 삭제", description = "부서 삭제 API")
  @DeleteMapping(value = "/dept/{deptKey}")
  public ResponseEntity<?> deleteDept(
      @PathVariable(value = "deptKey", required = true) String deptKey) {

    commonDeptService.deleteDept(deptKey);
    return ResponseUtil.createSuccessResponse();
  }
}
