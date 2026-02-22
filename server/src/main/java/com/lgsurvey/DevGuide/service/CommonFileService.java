package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.dto.CommonFileDto;
import com.lgsurvey.DevGuide.dto.CommonFilePathDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * 공통 파일 관리 서비스 인터페이스
 */
public interface CommonFileService {

  /**
   * 파일 상세 정보 조회
   * @param fileKey 파일 키
   * @return 파일 상세 정보
   */
  CommonFileDto selectFileDetail(String fileKey);

  /**
   * 파일 목록 조회
   * @param paramDto 검색 조건 및 페이징 파라미터
   * @return 페이징 처리된 파일 목록
   */
  PageInfo<CommonFileDto> selectFileList(CommonFileDto paramDto);

  /**
   * 파일 메타데이터 등록
   * @param dto 파일 정보
   * @return 등록된 파일 상세 정보
   */
  CommonFileDto insertFile(CommonFileDto dto);

  /**
   * 파일 정보 업데이트 (사용여부 등)
   * @param dto 수정 정보
   */
  void updateFile(CommonFileDto dto);

  /**
   * 파일 삭제 (DB 레코드 삭제)
   * @param fileKey 파일 키
   */
  void deleteFile(String fileKey);

  Map<String, Object> uploadFile(List<MultipartFile> files);

  ResponseEntity<?> downloadFile(CommonFileDto fileInfo);

  CommonFilePathDto getFileFullPath(CommonFileDto detailInfo);
}
