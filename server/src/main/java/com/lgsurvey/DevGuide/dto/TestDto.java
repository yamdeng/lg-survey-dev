package com.lgsurvey.DevGuide.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Schema(description = "테스트 DTO")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@SuperBuilder
public class TestDto extends CommonDto {

  @NotNull
  @Schema(description = "사용자 ID")
  private String userId;

  @Schema(description = "사용자명")
  private String userName;

  @Schema(description = "사용자영문명")
  private String userEnName;

  @Schema(description = "사용자설명")
  private String userComment;

  @Schema(description = "부서 ID")
  private String deptId;

  @Schema(description = "직위 ID")
  @NotBlank
  private String positionId;

}

