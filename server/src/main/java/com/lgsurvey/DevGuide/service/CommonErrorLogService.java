package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonErrorLogDto;

/**
 * 에러 로그 관리 서비스 인터페이스
 */
public interface CommonErrorLogService {

  /**
   * 에러 로그 상세 조회
   * @param logKey 로그 키
   * @return 에러 로그 상세 정보
   */
  CommonErrorLogDto selectErrorLogDetail(String logKey);

  /**
   * 에러 로그 목록 조회 (최신순)
   * @param paramDto 검색 조건 및 페이징 파라미터
   * @return 페이징 처리된 에러 로그 목록
   */
  PageInfo<CommonErrorLogDto> selectErrorLogList(CommonErrorLogDto paramDto);

  /**
   * 에러 로그 등록 (로그 기록)
   * @param dto 로그 정보
   */
  void insertErrorLog(CommonErrorLogDto dto);

  /**
   * 에러 로그 삭제 (오래된 로그 정리용)
   * @param logKey 로그 키
   */
  void deleteErrorLog(String logKey);
}
