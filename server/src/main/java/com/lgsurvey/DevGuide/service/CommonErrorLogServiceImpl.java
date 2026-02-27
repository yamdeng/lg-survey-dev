package com.lgsurvey.DevGuide.service;

import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.dto.CommonErrorLogDto;
import com.lgsurvey.DevGuide.utils.CommonUtil;
import com.lgsurvey.DevGuide.utils.SessionUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommonErrorLogServiceImpl extends AbstractCommonDaoService
    implements CommonErrorLogService {

  /**
   * 에러 로그 상세 조회
   */
  public CommonErrorLogDto selectErrorLogDetail(String logKey) {
    return commonSqlDao.selectOne("CommonErrorLog.selectDetail", logKey);
  }

  /**
   * 에러 로그 목록 조회 (최신순)
   */
  public List<CommonErrorLogDto> selectErrorLogList(CommonErrorLogDto paramDto) {
    return commonSqlDao.selectList("CommonErrorLog.selectList", paramDto);
  }

  /**
   * 에러 로그 등록 (로그 기록)
   */
  public void insertErrorLog(CommonErrorLogDto dto) {
    if (CommonUtil.isEmpty(dto.getLogKey())) {
      dto.setLogKey(CommonUtil.generateKey());
    }
    String userKey = SessionUtil.getSessionUserKey();
    dto.setUserKey(userKey);
    commonSqlDao.insert("CommonErrorLog.insert", dto);
  }

  /**
   * 에러 로그 삭제 (오래된 로그 정리용)
   */
  public void deleteErrorLog(String logKey) {
    commonSqlDao.delete("CommonErrorLog.delete", logKey);
  }
}
