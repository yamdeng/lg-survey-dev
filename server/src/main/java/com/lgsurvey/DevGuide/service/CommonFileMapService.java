package com.lgsurvey.DevGuide.service;

import com.lgsurvey.DevGuide.dto.CommonFileMapDto;

import java.util.List;

public interface CommonFileMapService {

    /**
     * FileMap 상세 조회
     */
    CommonFileMapDto selectCommonFileMapDetail(String logKey);

    /**
     * FileMap 목록 조회
     */
    List<CommonFileMapDto> selectCommonFileMapList(CommonFileMapDto paramDto);

    /**
     * FileMap 등록
     */
    void insertCommonFileMap(CommonFileMapDto dto);

    /**
     * FileMap 삭제
     */
    void deleteCommonFileMap(CommonFileMapDto dto);

    /**
     * 이전 최대 sortIndex 조회하기
     */
    Integer selectMaxSortIndex(String refKey);
}
