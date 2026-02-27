package com.lgsurvey.DevGuide.utils;

import com.lgsurvey.DevGuide.dto.ErrorResponse;
import lombok.experimental.UtilityClass;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@UtilityClass
public class ResponseUtil {

  public static <T> ResponseEntity<T> createSuccessResponse() {
    return new ResponseEntity<>(null, HttpStatus.OK);
  }

  public static <T> ResponseEntity<T> createSuccessResponse(T data) {
    return new ResponseEntity<>(data, HttpStatus.OK);
  }

  public static ResponseEntity<ErrorResponse> createFailResponse() {
    return createFailResponse("common-error", "server-common-error",
        HttpStatus.INTERNAL_SERVER_ERROR);
  }

  public static ResponseEntity<ErrorResponse> createFailResponse(String message,
      HttpStatus httpStatus) {
    return createFailResponse("no-code", message, httpStatus);
  }

  public static ResponseEntity<ErrorResponse> createFailResponse(String code, String errorMessage) {
    return createFailResponse(code, errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  public static ResponseEntity<ErrorResponse> createFailResponse(String code, String errorMessage,
      HttpStatus httpStatus) {
    ErrorResponse result = ErrorResponse.builder().code(code).message(errorMessage).build();
    return new ResponseEntity<ErrorResponse>(result, httpStatus);
  }

  public static ResponseEntity<ErrorResponse> createFailResponse(ErrorResponse errorResponse,
      HttpStatus httpStatus) {
    return new ResponseEntity<ErrorResponse>(errorResponse, httpStatus);
  }

  public static ResponseEntity<ErrorResponse> createFailResponse(ErrorResponse errorResponse) {
    return createFailResponse(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
