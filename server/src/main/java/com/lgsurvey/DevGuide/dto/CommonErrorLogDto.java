package com.lgsurvey.DevGuide.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class CommonErrorLogDto extends CommonDto {
  @Schema(description = "로그 키")
  private String logKey;

  @Schema(description = "사용자 키")
  private String userKey;

  @Schema(description = "로그 종류 코드")
  private String logKindCode;

  @Schema(description = "에러 메시지")
  private String errorMessage;
}
