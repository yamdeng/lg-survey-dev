package com.lgsurvey.DevGuide.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Schema(description = "공통 파일 풀경로")
public class CommonFilePathDto {

  @Schema(description = "다운로드 파일 풀경로")
  private String fileFullPath;

  @Schema(description = "썸네일 파일 풀경로")
  private String thumbnailFileFullPath;

}
