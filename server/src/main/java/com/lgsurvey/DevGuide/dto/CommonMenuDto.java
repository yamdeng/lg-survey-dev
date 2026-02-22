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
public class CommonMenuDto extends CommonDto {
  @Schema(description = "메뉴 키")
  private String menuKey;

  @Schema(description = "상위 메뉴 키")
  private String upMenuKey;

  @Schema(description = "메뉴 레벨")
  private Integer menuLevel;

  @Schema(description = "메뉴 타이틀")
  private String menuTitle;

  @Schema(description = "메뉴 URL")
  private String menuUrl;

  @Schema(description = "정렬 순서")
  private Integer sortIndex;

  @Schema(description = "설명")
  private String description;

  @Schema(description = "사용 여부 (Y/N)")
  private String useYn;

  @Schema(description = "메뉴 유형")
  private String menuType;
}
