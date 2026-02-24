package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.constants.CommonConstants;
import com.lgsurvey.DevGuide.dto.CommonFileMapDto;
import com.lgsurvey.DevGuide.dto.NoticeBoardDto;
import com.lgsurvey.DevGuide.dto.response.NoticeBoardResponseDto;
import com.lgsurvey.DevGuide.exception.ResourceNotFoundException;
import com.lgsurvey.DevGuide.utils.CommonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeBoardServiceImpl extends AbstractCommonDaoService implements NoticeBoardService {

    private final CommonFileMapService commonFileMapService;

    /**
     * 공지사항 상세 조회
     */
    public NoticeBoardResponseDto selectNoticeDetail(String boardKey) {

        NoticeBoardResponseDto noticeBoardDto = commonSqlDao.selectOne("NoticeBoard.selectDetail", boardKey);

        List<CommonFileMapDto> fileList = commonFileMapService.selectCommonFileMapList(
                CommonFileMapDto.builder()
                        .refKey(boardKey)
                        .build()
        );

        if (CommonUtil.isNotEmpty(noticeBoardDto) && CommonUtil.isNotEmpty(fileList)) {
            noticeBoardDto.setFileList(fileList);
        }

        // 2. Optional로 감싸서 데이터가 없으면 예외 던지기
        return Optional.ofNullable(noticeBoardDto)
                .orElseThrow(() -> new ResourceNotFoundException("해당 게시글이 존재하지 않습니다. Key: " + boardKey));
    }

    /**
     * 공지사항 목록 조회 (검색 포함) : 페이징 적용
     */
    public PageInfo<NoticeBoardResponseDto> selectNoticeListByPage(NoticeBoardDto paramDto) {
        List<NoticeBoardResponseDto> resultList = commonSqlDao.selectList("NoticeBoard.selectList", paramDto);
        return PageInfo.of(resultList);
    }

    /**
     * 공지사항 목록 조회 (검색 포함)
     */
    public List<NoticeBoardResponseDto> selectNoticeList(NoticeBoardDto paramDto) {
        List<NoticeBoardResponseDto> resultList = commonSqlDao.selectList("NoticeBoard.selectList", paramDto);
        return resultList;
    }

    /**
     * 공지사항 등록
     */
    public NoticeBoardResponseDto createNotice(NoticeBoardDto dto) {
        String boardKey = dto.getBoardKey();
        if (CommonUtil.isEmpty(boardKey)) {
            boardKey = CommonUtil.generateKey();
            dto.setBoardKey(boardKey);
        }
        commonSqlDao.insert("NoticeBoard.insert", dto);
        List<String> addFileKeyList = dto.getAddFileKeyList();

        if (CommonUtil.isNotEmpty(addFileKeyList)) {
            int sortIndex = 1;
            String finalBoardKey = boardKey;
            addFileKeyList.forEach(fileKey -> {
                CommonFileMapDto addCommonFileMapDto = CommonFileMapDto.builder()
                        .fileKey(fileKey)
                        .refType(CommonConstants.BOARD_TYPE_NOTICE)
                        .refKey(finalBoardKey)
                        .sortIndex(sortIndex)
                        .build();
                commonFileMapService.insertCommonFileMap(addCommonFileMapDto);
            });
        }
        return this.selectNoticeDetail(boardKey);
    }

    /**
     * 공지사항 수정
     */
    public void updateNotice(NoticeBoardDto dto) {

        List<String> addFileKeyList = dto.getAddFileKeyList();
        List<String> deleteFileKeyList = dto.getDeleteFileKeyList();
        String boardKey = dto.getBoardKey();

        // 파일 삭제
        if (CommonUtil.isNotEmpty(deleteFileKeyList)) {
            deleteFileKeyList.forEach(deleteFileKey -> {
                commonFileMapService.deleteCommonFileMap(
                        CommonFileMapDto.builder()
                                .fileKey(deleteFileKey)
                                .refKey(boardKey)
                                .build()
                );
            });
        }

        // 파일 추가
        if (CommonUtil.isNotEmpty(addFileKeyList)) {
            int sortIndex = commonFileMapService.selectMaxSortIndex(boardKey);
            if (sortIndex == 0) {
                sortIndex = 1;
            }
            int finalSortIndex = sortIndex;
            addFileKeyList.forEach(fileKey -> {
                CommonFileMapDto addCommonFileMapDto = CommonFileMapDto.builder()
                        .fileKey(fileKey)
                        .refType(CommonConstants.BOARD_TYPE_NOTICE)
                        .refKey(boardKey)
                        .sortIndex(finalSortIndex)
                        .build();
                commonFileMapService.insertCommonFileMap(addCommonFileMapDto);
            });
        }

        commonSqlDao.update("NoticeBoard.update", dto);
    }

    /**
     * 공지사항 삭제
     */
    public void deleteNotice(String boardKey) {
        commonSqlDao.delete("NoticeBoard.delete", boardKey);
    }
}
