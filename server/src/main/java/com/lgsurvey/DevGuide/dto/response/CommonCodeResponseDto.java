package com.lgsurvey.DevGuide.dto.response;

import com.lgsurvey.DevGuide.dto.CommonDto;
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
public class CommonCodeResponseDto extends CommonDto {

  @Schema(description = "그룹 코드")
  private String cdGrp;

  @Schema(description = "코드")
  private String cd;

  @Schema(description = "코드 명")
  private String cdNm;

  @Schema(description = "설명")
  private String cdDesc;

  @Schema(description = "정렬 순서")
  private Integer sortOrd;


}
