package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.dto.NoticeBoardDto;
import com.lgsurvey.DevGuide.exception.ResourceNotFoundException;
import com.lgsurvey.DevGuide.utils.CommonUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NoticeBoardServiceImpl extends AbstractCommonDaoService implements NoticeBoardService {

  /**
   * 공지사항 상세 조회
   */
  public NoticeBoardDto selectNoticeDetail(String boardKey) {

    NoticeBoardDto noticeBoardDto = commonSqlDao.selectOne("NoticeBoard.selectDetail", boardKey);
    // 2. Optional로 감싸서 데이터가 없으면 예외 던지기
    return Optional.ofNullable(noticeBoardDto)
        .orElseThrow(() -> new ResourceNotFoundException("해당 게시글이 존재하지 않습니다. Key: " + boardKey));
  }

  /**
   * 공지사항 목록 조회 (검색 포함) : 페이징 적용
   */
  public PageInfo<NoticeBoardDto> selectNoticeListByPage(NoticeBoardDto paramDto) {
    List<NoticeBoardDto> resultList = commonSqlDao.selectList("NoticeBoard.selectList", paramDto);
    return PageInfo.of(resultList);
  }

  /**
   * 공지사항 목록 조회 (검색 포함)
   */
  public List<NoticeBoardDto> selectNoticeList(NoticeBoardDto paramDto) {
    List<NoticeBoardDto> resultList = commonSqlDao.selectList("NoticeBoard.selectList", paramDto);
    return resultList;
  }

  /**
   * 공지사항 등록
   */
  public NoticeBoardDto createNotice(NoticeBoardDto dto) {
    if (CommonUtil.isEmpty(dto.getBoardKey())) {
      dto.setBoardKey(CommonUtil.generateKey());
    }
    commonSqlDao.insert("NoticeBoard.insert", dto);
    return this.selectNoticeDetail(dto.getBoardKey());
  }

  /**
   * 공지사항 수정
   */
  public void updateNotice(NoticeBoardDto dto) {
    commonSqlDao.update("NoticeBoard.update", dto);
  }

  /**
   * 공지사항 삭제
   */
  public void deleteNotice(String boardKey) {
    commonSqlDao.delete("NoticeBoard.delete", boardKey);
  }
}
