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
public class CommonCodeDto extends CommonDto {
  @Schema(description = "그룹 코드")
  private String groupCode;

  @Schema(description = "코드")
  private String code;

  @Schema(description = "코드 명")
  private String codeName;

  @Schema(description = "사용 여부 (Y/N)")
  private String useYn;

  @Schema(description = "설명")
  private String description;

  @Schema(description = "정렬 순서")
  private Integer sortIndex;
}
