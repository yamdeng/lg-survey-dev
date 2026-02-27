package com.lgsurvey.DevGuide.controller;

import com.lgsurvey.DevGuide.dto.NoticeBoardDto;
import com.lgsurvey.DevGuide.dto.response.NoticeBoardResponseDto;
import com.lgsurvey.DevGuide.service.NoticeBoardService;
import com.lgsurvey.DevGuide.utils.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "공지사항관리", description = "공지사항관리 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class NoticeBoardController {

  private final NoticeBoardService noticeBoardService;

  /*
   * 공지사항 목록 조회
   */
  @Operation(summary = "공지사항 목록 조회", description = "공지사항 목록 조회 API (검색 및 페이징)")
  @GetMapping("/notices")
  public ResponseEntity<?> selectNoticeList(
      @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
      @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize,
      @ModelAttribute NoticeBoardDto paramDto) {

    List<NoticeBoardResponseDto> result = noticeBoardService.selectNoticeList(paramDto);

    return ResponseUtil.createSuccessResponse(result);
  }

  /*
   * 공지사항 상세 조회
   */
  @Operation(summary = "공지사항 상세 조회", description = "공지사항 상세 조회 API")
  @GetMapping("/notices/{boardKey}")
  public ResponseEntity<?> selectNoticeDetail(
          @PathVariable(required = true) String boardKey) {

    NoticeBoardDto result = noticeBoardService.selectNoticeDetail(boardKey);
    return ResponseUtil.createSuccessResponse(result);
  }

  /*
   * 공지사항 등록
   */
  @Operation(summary = "공지사항 등록", description = "공지사항 등록 API")
  @PostMapping(value = "/notices")
  public ResponseEntity<?> createNotice(
      @Valid @RequestBody NoticeBoardDto reqDto) {

    NoticeBoardDto result = noticeBoardService.createNotice(reqDto);
    return ResponseUtil.createSuccessResponse(result);
  }

  /*
   * 공지사항 수정
   */
  @Operation(summary = "공지사항 수정", description = "공지사항 수정 API")
  @PutMapping(value = "/notices/{boardKey}")
  public ResponseEntity<?> updateNotice(
      @Valid @RequestBody NoticeBoardDto reqDto,
      @PathVariable(value = "boardKey", required = true) String boardKey) {

    reqDto.setBoardKey(boardKey);
    noticeBoardService.updateNotice(reqDto);
    return ResponseUtil.createSuccessResponse();
  }

  /*
   * 공지사항 삭제
   */
  @Operation(summary = "공지사항 삭제", description = "공지사항 삭제 API")
  @DeleteMapping(value = "/notices/{boardKey}")
  public ResponseEntity<?> deleteNotice(
      @PathVariable(value = "boardKey", required = true) String boardKey) {

    noticeBoardService.deleteNotice(boardKey);
    return ResponseUtil.createSuccessResponse();
  }
}
