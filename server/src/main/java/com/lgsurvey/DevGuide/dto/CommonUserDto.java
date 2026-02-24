package com.lgsurvey.DevGuide.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

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

  // 2. 생년월일 (날짜만)
  @JsonFormat(pattern = "yyyy-MM-dd")
  @Schema(description = "생년월일", example = "1995-05-15")
  private LocalDate birthDate;

  // 3. 업무 시작 시간 등 (시간만)
  @JsonFormat(pattern = "HH:mm:ss")
  @Schema(description = "출근시간", example = "09:00:00")
  private LocalTime startTime;

  @Schema(description = "사용 여부 (Y/N)")
  private String useYn;

  @Schema(description = "비밀번호")
  private String userPassword;

  @Schema(description = "사용자 유형")
  private String userType;

  @Schema(description = "권한 코드")
  private String authorCd;

}
