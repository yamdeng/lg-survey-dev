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
public class CommonFileMapDto extends CommonFileDto {

  @Schema(description = "게시글(board_key) 등 참조 대상의 PK")
  private String refKey;

  @Schema(description = "참조 타입 (예: 'NOTICE', 'USER_PROFILE')")
  private String refType;

  @Schema(description = "정렬 순서")
  private Integer sortIndex;

}
