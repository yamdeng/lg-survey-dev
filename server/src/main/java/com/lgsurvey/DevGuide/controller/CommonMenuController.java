package com.lgsurvey.DevGuide.controller;

import com.lgsurvey.DevGuide.utils.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonMenuDto;
import com.lgsurvey.DevGuide.service.CommonMenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "메뉴관리", description = "메뉴관리 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class CommonMenuController {

  private final CommonMenuService commonMenuService;

  @Operation(summary = "메뉴 목록 조회", description = "메뉴 목록 조회 API")
  @GetMapping("/menu")
  public ResponseEntity<?> selectMenuList(
      @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
      @RequestParam(value = "pageSize", required = false, defaultValue = "1000") int pageSize,
      @ModelAttribute CommonMenuDto paramDto) {

    PageHelper.startPage(pageNum, pageSize);
    PageInfo<CommonMenuDto> pageList = commonMenuService.selectMenuList(paramDto);

    return ResponseUtil.createSuccessResponse(pageList);
  }

  @Operation(summary = "메뉴 상세 조회", description = "메뉴 상세 조회 API")
  @GetMapping("/menu/{menuKey}")
  public ResponseEntity<?> selectMenuDetail(
      @PathVariable(value = "menuKey", required = true) String menuKey) {

    CommonMenuDto result = commonMenuService.selectMenuDetail(menuKey);
    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "메뉴 등록", description = "메뉴 등록 API")
  @PostMapping(value = "/menu")
  public ResponseEntity<?> createMenu(
      @Valid @RequestBody CommonMenuDto reqDto) {

    CommonMenuDto result = commonMenuService.createMenu(reqDto);
    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "메뉴 수정", description = "메뉴 수정 API")
  @PutMapping(value = "/menu")
  public ResponseEntity<?> updateMenu(
      @Valid @RequestBody CommonMenuDto reqDto) {

    commonMenuService.updateMenu(reqDto);
    return ResponseUtil.createSuccessResponse();
  }

  @Operation(summary = "메뉴 삭제", description = "메뉴 삭제 API")
  @DeleteMapping(value = "/menu/{menuKey}")
  public ResponseEntity<?> deleteMenu(
      @PathVariable(value = "menuKey", required = true) String menuKey) {

    commonMenuService.deleteMenu(menuKey);
    return ResponseUtil.createSuccessResponse();
  }
}
