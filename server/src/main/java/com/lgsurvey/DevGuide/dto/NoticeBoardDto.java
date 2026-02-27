package com.lgsurvey.DevGuide.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class NoticeBoardDto extends CommonDto {
  @Schema(description = "게시판 키")
  private String boardKey;

  @Schema(description = "게시판 유형")
  private String boardType;

  @NotBlank
  @Schema(description = "게시판 제목")
  private String boardTitle;

  @NotBlank
  @Schema(description = "게시판 내용")
  private String boardContent;

  @NotBlank
  @Schema(description = "사용 여부")
  private String useYn;

  @NotBlank
  @Schema(description = "메인 노출 여부")
  private String mainYn;

  @Schema(description = "게시글 권한 유형")
  private String boardAuthType;

  @Schema(description = "보안 레벨")
  private String securityLevel;

  @Schema(description = "신규 파일첨부 목록")
  private List<String> addFileKeyList;

  @Schema(description = "삭제할 파일첨부 키 목록")
  private List<String> deleteFileKeyList;

}
