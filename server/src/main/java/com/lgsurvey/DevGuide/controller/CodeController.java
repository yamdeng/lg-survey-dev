package com.lgsurvey.DevGuide.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonCodeDto;
import com.lgsurvey.DevGuide.dto.response.CommonCodeResponseDto;
import com.lgsurvey.DevGuide.service.CommonCodeService;
import com.lgsurvey.DevGuide.utils.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class CodeController {

  private final CommonCodeService commonCodeService;

  private final ModelMapper modelMapper;

  /*
   *
   * 공통 코드 목록 조회 : selectCommonCodeList method : GET url : /common/code
   *
   */
  @Operation(summary = "공통 코드 목록 조회", description = "공통 코드 목록 조회 API")
  @GetMapping("/common/codes")
  public ResponseEntity<?> selectCommonCodeList(
      @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
      @RequestParam(value = "pageSize", required = false, defaultValue = "1000") int pageSize,
      @ModelAttribute CommonCodeDto paramDto) {

    // Page 조회
    PageHelper.startPage(pageNum, pageSize);
    PageInfo<CommonCodeDto> pageList = commonCodeService.selectCommonCodeList(paramDto);

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

    return ResponseUtil.createSuccessResponse(PageInfo.of(commonCodeResponseDtoList));
  }

  @Operation(summary = "공통 코드 목록 조회2", description = "공통 코드 목록 조회 API2")
  @GetMapping("/common/code2")
  public ResponseEntity<?> selectCommonCodeList(
      @PageableDefault(page = 1, size = 1000, sort = "regDate", direction = Sort.Direction.DESC)
      Pageable pageable,
      @ModelAttribute CommonCodeDto paramDto) {

    // 표준 Spec에서는 Pageable 객체 안에 page와 size 정보가 모두 포함되어 있습니다.
    PageInfo<CommonCodeDto> pageList = commonCodeService.selectCommonCodeList(pageable, paramDto);

    return ResponseUtil.createSuccessResponse(pageList);
  }

  @Operation(summary = "공통 코드 목록 조회3", description = "공통 코드 목록 조회 API3")
  @GetMapping("/common/code3")
  public ResponseEntity<?> selectCommonCodeList2(
      @PageableDefault(page = 0, size = 10) Pageable pageable, // Pageable은 0부터 시작이 표준입니다.
      @ModelAttribute CommonCodeDto paramDto) {

    Page<CommonCodeDto> page = commonCodeService.selectCommonCodeList2(pageable, paramDto);

    // Page 객체 자체를 반환하면 content, totalPages, totalElements 등이 포함된 표준 JSON이 나갑니다.
    return ResponseUtil.createSuccessResponse(page);
  }

  @Operation(summary = "공통 코드 목록 조회(groupCode 기준)", description = "공통 코드 목록 조회(groupCode 기준) API")
  @GetMapping("/common/codes/{groupCode}")
  public ResponseEntity<?> selectCommonCodeListByGroupCode(
      @PathVariable(value = "groupCode", required = true) String groupCode) {

    List<CommonCodeDto> list =
        commonCodeService.selectCommonCodeListByGroupCode(groupCode);

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

    return ResponseUtil.createSuccessResponse(commonCodeResponseDtoList);
  }


  /*
   *
   * 공통 코드 상세 조회 : selectCommonCode method : GET url : /common/code/{groupCode}/{id}
   *
   */
  @Operation(summary = "공통 코드 상세 조회", description = "공통 코드 상세 조회 API")
  @GetMapping("/common/code/{groupCode}/{id}")
  public ResponseEntity<?> selectCommonCode(
      @PathVariable(value = "groupCode", required = true) String groupCode,
      @PathVariable(value = "id", required = true) String id) {

    CommonCodeDto commonCodeDto = commonCodeService.selectCommonCode(groupCode, id);

    CommonCodeResponseDto result = modelMapper.map(commonCodeDto, CommonCodeResponseDto.class);
    result.setCdGrp(commonCodeDto.getGroupCode());
    result.setCd(commonCodeDto.getCode());
    result.setCdNm(commonCodeDto.getCodeName());
    result.setCdDesc(commonCodeDto.getDescription());
    result.setSortOrd(commonCodeDto.getSortIndex());

    return ResponseUtil.createSuccessResponse(result);
  }

  /*
   *
   * 공통 코드 등록 : createCommonCode method : POST url : /common/code
   *
   */
  @Operation(summary = "공통 코드 등록", description = "공통 코드 등록 API")
  @PostMapping(value = "/common/code/{groupCode}")
  public ResponseEntity<?> createCommonCode(
      @PathVariable(value = "groupCode", required = true) String groupCode,
      @Valid @RequestBody(required = true) CommonCodeDto reqDto) {

    reqDto.setGroupCode(groupCode);
    return ResponseUtil.createSuccessResponse(commonCodeService.createCommonCode(reqDto));
  }

  /*
   *
   * 공통 코드 수정 : updateCommonCode method : PUT url : /common/code/{groupCode}/{id}
   *
   */
  @Operation(summary = "공통 코드 수정", description = "공통 코드 수정 API")
  @PutMapping(value = "/common/code/{groupCode}/{id}")
  public ResponseEntity<?> updateCommonCode(
      @PathVariable(value = "groupCode", required = true) String groupCode,
      @PathVariable(value = "id", required = true) String id,
      @Valid @RequestBody(required = true) CommonCodeDto reqDto) {

    reqDto.setGroupCode(groupCode);
    commonCodeService.updateCommonCode(reqDto);

    return ResponseUtil.createSuccessResponse();
  }

  /*
   *
   * 공통 코드 삭제 : deleteCommonCode method : DELETE url : /common/code/{groupCode}/{id}
   *
   */
  @Operation(summary = "공통 코드 삭제", description = "공통 코드 삭제 API")
  @DeleteMapping(value = "/common/code/{groupCode}/{id}")
  public ResponseEntity<?> deleteCommonCode(
      @PathVariable(value = "groupCode", required = true) String groupCode,
      @PathVariable(value = "id", required = true) String id) {

    commonCodeService.deleteCommonCode(groupCode, id);

    return ResponseUtil.createSuccessResponse();
  }

}
