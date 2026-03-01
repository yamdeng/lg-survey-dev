package com.lgsurvey.DevGuide.controller;

import com.lgsurvey.DevGuide.dto.CommonUserDto;
import com.lgsurvey.DevGuide.service.CommonUserService;
import com.lgsurvey.DevGuide.utils.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "사용자관리", description = "사용자관리 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class CommonUserController {

  private final CommonUserService commonUserService;

  @Operation(summary = "사용자 목록 조회", description = "사용자 목록 조회 API")
  @GetMapping("/user")
  public ResponseEntity<?> selectUserList(
      @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
      @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize,
      @ModelAttribute CommonUserDto paramDto) {

    List<CommonUserDto> pageList = commonUserService.selectUserList(paramDto);

    return ResponseUtil.createSuccessResponse(pageList);
  }

  @Operation(summary = "사용자 상세 조회", description = "사용자 상세 조회 API")
  @GetMapping("/user/{userKey}")
  public ResponseEntity<?> selectUserDetail(
      @PathVariable(value = "userKey", required = true) String userKey) {

    CommonUserDto result = commonUserService.selectUserDetail(userKey);
    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "사용자 등록", description = "사용자 등록 API")
  @PostMapping(value = "/user")
  public ResponseEntity<?> createUser(@Valid @RequestBody CommonUserDto reqDto) {

    CommonUserDto result = commonUserService.createUser(reqDto);
    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "사용자 수정", description = "사용자 수정 API")
  @PutMapping(value = "/user/{userKey}")
  public ResponseEntity<?> updateUser(
      @PathVariable(value = "userKey", required = true) String userKey,
      @Valid @RequestBody CommonUserDto reqDto) {

    reqDto.setUserKey(userKey);
    commonUserService.updateUser(reqDto);
    return ResponseUtil.createSuccessResponse();
  }

  @Operation(summary = "사용자 삭제", description = "사용자 삭제 API")
  @DeleteMapping(value = "/user/{userKey}")
  public ResponseEntity<?> deleteUser(
      @PathVariable(value = "userKey", required = true) String userKey) {

    commonUserService.deleteUser(userKey);
    return ResponseUtil.createSuccessResponse();
  }
}
