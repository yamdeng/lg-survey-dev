package com.lgsurvey.DevGuide.constants;

import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonConstants {

  public static final String LOG_ERROR_TYPE_SERVER = "server";
  public static final String LOG_ERROR_TYPE_FRONT = "front";

  public static final String LOGIN_TOKEN_DATASOURCE_TYPE_REDIS = "redis";
  public static final String LOGIN_TOKEN_DATASOURCE_TYPE_DB = "db";

  public static final String SESSION_NAME = "sessionInfo";
  public static final String DEFAULT_PROFILE = "local";

  public static final String DATE_FORMAT_YYYYMMDD = "yyyyMMdd";
  public static final String DATE_FORMAT_YYMMDD = "yyMMdd";
  public static final String DATE_FORMAT_YYYYMMDD_HHMMSS = "yyyy-MM-dd HH:mm:ss";
  public static final String DATE_FORMAT_HHMMSS_SS = "HH:mm:ss.SS";
  public static final String DATE_FORMAT_DDMMYY = "ddMMyy";
  public static final String DATE_FORMAT_YYYYMMDDHHMMSS = "yyyyMMddHHmmss";
  public static final String DATE_FORMAT_YYYYMMDDHHMMSSMS = "yyyyMMddHHmmssSS";

  public static final String DATE_FORMAT_TIME_MILLISECONDS = "HHmmssSSS";

  public static final String YES_FLAG = "Y";
  public static final String NO_FLAG = "N";

  public static final int API_MAX_REQUEST_COUNT_IN_TTL = 5;

  public static final String SESSION_URI = "/api/v1/session/login";
  public static final String TEST_AUTOMATION_SESSION_URI = "/v1/testAutomation/session";

  public static final String HTTP_METHOD_OPTIONS = "OPTIONS";
  public static final String HTTP_METHOD_GET = "GET";
  public static final String HTTP_METHOD_POST = "POST";
  public static final String HTTP_METHOD_PUT = "PUT";
  public static final String HTTP_METHOD_DELETE = "DELETE";

  public static final String APPLICATION_TOKEN = "applicationToken";

  /* 사용자권한 상수 */
  public static final String AUTHOR_CD_USER = "USER";
  public static final String AUTHOR_CD_ADMIN = "ADMIN";
  public static final String AUTHOR_CD_BOARD = "BOARD";
  public static final String AUTHOR_CD_SURVEY = "SURVEY";

  /* 게시글 권한 상수 */
  public static final String BOARD_AUTH_TYPE_USER = "USER";
  public static final String BOARD_AUTH_TYPE_ADMIN = "ADMIN";

  /* 게시판 유형 */
  public static final String BOARD_TYPE_NOTICE = "notice";
  public static final String BOARD_TYPE_NORMAL = "normal";
  public static final String BOARD_TYPE_IMAGE = "image";

  /* 로그 유형 */
  public static final String LOG_TYPE_SERVER = "server";
  public static final String LOG_TYPE_FRONT = "front";

  // // /api/v1/simpleMap1, /api/v1/simpleMap2, simpleDto, simpleListDto, pagedListDto, error/403, error/401, error/400, error/etc
  public static final String[] AUTH_WHITELIST =
      {"/api/v1/auth/login", "/api/v1/error-log", "/api/v1/health", "/h2-console/**", "-file/**",
          "/api/v1/simpleMap1", "/api/v1/simpleMap2", "/api/v1/simpleDto", "/api/v1/simpleListDto",
          "/api/v1/pagedListDto", "/api/v1/error/403", "/api/v1/error/401", "/api/v1/error/400",
          "/api/v1/error/etc", "/api/v1/initData", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html",
          "/swagger-resources/**", "/webjars/**"};


}

