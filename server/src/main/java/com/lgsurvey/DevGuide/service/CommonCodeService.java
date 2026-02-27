package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonCodeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 공통 코드 서비스 인터페이스
 */
public interface CommonCodeService {

  /**
   * 공통 코드 상세 조회 (복합키)
   */
  CommonCodeDto selectCommonCode(String groupCode, String code);

  /**
   * 공통 코드 목록 조회 (페이징)
   */
  PageInfo<CommonCodeDto> selectCommonCodeList(CommonCodeDto paramDto);

  /**
   * 공통 코드 목록 조회 (페이징) : spring-data 구조
   */
  PageInfo<CommonCodeDto> selectCommonCodeList(Pageable pageable, CommonCodeDto paramDto);

  Page<CommonCodeDto> selectCommonCodeList2(Pageable pageable, CommonCodeDto paramDto);

  /**
   * 특정 그룹에 속한 코드 리스트 조회
   */
  List<CommonCodeDto> selectCommonCodeListByGroupCode(String groupCode);

  /**
   * 공통 코드 생성
   */
  CommonCodeDto createCommonCode(CommonCodeDto dto);

  /**
   * 공통 코드 수정
   */
  void updateCommonCode(CommonCodeDto dto);

  /**
   * 공통 코드 삭제
   */
  void deleteCommonCode(String groupCode, String code);

  /**
   * 캐시 적용 코드 목록 (사용 중인 코드 전체)
   */
  List<CommonCodeDto> cacheCodeAllList();
}
