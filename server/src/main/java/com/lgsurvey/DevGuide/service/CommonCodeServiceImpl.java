package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.dto.CommonCodeDto;
import com.lgsurvey.DevGuide.exception.ResourceNotFoundException;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CommonCodeServiceImpl extends AbstractCommonDaoService implements CommonCodeService {

  /**
   * 공통 코드 상세 조회 (복합키)
   */
  public CommonCodeDto selectCommonCode(String groupCode, String code) {
    CommonCodeDto param = CommonCodeDto.builder().groupCode(groupCode).code(code).build();
    CommonCodeDto result = commonSqlDao.selectOne("CommonCode.selectDetail", param);
    return Optional.ofNullable(result)
            .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 코드입니다. Key: " + code));
  }

  /**
   * 공통 코드 목록 조회 (페이징)
   */
  public PageInfo<CommonCodeDto> selectCommonCodeList(CommonCodeDto paramDto) {
    List<CommonCodeDto> resultList =
        commonSqlDao.selectList("CommonCode.selectList", paramDto);
    return PageInfo.of(resultList);
  }

  /**
   * 공통 코드 목록 조회 (페이징) Pageable spring 파라미터용으로
   */
  public PageInfo<CommonCodeDto> selectCommonCodeList(Pageable pageable, CommonCodeDto paramDto) {
    // 1. Pageable 정보를 PageHelper에 세팅
    // Spring Data Page는 0-index, PageHelper는 1-index 이므로 변환
    PageHelper.startPage(pageable.getPageNumber(), pageable.getPageSize());

    // 2. 정렬 정보 처리 (선택 사항)
    // pageable.getSort()를 분석하여 order by 문구로 변환하는 로직을 추가할 수 있습니다.

    List<CommonCodeDto> resultList = commonSqlDao.selectList("CommonCode.selectList", paramDto);

    return PageInfo.of(resultList);
  }

  public Page<CommonCodeDto> selectCommonCodeList2(Pageable pageable, CommonCodeDto paramDto) {

    // 1. 페이징 파라미터 설정 (DTO 내부에 offset과 pageSize를 세팅하거나 Map 활용)
    // Spring Data Pageable은 0부터 시작하므로 그대로 사용 가능
    paramDto.setOffset(pageable.getOffset());
    paramDto.setPageSize(pageable.getPageSize());

    // 2. 전체 카운트 조회 (페이징 처리를 위해 반드시 필요)
    int total = commonSqlDao.selectOne("CommonCode.selectListCount", paramDto);

    // 3. 페이징된 데이터 목록 조회
    List<CommonCodeDto> content = commonSqlDao.selectList("CommonCode.selectList2", paramDto);

    // 4. PageImpl 객체로 반환 (Spring Data 표준 구현체)
    return new PageImpl<>(content, pageable, total);
  }

  /**
   * 특정 그룹에 속한 코드 리스트 조회
   */
  public List<CommonCodeDto> selectCommonCodeListByGroupCode(String groupCode) {
    return commonSqlDao.selectList("CommonCode.selectList",
        CommonCodeDto.builder().groupCode(groupCode).useYn("Y").build());
  }

  /**
   * 공통 코드 생성
   */
  public CommonCodeDto createCommonCode(CommonCodeDto dto) {
    commonSqlDao.insert("CommonCode.insert", dto);
    return this.selectCommonCode(dto.getGroupCode(), dto.getCode());
  }

  /**
   * 공통 코드 수정
   */
  public void updateCommonCode(CommonCodeDto dto) {
    commonSqlDao.update("CommonCode.update", dto);
  }

  /**
   * 공통 코드 삭제
   */
  public void deleteCommonCode(String groupCode, String code) {
    CommonCodeDto param = CommonCodeDto.builder().groupCode(groupCode).code(code).build();
    commonSqlDao.delete("CommonCode.delete", param);
  }

  /**
   * 캐시 적용 코드 목록 (사용 중인 코드 전체)
   */
  @Cacheable(value = "cacheCodeAllList")
  public List<CommonCodeDto> cacheCodeAllList() {
    return commonSqlDao.selectList("CommonCode.selectList",
        CommonCodeDto.builder().useYn("Y").build());
  }
}
