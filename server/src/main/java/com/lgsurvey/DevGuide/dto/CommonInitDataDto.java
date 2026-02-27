package com.lgsurvey.DevGuide.dto;

import com.lgsurvey.DevGuide.dto.response.CommonCodeResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@SuperBuilder
@Schema(description = "초기데이터")
public class CommonInitDataDto {

  @Schema(description = "코드 목록")
  List<CommonCodeResponseDto> codes;

}

