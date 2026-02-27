package com.lgsurvey.DevGuide.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lgsurvey.DevGuide.common.AbstractCommonDaoService;
import com.lgsurvey.DevGuide.constants.CommonConstants;
import com.lgsurvey.DevGuide.dto.*;
import com.lgsurvey.DevGuide.utils.CommonConfig;
import com.lgsurvey.DevGuide.utils.CommonUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Random;

@Slf4j
@RequiredArgsConstructor
@Service
public class DataInitService extends AbstractCommonDaoService implements CommandLineRunner {

  private static final String SYSTEM_ID = "system";

  private static final String USER_PASSWORD = "survey1234";

  private final ObjectMapper objectMapper;
  private final CommonDeptService commonDeptService;
  private final CommonUserService commonUserService;
  private final PasswordEncoder passwordEncoder;

  @Override
  @Transactional
  public void run(String... args) {
    initData();
  }

  private void initData() {
    createOrg();
    createPosition();
    checkCodeTable();
    checkMenuTable();
    checkBoardTable();
  }

  private void createPosition() {

    commonSqlDao.insert("CommonPosition.insert",
        CommonPositionDto.builder().positionKey("P01").positionTitle("사원").sortIndex(1)
            .regUserKey(SYSTEM_ID).build());
    commonSqlDao.insert("CommonPosition.insert",
        CommonPositionDto.builder().positionKey("P02").positionTitle("대리").sortIndex(2).build());
    commonSqlDao.insert("CommonPosition.insert",
        CommonPositionDto.builder().positionKey("P03").positionTitle("과장").sortIndex(3).build());
    commonSqlDao.insert("CommonPosition.insert",
        CommonPositionDto.builder().positionKey("P04").positionTitle("차장").sortIndex(4).build());
    commonSqlDao.insert("CommonPosition.insert",
        CommonPositionDto.builder().positionKey("P05").positionTitle("부장").sortIndex(5).build());
    commonSqlDao.insert("CommonPosition.insert",
        CommonPositionDto.builder().positionKey("P06").positionTitle("이사").sortIndex(6).build());
    commonSqlDao.insert("CommonPosition.insert",
        CommonPositionDto.builder().positionKey("P99").positionTitle("대표").sortIndex(99).build());

  }

  private void checkCodeTable() {

    try {
      // JSON 파일 로드
      ClassPathResource resource = new ClassPathResource("init-json/init-group-code.json");
      InputStream inputStream = resource.getInputStream();
      List<CommonGroupCodeDto> commonGroupCodeDtoList =
          objectMapper.readValue(inputStream, new TypeReference<List<CommonGroupCodeDto>>() {
          });
      for (CommonGroupCodeDto commonGroupCodeDto : commonGroupCodeDtoList) {
        if (commonSqlDao.selectOne("CommonGroupCode.selectDetail", commonGroupCodeDto) == null) {
          commonGroupCodeDto.setRegUserKey(SYSTEM_ID);
          commonGroupCodeDto.setModUserKey(SYSTEM_ID);
          commonSqlDao.insert("CommonGroupCode.insert", commonGroupCodeDto);
        }
      }

      ClassPathResource resource2 = new ClassPathResource("init-json/init-code.json");
      InputStream inputStream2 = resource2.getInputStream();
      List<CommonCodeDto> commonCodeDtoList =
          objectMapper.readValue(inputStream2, new TypeReference<List<CommonCodeDto>>() {
          });
      for (CommonCodeDto commonCodeDto : commonCodeDtoList) {
        if (commonSqlDao.selectOne("CommonCode.selectDetail", commonCodeDto) == null) {
          commonCodeDto.setRegUserKey(SYSTEM_ID);
          commonCodeDto.setModUserKey(SYSTEM_ID);
          commonSqlDao.insert("CommonCode.insert", commonCodeDto);
        }
      }

    } catch (IOException e) {
      log.error("init-json/init-code.json import error : {}", e);
    }
  }

  private void checkMenuTable() {

    try {
      // JSON 파일 로드
      ClassPathResource resource = new ClassPathResource("init-json/init-menu.json");
      InputStream inputStream = resource.getInputStream();
      List<CommonMenuDto> userMenuDtoList =
          objectMapper.readValue(inputStream, new TypeReference<List<CommonMenuDto>>() {
          });
      for (CommonMenuDto userMenuDto : userMenuDtoList) {
        if (commonSqlDao.selectOne("CommonMenu.selectDetail", userMenuDto) == null) {
          if (CommonUtil.isEmpty(userMenuDto.getMenuKey())) {
            userMenuDto.setMenuKey(CommonUtil.generateKey());
          }
          userMenuDto.setRegUserKey(SYSTEM_ID);
          userMenuDto.setModUserKey(SYSTEM_ID);
          commonSqlDao.insert("CommonMenu.insert", userMenuDto);
        }
      }

    } catch (IOException e) {
      log.error("init-json/init-menu.json import error : {}", e);
    }
  }

