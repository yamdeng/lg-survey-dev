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
public class CommonFileDto extends CommonDto {
  @Schema(description = "파일 키")
  private String fileKey;

  @Schema(description = "원본 파일명")
  private String oriFilename;

  @Schema(description = "파일 확장자")
  private String fileExt;

  @Schema(description = "MIME 타입")
  private String mimeType;

  @Schema(description = "썸네일 MIME 타입")
  private String thumMimeType;

  @Schema(description = "파일 크기")
  private Long fileSize;

  @Schema(description = "상위 경로")
  private String parentPath;

  @Schema(description = "파일 해시")
  private String fileHash;

  @Schema(description = "사용 여부 (Y/N)")
  private String useYn;

  @Schema(description = "Base64 문자열")
  private String base64String;
}
