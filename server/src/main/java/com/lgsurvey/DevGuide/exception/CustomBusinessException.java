package com.lgsurvey.DevGuide.exception;

import com.lgsurvey.DevGuide.constants.StatusCodeConstants;
import lombok.Getter;

public class CustomBusinessException extends RuntimeException {

  private final String message;
  @Getter
  private final String statusCode;
  @Getter
  private final Throwable throwable;

  public CustomBusinessException(String message, String statusCode) {
    this.message = message;
    this.statusCode = statusCode;
    this.throwable = null;
  }

  public CustomBusinessException(String message, Throwable throwable) {
    this(message, StatusCodeConstants.FAIL, throwable);
  }

  public CustomBusinessException(String message) {
    this(message, StatusCodeConstants.FAIL, null);
  }

  public CustomBusinessException(String message, String statusCode, Throwable throwable) {
    this.message = message;
    this.statusCode = StatusCodeConstants.FAIL;
    this.throwable = throwable;
  }

  @Override
  public String getMessage() {
    return this.message;
  }

}
