package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonUserDto;

/**
 * 사용자 관리 서비스 인터페이스
 */
public interface CommonUserService {

  /**
   * 사용자 상세 조회
   * @param userKey 사용자 키
   * @return 사용자 상세 정보
   */
  CommonUserDto selectUserDetail(String userKey);

  /**
   * 사용자 목록 조회 (부서/직위 정보 포함)
   * @param paramDto 검색 조건 및 페이징 파라미터
   * @return 페이징 처리된 사용자 목록
   */
  PageInfo<CommonUserDto> selectUserList(CommonUserDto paramDto);

  /**
   * 사용자 등록
   * @param dto 등록 정보
   * @return 등록된 사용자 상세 정보
   */
  CommonUserDto createUser(CommonUserDto dto);

  /**
   * 사용자 정보 수정
   * @param dto 수정 정보
   */
  void updateUser(CommonUserDto dto);

  /**
   * 사용자 삭제
   * @param userKey 사용자 키
   */
  void deleteUser(String userKey);
}
