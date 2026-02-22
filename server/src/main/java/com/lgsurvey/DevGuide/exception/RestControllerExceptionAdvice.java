package com.lgsurvey.DevGuide.exception;

import com.lgsurvey.DevGuide.constants.StatusCodeConstants;
import com.lgsurvey.DevGuide.dto.ErrorResponse;
import com.lgsurvey.DevGuide.utils.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import java.util.List;
import java.util.StringJoiner;

@Slf4j
@RestControllerAdvice(basePackages = "com.lgsurvey")
@RequiredArgsConstructor
public class RestControllerExceptionAdvice {

  @Value("${app.sso-url:}")
  private String ssoUrl;

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> customExceptionHandler(Exception e) {
    ResponseEntity<ErrorResponse> result = null;

    // 필수값 validation 처리
    if (e instanceof BindException bindException) {
      List<FieldError> errorList = bindException.getBindingResult().getFieldErrors();
      var message = new StringJoiner(",");
      for (final FieldError error : errorList) {
        message.add(error.getField());
      }
      result =
          ResponseUtil.createFailResponse(message.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
    } else if (e instanceof MissingServletRequestParameterException missingServletRequestParameterException) {
      result = ResponseUtil.createFailResponse(StatusCodeConstants.MANDATORY_PARAM_ERROR,
          missingServletRequestParameterException.getParameterName(), HttpStatus.BAD_REQUEST);
    } else if (e instanceof HandlerMethodValidationException handlerMethodValidationException) {
      result = ResponseUtil.createFailResponse(StatusCodeConstants.MANDATORY_PARAM_ERROR,
          handlerMethodValidationException.getMessage(), HttpStatus.BAD_REQUEST);
    } else {
      result = ResponseUtil.createFailResponse(StatusCodeConstants.INTERNAL_SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    log.error("서버 오류 :", e);

    return result;
  }

  @ExceptionHandler(CustomBusinessException.class)
  public ResponseEntity<?> customBusinessExceptionHandler(HttpServletRequest request,
      CustomBusinessException e) {
    String exceptionMessage = e.getMessage();
    if (StatusCodeConstants.SESSION_EXPIRE.equals(e.getStatusCode())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
          ResponseUtil.createFailResponse(StatusCodeConstants.UNAUTHORIZED_ACCESS, ssoUrl,
              HttpStatus.UNAUTHORIZED));
    } else if (StatusCodeConstants.FORBIDDEN.equals(e.getStatusCode())) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
          ResponseUtil.createFailResponse(StatusCodeConstants.FORBIDDEN, HttpStatus.FORBIDDEN));
    } else {
      return ResponseUtil.createFailResponse(e.getStatusCode(), exceptionMessage);
    }
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<?> customBusinessExceptionHandler(HttpServletRequest request,
      ResourceNotFoundException e) {
    String exceptionMessage = e.getMessage();

    return ResponseUtil.createFailResponse(StatusCodeConstants.NOT_FOUND, exceptionMessage,
        HttpStatus.NOT_FOUND);

  }


}

