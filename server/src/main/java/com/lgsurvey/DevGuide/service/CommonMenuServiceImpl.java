package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.dto.CommonMenuDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class CommonMenuServiceImpl extends AbstractCommonDaoService implements CommonMenuService {

  /**
   * 메뉴 상세 조회
   */
  public CommonMenuDto selectMenuDetail(String menuKey) {
    return commonSqlDao.selectOne("CommonMenu.selectDetail", menuKey);
  }

  /**
   * 메뉴 목록 조회
   */
  public PageInfo<CommonMenuDto> selectMenuList(CommonMenuDto paramDto) {
    List<CommonMenuDto> resultList = commonSqlDao.selectList("CommonMenu.selectList", paramDto);
    return PageInfo.of(resultList);
  }

  /**
   * 메뉴 등록
   */
  public CommonMenuDto createMenu(CommonMenuDto dto) {
    commonSqlDao.insert("CommonMenu.insert", dto);
    return this.selectMenuDetail(dto.getMenuKey());
  }

  /**
   * 메뉴 정보 수정
   */
  public void updateMenu(CommonMenuDto dto) {
    commonSqlDao.update("CommonMenu.update", dto);
  }

  /**
   * 메뉴 삭제
   */
  public void deleteMenu(String menuKey) {
    commonSqlDao.delete("CommonMenu.delete", menuKey);
  }
}
