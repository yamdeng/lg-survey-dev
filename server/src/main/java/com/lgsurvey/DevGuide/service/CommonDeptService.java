package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonDeptDto;
import java.util.List;

/**
 * 부서 관리 서비스 인터페이스
 */
public interface CommonDeptService {

  /**
   * 부서 상세 조회
   */
  CommonDeptDto selectDeptDetail(String deptKey);

  /**
   * 부서 목록 조회 (상위 부서명 포함)
   */
  List<CommonDeptDto> selectDeptList(CommonDeptDto paramDto);

  /**
   * 특정 상위 부서 하위의 부서 리스트 조회
   */
  List<CommonDeptDto> selectChildDeptList(String upperDeptKey);

  /**
   * 부서 등록
   */
  CommonDeptDto createDept(CommonDeptDto dto);

  /**
   * 부서 정보 수정
   */
  void updateDept(CommonDeptDto dto);

  /**
   * 부서 삭제
   */
  void deleteDept(String deptKey);
}
