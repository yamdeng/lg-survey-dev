package com.lgsurvey.DevGuide.service;

import com.lgsurvey.DevGuide.dto.CommonGroupCodeDto;

import java.util.List;

/**
 * 공통 그룹 코드 관리 서비스 인터페이스
 */
public interface CommonGroupCodeService {

  /**
   * 그룹 코드 상세 조회
   * @param groupCode 그룹 코드
   * @return 그룹 코드 상세 정보
   */
  CommonGroupCodeDto selectGroupCode(String groupCode);

  /**
   * 그룹 코드 목록 조회 (페이징 포함)
   * @param paramDto 검색 조건 및 페이징 파라미터
   * @return 페이징 처리된 그룹 코드 목록
   */
  List<CommonGroupCodeDto> selectGroupCodeList(CommonGroupCodeDto paramDto);

  /**
   * 그룹 코드 생성
   * @param dto 등록 정보
   * @return 등록된 그룹 코드 상세 정보
   */
  CommonGroupCodeDto createGroupCode(CommonGroupCodeDto dto);

  /**
   * 그룹 코드 수정
   * @param dto 수정 정보
   */
  void updateGroupCode(CommonGroupCodeDto dto);

  /**
   * 그룹 코드 삭제
   * @param groupCode 그룹 코드
   */
  void deleteGroupCode(String groupCode);
}
