package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.dto.CommonUserDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class CommonUserServiceImpl extends AbstractCommonDaoService implements CommonUserService {

  /**
   * 사용자 상세 조회
   */
  public CommonUserDto selectUserDetail(String userKey) {
    return commonSqlDao.selectOne("CommonUser.selectDetail", userKey);
  }

  /**
   * 사용자 목록 조회 (부서/직위 정보 포함)
   */
  public PageInfo<CommonUserDto> selectUserList(CommonUserDto paramDto) {
    List<CommonUserDto> resultList = commonSqlDao.selectList("CommonUser.selectList", paramDto);
    return PageInfo.of(resultList);
  }

  /**
   * 사용자 등록
   */
  public CommonUserDto createUser(CommonUserDto dto) {
    commonSqlDao.insert("CommonUser.insert", dto);
    return this.selectUserDetail(dto.getUserKey());
  }

  /**
   * 사용자 정보 수정
   */
  public void updateUser(CommonUserDto dto) {
    commonSqlDao.update("CommonUser.update", dto);
  }

  /**
   * 사용자 삭제
   */
  public void deleteUser(String userKey) {
    commonSqlDao.delete("CommonUser.delete", userKey);
  }
}
