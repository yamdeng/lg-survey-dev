package com.lgsurvey.DevGuide.service;

import com.github.pagehelper.PageInfo;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.dto.CommonFileDto;
import com.lgsurvey.DevGuide.dto.CommonFilePathDto;
import com.lgsurvey.DevGuide.exception.CustomBusinessException;
import com.lgsurvey.DevGuide.utils.CommonUtil;
import com.lgsurvey.DevGuide.utils.DateUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CommonFileServiceImpl extends AbstractCommonDaoService implements CommonFileService {

  @Value("${app.file.rootPath}")
  private String rootPath;

  /**
   * 파일 상세 정보 조회
   */
  public CommonFileDto selectFileDetail(String fileKey) {
    return commonSqlDao.selectOne("CommonFile.selectDetail", fileKey);
  }

  /**
   * 파일 목록 조회
   */
  public PageInfo<CommonFileDto> selectFileList(CommonFileDto paramDto) {
    List<CommonFileDto> resultList =
        commonSqlDao.selectList("CommonFile.selectList", paramDto);
    return PageInfo.of(resultList);
  }

  /**
   * 파일 메타데이터 등록
   */
  public CommonFileDto insertFile(CommonFileDto dto) {
    commonSqlDao.insert("CommonFile.insert", dto);
    return this.selectFileDetail(dto.getFileKey());
  }

  /**
   * 파일 정보 업데이트 (사용여부 등)
   */
  public void updateFile(CommonFileDto dto) {
    commonSqlDao.update("CommonFile.update", dto);
  }

  /**
   * 파일 삭제 (DB 레코드 삭제)
   */
  public void deleteFile(String fileKey) {
    commonSqlDao.delete("CommonFile.delete", fileKey);
  }

  public Map<String, Object> uploadFile(List<MultipartFile> files) {

    // TODO : SessionUtil

    Map<String, Object> result = new HashMap<>();
    List<CommonFileDto> fileList = new ArrayList<>();

    Map<String, String> param = new HashMap<String, String>();
    param.put("regUserKey", "system");

    String today = DateUtil.now("yyyyMMdd");
    for (MultipartFile file : files) {
      String fileName = file.getOriginalFilename();
      String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1);
      String fileKey = CommonUtil.generateUniqueKey();
      String parentPath = today.substring(0, 4) + "/" + today.substring(4, 6) + "/";

      String fileFullPath = rootPath + "/" + parentPath + fileKey + "." + fileExt;
      String base64String = "";

      // 파일 저장
      try {
        FileUtils.forceMkdir(new File(rootPath + "/" + parentPath));
        FileUtils.copyToFile(file.getInputStream(), new File(fileFullPath));

      } catch (IOException e) {
        throw new CustomBusinessException("파일 생성시 문제가 발생했습니다.");
      }

      // 파일 정보 DB Insert
      CommonFileDto fileInfo =
          CommonFileDto.builder().fileKey(fileKey).oriFilename(fileName).fileExt(fileExt)
              .mimeType(CommonUtil.getMimeType(fileExt))
              .thumMimeType(CommonUtil.getMimeType(fileExt)).fileSize(file.getSize())
              .parentPath(parentPath).useYn("Y").regDate(LocalDateTime.now())
              .modDate(LocalDateTime.now()).base64String(base64String).build();

      commonSqlDao.insert("CommonFile.insert", fileInfo);

      fileList.add(fileInfo);
    }

    result.put("fileList", fileList);

    return result;
  }

  public ResponseEntity<?> downloadFile(CommonFileDto fileInfo) {

    String parentPath = fileInfo.getParentPath();
    String filePath = "";
    String fileExt = fileInfo.getFileExt();
    byte[] bytes = null;
    filePath = rootPath + "/" + parentPath + fileInfo.getFileKey() + "." + fileExt;

    try {
      bytes = Files.readAllBytes(new File(filePath).toPath());
    } catch (IOException e) {
      throw new CustomBusinessException("파일 다운로드 중 오류가 발생했습니다.");
    }

    ByteArrayResource resource = new ByteArrayResource(bytes);

    String encodedFileName =
        URLEncoder.encode(fileInfo.getOriFilename()).replaceAll("\\+", "%20"); // "+"를

    HttpHeaders header = new HttpHeaders();
    header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + encodedFileName);
    header.add("Content-Transfer-Encoding", "binary");

    return ResponseEntity.ok().headers(header).contentLength(bytes.length)
        .contentType(MediaType.parseMediaType(CommonUtil.getMimeType(fileInfo.getFileExt())))
        .body(resource);
  }

  public CommonFilePathDto getFileFullPath(CommonFileDto detailInfo) {
    String parentPath = detailInfo.getParentPath();
    String fileKey = detailInfo.getFileKey();
    String fileExt = detailInfo.getFileExt();
    return CommonFilePathDto.builder()
        .fileFullPath(rootPath + "/" + parentPath + fileKey + "." + fileExt)
        .thumbnailFileFullPath(rootPath + "/" + parentPath + fileKey + "_thumb." + fileExt).build();
  }

}
