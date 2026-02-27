package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonPositionDto;

import java.util.List;

/**
 * 직위 관리 서비스 인터페이스
 */
public interface CommonPositionService {

    /**
     * 직위 상세 조회
     *
     * @param positionKey 직위 키
     * @return 직위 상세 정보
     */
    CommonPositionDto selectPositionDetail(String positionKey);

    /**
     * 직위 목록 조회 (페이징 및 검색 포함)
     *
     * @param paramDto 검색 조건 및 페이징 파라미터
     * @return 페이징 처리된 직위 목록
     */
    List<CommonPositionDto> selectPositionList(CommonPositionDto paramDto);

    /**
     * 직위 등록
     *
     * @param dto 등록 정보
     * @return 등록된 직위 상세 정보
     */
    CommonPositionDto createPosition(CommonPositionDto dto);

    /**
     * 직위 정보 수정
     *
     * @param dto 수정 정보
     */
    void updatePosition(CommonPositionDto dto);

    /**
     * 직위 삭제
     *
     * @param positionKey 직위 키
     */
    void deletePosition(String positionKey);
}
