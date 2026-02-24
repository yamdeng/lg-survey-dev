package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.dto.CommonDeptDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class CommonDeptServiceImpl extends AbstractCommonDaoService implements CommonDeptService {

  /**
   * 부서 상세 조회
   */
  public CommonDeptDto selectDeptDetail(String deptKey) {
    return commonSqlDao.selectOne("CommonDept.selectDetail", deptKey);
  }

  /**
   * 부서 목록 조회 (상위 부서명 포함)
   */
  public List<CommonDeptDto> selectDeptList(CommonDeptDto paramDto) {
    return commonSqlDao.selectList("CommonDept.selectList", paramDto);
  }

  /**
   * 특정 상위 부서 하위의 부서 리스트 조회
   */
  public List<CommonDeptDto> selectChildDeptList(String upperDeptKey) {
    CommonDeptDto param = CommonDeptDto.builder()
        .upperDeptKey(upperDeptKey)
        .useYn("Y")
        .build();
    return commonSqlDao.selectList("CommonDept.selectList", param);
  }

  /**
   * 부서 등록
   */
  public CommonDeptDto createDept(CommonDeptDto dto) {
    commonSqlDao.insert("CommonDept.insert", dto);
    return this.selectDeptDetail(dto.getDeptKey());
  }

  /**
   * 부서 정보 수정
   */
  public void updateDept(CommonDeptDto dto) {
    commonSqlDao.update("CommonDept.update", dto);
  }

  /**
   * 부서 삭제
   */
  public void deleteDept(String deptKey) {
    commonSqlDao.delete("CommonDept.delete", deptKey);
  }
}
