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
public class CommonDeptDto extends CommonDto {
  @Schema(description = "부서 키")
  private String deptKey;

  @Schema(description = "상위 부서 키")
  private String upperDeptKey;

  @Schema(description = "부서 명")
  private String deptName;

  @Schema(description = "사용 여부 (Y/N)")
  private String useYn;

  @Schema(description = "정렬 순서")
  private Integer sortIndex;
}
