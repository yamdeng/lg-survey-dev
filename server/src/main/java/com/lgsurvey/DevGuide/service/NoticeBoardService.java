package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.NoticeBoardDto;
import com.lgsurvey.DevGuide.dto.response.NoticeBoardResponseDto;

import java.util.List;

/**
 * 공지사항 게시판 서비스 인터페이스
 */
public interface NoticeBoardService {

  /**
   * 공지사항 상세 조회
   * @param boardKey 게시판 키
   * @return 공지사항 상세 정보
   */
  NoticeBoardResponseDto selectNoticeDetail(String boardKey);

  /**
   * 공지사항 목록 조회 (검색 및 페이징 포함)
   * @param paramDto 검색 조건 및 페이징 파라미터
   * @return 페이징 처리된 공지사항 목록
   */
  PageInfo<NoticeBoardResponseDto> selectNoticeListByPage(NoticeBoardDto paramDto);

  List<NoticeBoardResponseDto> selectNoticeList(NoticeBoardDto paramDto);

  /**
   * 공지사항 등록
   * @param dto 등록 정보
   * @return 등록된 공지사항 상세 정보
   */
  NoticeBoardResponseDto createNotice(NoticeBoardDto dto);

  /**
   * 공지사항 수정
   * @param dto 수정 정보
   */
  void updateNotice(NoticeBoardDto dto);

  /**
   * 공지사항 삭제
   * @param boardKey 게시판 키
   */
  void deleteNotice(String boardKey);
}
