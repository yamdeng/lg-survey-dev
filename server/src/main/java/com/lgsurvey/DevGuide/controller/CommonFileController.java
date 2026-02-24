package com.lgsurvey.DevGuide.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonFileDto;
import com.lgsurvey.DevGuide.service.CommonFileService;
import com.lgsurvey.DevGuide.utils.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Tag(name = "공통 파일", description = "공통 파일 API")
@Slf4j
@RestController
@RequestMapping(value = "/api/v1")
public class CommonFileController {

  @Autowired
  private CommonFileService commonFileService;

  @Operation(summary = "공통 파일 상세 조회", description = "공통 파일 상세 조회 API")
  @GetMapping("/common-file/{id}")
  public ResponseEntity<?> selectCommonFile(
      @PathVariable(value = "id", required = true) String id) {

    CommonFileDto result = commonFileService.selectFileDetail(id);

    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "공통 파일 목록 조회", description = "공통 파일 목록 조회 API")
  @GetMapping("/common-file")
  public ResponseEntity<?> selectCommonFileList(
      @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
      @RequestParam(value = "pageSize", required = false, defaultValue = "1000") int pageSize) {

    CommonFileDto paramDto = new CommonFileDto();

    return ResponseUtil.createSuccessResponse(commonFileService.selectFileList(paramDto));
  }

  @Operation(summary = "공통 파일 등록", description = "공통 파일 등록 API")
  @PostMapping(value = "/common-file")
  public ResponseEntity<?> createCommonFile(
      @Valid @RequestBody(required = true) CommonFileDto reqDto) {

    commonFileService.insertFile(reqDto);

    return ResponseUtil.createSuccessResponse();
  }

  @Operation(summary = "공통 파일 수정", description = "공통 파일 수정 API")
  @PutMapping(value = "/common-file/{id}")
  public ResponseEntity<?> updateCommonFile(@PathVariable(value = "id", required = true) String id,
      @Valid @RequestBody(required = true) CommonFileDto reqDto) {

    commonFileService.updateFile(reqDto);

    return ResponseUtil.createSuccessResponse();
  }

  @Operation(summary = "공통 파일 삭제", description = "공통 파일 삭제 API")
  @DeleteMapping(value = "/common-file/{id}")
  public ResponseEntity<?> deleteCommonFile(
      @PathVariable(value = "id", required = true) String id) {

    commonFileService.deleteFile(id);

    return ResponseUtil.createSuccessResponse();
  }

  @Operation(summary = "파일 업로드", description = "파일 업로드 API")
  @PostMapping(value = "/common-file/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> uploadFile(
      @RequestPart(value = "files", required = true) List<MultipartFile> files) {

    Map<String, Object> result = commonFileService.uploadFile(files);

    return ResponseUtil.createSuccessResponse(result);
  }

  @Operation(summary = "파일 다운로드", description = "파일 다운로드 API")
  @GetMapping(value = "/common-file/{fileKey}/download",
      produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
  public ResponseEntity<?> downloadFile(@PathVariable(value = "fileKey") String fileKey) {

    CommonFileDto dto = commonFileService.selectFileDetail(fileKey);

    return commonFileService.downloadFile(dto);
  }

}
