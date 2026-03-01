package com.lgsurvey.DevGuide.controller;

import com.lgsurvey.DevGuide.dto.CommonGroupCodeDto;
import com.lgsurvey.DevGuide.service.CommonGroupCodeService;
import com.lgsurvey.DevGuide.utils.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "코드그룹 관리", description = "코드그룹 관리 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1")
public class CommonGroupCodeController {

    private final CommonGroupCodeService commonGroupCodeService;

    @Operation(summary = "코드그룹 목록 조회", description = "코드그룹 목록 조회 API")
    @GetMapping("/common/group-codes")
    public ResponseEntity<?> selectGroupCodeList(
            @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "1000") int pageSize,
            @ModelAttribute CommonGroupCodeDto paramDto) {

        return ResponseUtil.createSuccessResponse(commonGroupCodeService.selectGroupCodeList(paramDto));
    }

    @Operation(summary = "코드그룹 상세 조회", description = "코드그룹 상세 조회 API")
    @GetMapping("/common/group-codes/{groupCode}")
    public ResponseEntity<?> selectCodeGroupDetail(
            @PathVariable(value = "groupCode", required = true) String groupCode) {

        CommonGroupCodeDto result = commonGroupCodeService.selectGroupCode(groupCode);
        return ResponseUtil.createSuccessResponse(result);
    }

    @Operation(summary = "코드그룹 등록", description = "코드그룹 등록 API")
    @PostMapping(value = "/common/group-codes")
    public ResponseEntity<?> createCodeGroup(
            @Valid @RequestBody CommonGroupCodeDto reqDto) {

        CommonGroupCodeDto result = commonGroupCodeService.createGroupCode(reqDto);
        return ResponseUtil.createSuccessResponse(result);
    }

    @Operation(summary = "코드그룹 수정", description = "코드그룹 수정 API")
    @PutMapping(value = "/common/group-codes/{groupCode}")
    public ResponseEntity<?> updateGroupCode(
            @Valid @RequestBody CommonGroupCodeDto reqDto) {

        commonGroupCodeService.updateGroupCode(reqDto);
        return ResponseUtil.createSuccessResponse();
    }

    @Operation(summary = "코드그룹 삭제", description = "코드그룹 삭제 API")
    @DeleteMapping(value = "/common/group-codes/{groupCode}")
    public ResponseEntity<?> deleteGroupCode(
            @PathVariable(value = "groupCode", required = true) String groupCode) {

        commonGroupCodeService.deleteGroupCode(groupCode);
        return ResponseUtil.createSuccessResponse();
    }
}