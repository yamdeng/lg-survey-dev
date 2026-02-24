package com.lgsurvey.DevGuide.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Schema(description = "login dto")
public class LoginDto {

    @NotBlank
    @Schema(description = "사용자 id")
    private String userId;

    @NotBlank
    @Schema(description = "비밀번호")
    private String password;

}

