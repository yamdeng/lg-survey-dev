package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.dto.CommonPositionDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class CommonPositionServiceImpl extends AbstractCommonDaoService implements CommonPositionService {

  /**
   * 직위 상세 조회
   */
  public CommonPositionDto selectPositionDetail(String positionKey) {
    return commonSqlDao.selectOne("CommonPosition.selectDetail", positionKey);
  }

  /**
   * 직위 목록 조회
   */
  public PageInfo<CommonPositionDto> selectPositionList(CommonPositionDto paramDto) {
    List<CommonPositionDto> resultList = commonSqlDao.selectList("CommonPosition.selectList", paramDto);
    return PageInfo.of(resultList);
  }

  /**
   * 직위 등록
   */
  public CommonPositionDto createPosition(CommonPositionDto dto) {
    commonSqlDao.insert("CommonPosition.insert", dto);
    return this.selectPositionDetail(dto.getPositionKey());
  }

  /**
   * 직위 정보 수정
   */
  public void updatePosition(CommonPositionDto dto) {
    commonSqlDao.update("CommonPosition.update", dto);
  }

  /**
   * 직위 삭제
   */
  public void deletePosition(String positionKey) {
    commonSqlDao.delete("CommonPosition.delete", positionKey);
  }
}
