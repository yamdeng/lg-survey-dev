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
public class CommonPositionDto extends CommonDto {
  @Schema(description = "직위 키")
  private String positionKey;

  @Schema(description = "직위 명칭")
  private String positionTitle;

  @Schema(description = "정렬 순서")
  private Integer sortIndex;
}
