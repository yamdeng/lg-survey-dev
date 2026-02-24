package com.lgsurvey.DevGuide.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ErrorResponseDto {

  private String code;
  private String message;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime now;
  private String redirectUrl;

  public ErrorResponseDto(String code, String message, LocalDateTime now) {
    this.code = code;
    this.message = message;
    this.now = now;
  }

  public ErrorResponseDto(String code, String message) {
    this.code = code;
    this.message = message;
    this.now = LocalDateTime.now();
  }

  public ErrorResponseDto(String code, String message, LocalDateTime now, String redirectUrl) {
    this.code = code;
    this.message = message;
    this.now = now;
    this.redirectUrl = redirectUrl;
  }
}
