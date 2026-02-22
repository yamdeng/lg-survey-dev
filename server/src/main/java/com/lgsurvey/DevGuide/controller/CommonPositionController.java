package com.lgsurvey.DevGuide.controller;

import com.lgsurvey.DevGuide.utils.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonPositionDto;
import com.lgsurvey.DevGuide.service.CommonPositionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "직위관리", description = "직위관리 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class CommonPositionController {

  private final CommonPositionService commonPositionService;

  @Operation(summary = "직위 목록 조회", description = "직위 목록 조회 API")
  @GetMapping("/position")
  public ResponseEntity<?> selectPositionList(
      @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
      @RequestParam(value = "pageSize", required = false, defaultValue = "1000") int pageSize,
      @ModelAttribute CommonPositionDto paramDto) {

    PageHelper.startPage(pageNum, pageSize);
    PageInfo<CommonPositionDto> pageList = commonPositionService.selectPositionList(paramDto);

    return ResponseUtil.createSuccessResponse(pageList);
  }

  @Operation(summary = "직위 상세 조회", description = "직위 상세 조회 API")
  @GetMapping("/position/{positionKey}")
  public ResponseEntity<?> selectPositionDetail(
      @PathVariable(value = "positionKey", required = true) String positionKey) {

    CommonPositionDto result = commonPositionService.selectPositionDetail(positionKey);
    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "직위 등록", description = "직위 등록 API")
  @PostMapping(value = "/position")
  public ResponseEntity<?> createPosition(
      @Valid @RequestBody CommonPositionDto reqDto) {

    CommonPositionDto result = commonPositionService.createPosition(reqDto);
    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "직위 수정", description = "직위 수정 API")
  @PutMapping(value = "/position")
  public ResponseEntity<?> updatePosition(
      @Valid @RequestBody CommonPositionDto reqDto) {

    commonPositionService.updatePosition(reqDto);
    return ResponseUtil.createSuccessResponse();
  }

  @Operation(summary = "직위 삭제", description = "직위 삭제 API")
  @DeleteMapping(value = "/position/{positionKey}")
  public ResponseEntity<?> deletePosition(
      @PathVariable(value = "positionKey", required = true) String positionKey) {

    commonPositionService.deletePosition(positionKey);
    return ResponseUtil.createSuccessResponse();
  }
}
