package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.dto.CommonGroupCodeDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class CommonGroupCodeServiceImpl extends AbstractCommonDaoService implements CommonGroupCodeService {

  /**
   * 그룹 코드 상세 조회
   */
  public CommonGroupCodeDto selectGroupCode(String groupCode) {
    return commonSqlDao.selectOne("CommonGroupCode.selectDetail", groupCode);
  }

  /**
   * 그룹 코드 목록 조회 (페이징 포함)
   */
  public PageInfo<CommonGroupCodeDto> selectGroupCodeList(CommonGroupCodeDto paramDto) {
    List<CommonGroupCodeDto> resultList = commonSqlDao.selectList("CommonGroupCode.selectList", paramDto);
    return PageInfo.of(resultList);
  }

  /**
   * 그룹 코드 생성
   */
  public CommonGroupCodeDto createGroupCode(CommonGroupCodeDto dto) {
    commonSqlDao.insert("CommonGroupCode.insert", dto);
    return this.selectGroupCode(dto.getGroupCode());
  }

  /**
   * 그룹 코드 수정
   */
  public void updateGroupCode(CommonGroupCodeDto dto) {
    commonSqlDao.update("CommonGroupCode.update", dto);
  }

  /**
   * 그룹 코드 삭제
   */
  public void deleteGroupCode(String groupCode) {
    commonSqlDao.delete("CommonGroupCode.delete", groupCode);
  }
}
