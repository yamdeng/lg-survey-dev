package com.lgsurvey.DevGuide.utils;

import com.lgsurvey.DevGuide.dto.TestDto;
import lombok.Getter;
import lombok.experimental.UtilityClass;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;



@UtilityClass
public class DataUtil {

  public static List<String> userIdList = new ArrayList<>();
  public static List<String> userNameList = new ArrayList<>();
  public static List<String> userCommentList = new ArrayList<>();
  public static List<String> positionIdList = List.of("p1", "p2", "p3", "p4", "p5");
  public static List<String> deptIdList = List.of("dept1", "dept2", "dept3", "dept4", "dept5");

  @Getter
  public static TestDto testDtoInfo;
  
  @Getter
  public static List<TestDto> testDtoList = new ArrayList<>();

  private static final Random RANDOM = new Random();;

  static {

    for (int index = 0; index < 115; index++) {
      String userId = "yamdeng" + (index + 1);
      String userName = "yamdeng" + (index + 1);
      String userEnName = "En" + userName;
      String userComment =
          "안녕하세요. 안용성입니다. 반갑습니다. 또 만나요. 설문조사 프로젝트입니다. 안녕하가세용. 잘부탁드립니다." + (index + 1);

      int positionRandomIndex = RANDOM.nextInt(positionIdList.size());
      String positionId = positionIdList.get(positionRandomIndex);

      int deptRandomIndex = RANDOM.nextInt(deptIdList.size());
      String deptId = deptIdList.get(deptRandomIndex);
      
      userIdList.add(userId);
      userNameList.add(userName);
      userCommentList.add(userComment);

      testDtoList.add(
          TestDto.builder()
              .userId(userId)
              .userName(userName)
              .userEnName(userEnName)
              .userComment(userComment)
              .positionId(positionId)
              .deptId(deptId)
              .build()
      );
    }

    String userId = userIdList.get(0);
    String userName = userNameList.get(0);
    String userEnName = "En" + userName;
    String userComment = userCommentList.get(0);
    String positionId = positionIdList.get(0);
    String deptId = deptIdList.get(0);
    testDtoInfo = TestDto.builder()
        .userId(userId)
        .userName(userName)
        .userEnName(userEnName)
        .userComment(userComment)
        .positionId(positionId)
        .deptId(deptId)
        .build();
  }

  /**
   * 전체 리스트를 페이지 규격에 맞게 잘라서 반환합니다.
   * @param currentPage 현재 페이지 (1부터 시작 가정)
   * @param pageSize 페이지당 출력 개수
   * @return 페이징 처리된 리스트
   */
  public static List<TestDto> getPagedList(int currentPage, int pageSize) {
    // 1. 시작 인덱스 계산 (1페이지면 0부터, 2페이지면 pageSize부터)
    int fromIndex = (currentPage - 1) * pageSize;

    // 2. 만약 시작 인덱스가 전체 크기보다 크면 빈 리스트 반환
    if (fromIndex >= testDtoList.size()) {
      return new ArrayList<>();
    }

    // 3. 종료 인덱스 계산 (시작 + 사이즈)
    // 리스트 끝을 넘어가지 않도록 Math.min 처리
    int toIndex = Math.min(fromIndex + pageSize, testDtoList.size());

    // 4. 리스트 자르기 (subList는 원본의 뷰이므로 새 리스트로 감싸서 반환하는 것이 안전함)
    return new ArrayList<>(testDtoList.subList(fromIndex, toIndex));
  }

}
