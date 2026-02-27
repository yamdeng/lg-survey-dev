package com.lgsurvey.DevGuide.controller;

import com.lgsurvey.DevGuide.constants.StatusCodeConstants;
import com.lgsurvey.DevGuide.dto.TestDto;
import com.lgsurvey.DevGuide.exception.CustomBusinessException;
import com.lgsurvey.DevGuide.utils.DataUtil;
import com.lgsurvey.DevGuide.utils.ResponseUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class TestController {

  @GetMapping("/health")
  public ResponseEntity<String> health() {
    return ResponseUtil.createSuccessResponse("hello");
  }

  @GetMapping("/simpleMap1")
  public ResponseEntity<Map<String, String>> simpleMap1() {
    return ResponseUtil.createSuccessResponse(
        Map.of("test1", "111", "test2", "222", "test3", "333"));
  }

  @GetMapping("/simpleMap2")
  public ResponseEntity<Map<String, TestDto>> simpleMap2() {
    return ResponseUtil.createSuccessResponse(
        Map.of("test1", DataUtil.getTestDtoInfo(), "test2", DataUtil.getTestDtoInfo(), "test3",
            DataUtil.getTestDtoInfo()));
  }

  @GetMapping("/simpleDto")
  public ResponseEntity<TestDto> simpleDto() {
    return ResponseUtil.createSuccessResponse(DataUtil.getTestDtoInfo());
  }

  @GetMapping("/simpleListDto")
  public ResponseEntity<List<TestDto>> simpleListDto() {
    return ResponseUtil.createSuccessResponse(DataUtil.getTestDtoList());
  }

  @GetMapping("/pagedListDto")
  public ResponseEntity<List<TestDto>> pagedListDto(
      @RequestParam(name = "currentPage", defaultValue = "1") int currentPage,
      @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
    log.info("페이징 요청: currentPage={}, pageSize={}", currentPage, pageSize);

    // DataUtil에서 페이징된 리스트를 가져옴
    List<TestDto> pagedList = DataUtil.getPagedList(currentPage, pageSize);

    return ResponseUtil.createSuccessResponse(pagedList);
  }

  @GetMapping("/error/403")
  public ResponseEntity<List<TestDto>> forbiddenError() {
    if (true) {
      throw new CustomBusinessException("권한없음", StatusCodeConstants.FORBIDDEN);
    }

    return ResponseUtil.createSuccessResponse();
  }

  @GetMapping("/error/401")
  public ResponseEntity<List<TestDto>> unauthorizedError() {
    if (true) {
      throw new CustomBusinessException("인증없음", StatusCodeConstants.SESSION_EXPIRE);
    }

    return ResponseUtil.createSuccessResponse();
  }

  @PostMapping("/error/400")
  public ResponseEntity<List<TestDto>> badRequestError(@Valid @RequestBody TestDto reqDto) {
    return ResponseUtil.createSuccessResponse();
  }

  @GetMapping("/error/etc")
  public ResponseEntity<List<TestDto>> etcError() throws Exception {

    if (true) {
      throw new Exception("aaaa");
    }

    return ResponseUtil.createSuccessResponse();
  }

}
