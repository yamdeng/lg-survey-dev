package com.lgsurvey.DevGuide.constants;


import lombok.experimental.UtilityClass;

@UtilityClass
public class StatusCodeConstants {

  public static final String SUCCESS = "SUCCESS";
  public static final String FAIL = "FAIL";

  public static final String MSG_SESSION_EMPTY = "Session empty";
  public static final String MSG_SESSION_EXPIRE = "Session expires";
  public static final String SESSION_EXPIRE = "SESSION_EXPIRE";
  public static final String FORBIDDEN = "FORBIDDEN";
  public static final String NOT_FOUND = "NOT_FOUND";
  public static final String BAD_REQUEST = "BAD_REQUEST";
  public static final String MSG_UNAUTHORIZED_ACCESS = "api access denied";
  public static final String UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS";
  public static final String MSG_TOO_FREQUENTLY_REQUEST_API = "Too frequently request api occurs";
  public static final String TOO_FREQUENTLY_REQUEST_API = "TOO_FREQUENTLY_REQUEST_API";
  public static final String MSG_FAIL_TO_CREATE_SESSION = "Failed to create session";

  public static final String INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";

  public static final String MANDATORY_PARAM_ERROR = "MANDATORY_PARAM_ERROR";
  public static final String INVALID_PARAM_ERROR = "INVALID_PARAM_ERROR";
}

