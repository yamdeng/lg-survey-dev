package com.lgsurvey.DevGuide.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
public class CommonDto {

  @Schema(description = "등록자 키")
  private String regUserKey;

  @Schema(description = "수정자 키")
  private String modUserKey;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @Schema(description = "등록일시")
  private LocalDateTime regDate;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @Schema(description = "수정일시")
  private LocalDateTime modDate;

  @Schema(description = "정렬 컬럼명")
  private String sortColumn;

  @Schema(description = "정렬 유형 : asc, desc")
  private String sortOrder;

  @Schema(description = "공통 검색 키워드")
  private String searchWord;

  @Schema(description = "검색 유형")
  private String searchType;

  private long offset = 1;

  private int pageSize = 10;

  /* 등록자 정보 */
  private String regUserName;
  private String regUserNameEn;
  private String regUserPositionTitle;
  private String regUserDeptName;

  /* 수정자 정보 */
  private String modUserName;
  private String modUserNameEn;
  private String modUserPositionTitle;
  private String modUserDeptName;

  @JsonIgnore
  private String clientIp;

  public void updateLoginUserKeyColumn(String userKey) {
    this.regUserKey = userKey;
    this.modUserKey = userKey;
  }

}

