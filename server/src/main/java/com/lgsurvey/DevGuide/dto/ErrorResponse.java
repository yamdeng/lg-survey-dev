package com.lgsurvey.DevGuide.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
public class ErrorResponse {

  private String code;
  private String message;

}
