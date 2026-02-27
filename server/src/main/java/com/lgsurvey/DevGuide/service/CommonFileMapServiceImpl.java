package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.dto.CommonErrorLogDto;
import com.lgsurvey.DevGuide.dto.CommonFileMapDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommonFileMapServiceImpl extends AbstractCommonDaoService implements CommonFileMapService {

    /**
     * FileMap 상세 조회
     */
    public CommonFileMapDto selectCommonFileMapDetail(String logKey) {
        return commonSqlDao.selectOne("CommonFileMap.selectDetail", logKey);
    }

    /**
     * FileMap 목록 조회
     */
    public List<CommonFileMapDto> selectCommonFileMapList(CommonFileMapDto paramDto) {
        return commonSqlDao.selectList("CommonFileMap.selectList", paramDto);
    }

    /**
     * FileMap 등록
     */
    public void insertCommonFileMap(CommonFileMapDto dto) {
        commonSqlDao.insert("CommonFileMap.insert", dto);
    }

    /**
     * FileMap 삭제
     */
    public void deleteCommonFileMap(CommonFileMapDto dto) {
        commonSqlDao.delete("CommonFileMap.delete", dto);
    }


    /**
     * 이전 최대 sortIndex 조회하기
     */
    public Integer selectMaxSortIndex(String refKey) {
        return commonSqlDao.selectOne("CommonFileMap.selectMaxSortIndex", refKey);
    }
}
