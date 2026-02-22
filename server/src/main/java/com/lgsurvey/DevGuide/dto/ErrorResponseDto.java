package com.lgsurvey.DevGuide.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ErrorResponseDto {

  private int value;
  private String message;
  private LocalDateTime now;
  private String redirectUrl;

  public ErrorResponseDto(int value, String message, LocalDateTime now) {
    this.value = value;
    this.message = message;
    this.now = now;
  }

  public ErrorResponseDto(int value, String message, LocalDateTime now, String redirectUrl) {
    this.value = value;
    this.message = message;
    this.now = now;
    this.redirectUrl = redirectUrl;
  }
}