  private void createOrg() {

    Random random = new Random();
    //    String randomAuth = authStringList.get(random.nextInt(authStringList.size()));

    List<String> authStringList =
        List.of(CommonConstants.AUTHOR_CD_USER, CommonConstants.AUTHOR_CD_ADMIN,
            CommonConstants.AUTHOR_CD_BOARD, CommonConstants.AUTHOR_CD_SURVEY);

    /* 기본 사용자 add */
    String encodedPassword = passwordEncoder.encode(USER_PASSWORD);

    // 최상위 부서 및 설문조사고도화 부서 생성
    commonDeptService.createDept(CommonDeptDto.builder().deptKey("TOP").deptName("대표이사")
        .upperDeptKey(CommonConfig.treeRootKey).useYn("Y").sortIndex(1).build());
    commonDeptService.createDept(
        CommonDeptDto.builder().deptKey("SURVEY").deptName("설문조사고도화").upperDeptKey("TOP").useYn("Y")
            .sortIndex(1).build());
    commonDeptService.createDept(CommonDeptDto.builder().deptKey("SYSTEM").deptName("시스템")
        .upperDeptKey(CommonConfig.treeRootKey).useYn("N").sortIndex(2).build());

    // 시스템 사용자 add
    CommonUserDto systemUserDto = CommonUserDto.builder().userKey(SYSTEM_ID).userId(SYSTEM_ID).deptKey("SYSTEM")
        .authorCd(CommonConstants.AUTHOR_CD_ADMIN).userPassword(encodedPassword).userName("시스템관리자")
        .positionKey("P99").useYn("Y").build();
    commonUserService.createUser(systemUserDto);

    String topUserKey = CommonUtil.generateKey();
    CommonUserDto userSaveDto =
        CommonUserDto.builder().userKey(topUserKey).userId(topUserKey).deptKey("TOP")
            .authorCd(CommonConstants.AUTHOR_CD_ADMIN).regUserKey(SYSTEM_ID).modUserKey(SYSTEM_ID)
            .userPassword(encodedPassword).userName("LG대표이사").positionKey("P99").useYn("Y").build();

    commonUserService.createUser(userSaveDto);

    CommonUserDto surveyUserDto1 =
        CommonUserDto.builder().userKey("survey1").userId("survey1").deptKey("SURVEY")
            .authorCd(CommonConstants.AUTHOR_CD_SURVEY).regUserKey(SYSTEM_ID).modUserKey(SYSTEM_ID)
            .userPassword(encodedPassword).userName("임명호").positionKey("P05").useYn("Y").build();

    CommonUserDto surveyUserDto2 =
        CommonUserDto.builder().userKey("survey2").userId("survey2").deptKey("SURVEY")
            .authorCd(CommonConstants.AUTHOR_CD_SURVEY).regUserKey(SYSTEM_ID).modUserKey(SYSTEM_ID)
            .userPassword(encodedPassword).userName("김민정").positionKey("P04").useYn("Y").build();

    CommonUserDto surveyUserDto3 =
        CommonUserDto.builder().userKey("survey3").userId("survey3").deptKey("SURVEY")
            .authorCd(CommonConstants.AUTHOR_CD_SURVEY).regUserKey(SYSTEM_ID).modUserKey(SYSTEM_ID)
            .userPassword(encodedPassword).userName("안용성").positionKey("P01").useYn("Y").build();

    commonUserService.createUser(surveyUserDto1);
    commonUserService.createUser(surveyUserDto2);
    commonUserService.createUser(surveyUserDto3);

    for (int index = 1; index <= 10; index++) {
      String deptKey = "LG_DEPT" + index;
      commonDeptService.createDept(
          CommonDeptDto.builder().deptKey(deptKey).deptName("전략기획실" + index).upperDeptKey("TOP")
              .useYn("Y").sortIndex(index + 1).build());

      for (int subIndex = 1; subIndex <= 100; subIndex++) {
        String subUserKey = CommonUtil.generateKey();
        commonUserService.createUser(
            CommonUserDto.builder().userKey(subUserKey).userId(subUserKey).positionKey("P02")
                .userPassword(encodedPassword).authorCd(CommonConstants.AUTHOR_CD_USER)
                .deptKey(deptKey).regUserKey(SYSTEM_ID).modUserKey(SYSTEM_ID)
                .userName("전략" + index + "_안용성" + subIndex).useYn("Y").userType("U").build());
      }
    }
  }

  private void checkBoardTable() {

    try {
      // JSON 파일 로드
      ClassPathResource resource = new ClassPathResource("init-json/init-board.json");
      InputStream inputStream = resource.getInputStream();
      List<NoticeBoardDto> list =
          objectMapper.readValue(inputStream, new TypeReference<List<NoticeBoardDto>>() {
          });
      for (NoticeBoardDto noticeBoardDto : list) {
        if (commonSqlDao.selectOne("NoticeBoard.selectDetail", noticeBoardDto) == null) {
          if (CommonUtil.isEmpty(noticeBoardDto.getBoardKey())) {
            noticeBoardDto.setBoardKey(CommonUtil.generateKey());
          }
          noticeBoardDto.setRegUserKey(SYSTEM_ID);
          noticeBoardDto.setModUserKey(SYSTEM_ID);
          commonSqlDao.insert("NoticeBoard.insert", noticeBoardDto);
        }
      }

    } catch (IOException e) {
      log.error("init-json/init-board.json import error : {}", e);
    }
  }

}
