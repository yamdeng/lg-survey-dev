package com.lgsurvey.DevGuide.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class CommonUserDto extends CommonDto {
  @Schema(description = "사용자 키")
  private String userKey;

  @Schema(description = "부서 키")
  private String deptKey;

  @Schema(description = "직위 키")
  private String positionKey;

  @Schema(description = "사용자 ID")
  private String userId;

  @Schema(description = "사용자 명")
  private String userName;

  @Schema(description = "사용자 영문 명")
  private String userNameEn;

  @Schema(description = "사용자 비고")
  private String userComment;

  @Schema(description = "이메일")
  private String email;

  @Schema(description = "휴대폰 번호")
  private String mobileTel;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @Schema(description = "생년월일")
  private LocalDateTime birthDate;

  @Schema(description = "사용 여부 (Y/N)")
  private String useYn;

  @Schema(description = "비밀번호")
  private String userPassword;

  @Schema(description = "사용자 유형")
  private String userType;

  @Schema(description = "권한 코드")
  private String authorCd;

}
