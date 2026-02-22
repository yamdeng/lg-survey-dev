package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonMenuDto;

/**
 * 공통 메뉴 관리 서비스 인터페이스
 */
public interface CommonMenuService {

  /**
   * 메뉴 상세 조회
   * @param menuKey 메뉴 키
   * @return 메뉴 상세 정보
   */
  CommonMenuDto selectMenuDetail(String menuKey);

  /**
   * 메뉴 목록 조회 (페이징 및 검색 포함)
   * @param paramDto 검색 조건 및 페이징 파라미터
   * @return 페이징 처리된 메뉴 목록
   */
  PageInfo<CommonMenuDto> selectMenuList(CommonMenuDto paramDto);

  /**
   * 메뉴 등록
   * @param dto 등록 정보
   * @return 등록된 메뉴 상세 정보
   */
  CommonMenuDto createMenu(CommonMenuDto dto);

  /**
   * 메뉴 정보 수정
   * @param dto 수정 정보
   */
  void updateMenu(CommonMenuDto dto);

  /**
   * 메뉴 삭제
   * @param menuKey 메뉴 키
   */
  void deleteMenu(String menuKey);
}
