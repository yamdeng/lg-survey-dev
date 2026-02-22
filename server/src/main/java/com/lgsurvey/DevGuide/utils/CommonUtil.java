package com.lgsurvey.DevGuide.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lgsurvey.DevGuide.constants.CommonConstants;
import com.lgsurvey.DevGuide.exception.CustomBusinessException;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.security.SecureRandom;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Supplier;

@UtilityClass
public final class CommonUtil {

  public static String generateKey() {
    UUID uuid = UUID.randomUUID();
    SecureRandom random = new SecureRandom();

    byte[] randomBytes = new byte[6]; // 6바이트 ≈ 15자리 Base64
    random.nextBytes(randomBytes);

    String uuidPart = uuid.toString().replace("-", "").substring(0, 9); // UUID 앞부분 9자리 사용
    String randomPart =
        Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes).substring(0, 6);

    return uuidPart + randomPart; // 총 15자리
  }

  public static boolean isEmpty(final Object str) {
    if (str == null) {
      return true;
    }
    if ((str instanceof String) && (((String) str).trim().length() == 0)) {
      return true;
    }
    if (str instanceof Map) {
      return ((Map<?, ?>) str).isEmpty();
    }
    if (str instanceof List) {
      return ((List<?>) str).isEmpty();
    }
    if (str instanceof Object[]) {
      return (((Object[]) str).length == 0);
    }
    return false;
  }

  public static boolean isNotEmpty(final Object str) {
    return !isEmpty(str);
  }

  /**
   * @param size         more than 0
   * @param allowedChars not empty
   * @return random string, or null
   */
  public static String generateRandomString(final int size, final String allowedChars) {
    if (size < 1 || CommonUtil.isEmpty(allowedChars)) {
      return null;
    }

    var random = new SecureRandom();
    var sb = new StringBuilder();

    for (var i = 0; i < size; i++) {
      var randomIndex = random.nextInt(allowedChars.length());
      sb.append(allowedChars.charAt(randomIndex));
    }

    return sb.toString();
  }

  public static <T> T safeGet(Supplier<T> supplier) {
    try {
      return supplier.get();
    } catch (Exception e) {
      return null;
    }
  }

  public static <T> T safeGetWithDefault(Supplier<T> supplier, T defaultValue) {
    try {
      if (supplier.get() != null)
        return supplier.get();
    } catch (Exception e) {
      return defaultValue;
    }
    return defaultValue;
  }

  public static String getIfNotEmptyOrDefault(String value, String defaultValue) {
    return StringUtils.isEmpty(value) ? defaultValue : value;
  }

  public static Field findField(Class<?> clazz, String fieldName) {
    try {
      return clazz.getDeclaredField(fieldName);
    } catch (NoSuchFieldException e) {
      Class<?> superClass = clazz.getSuperclass();
      if (superClass != null) {
        return findField(superClass, fieldName);
      }
      return null;
    }
  }

  public static String stringFormatIfNullToEmpty(String format, Object... args) {
    return String.format(format,
        Arrays.stream(args).toList().stream().map(e -> e == null ? "" : e).toArray());
  }

  public static String decodeBase64(String data) {
    return new String(Base64.getDecoder().decode(data));
  }

  public static String decodeBase64Safe(String data) {
    return new String(Base64.getUrlDecoder().decode(data));
  }

  public static String decodeUrl(String data) {
    if (data == null) {
      return null;
    } else {
      return URLDecoder.decode(data, StandardCharsets.UTF_8);
    }
  }

  private static final ObjectMapper mapper;

  static {
    mapper = new ObjectMapper();
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
  }

  public static <T> T mapJsonToObject(String jsonData, Class<T> clazz) {
    if (jsonData == null) {
      return null;
    }

    try {
      return mapper.readValue(jsonData, clazz);
    } catch (Exception e) {
      throw new CustomBusinessException(e.getMessage());
    }
  }

  public static <T> T mapJsonToObject(String jsonData, TypeReference<T> typeReference) {
    if (jsonData == null) {
      return null;
    }

    try {
      return mapper.readValue(jsonData, typeReference);
    } catch (Exception e) {
      throw new CustomBusinessException(e.getMessage());
    }
  }

  public static boolean isNumeric(String str) {
    if (str == null || str.isEmpty()) {
      return false;
    }
    try {
      Double.parseDouble(str);
      return true;
    } catch (NumberFormatException e) {
      return false;
    }
  }

  public static String generateUniqueKey() {
    String currentDateTime = LocalDateTime.now()
        .format(DateTimeFormatter.ofPattern(CommonConstants.DATE_FORMAT_YYYYMMDDHHMMSSMS));
    String generatedUuid = UUID.randomUUID().toString().replace("-", "");
    return currentDateTime + generatedUuid;
  }

  public static String getMimeType(String fileExt) {
    if (fileExt == null || fileExt.isEmpty()) {
      return "application/octet-stream";
    }

    String mimeType = "application/octet-stream";
    fileExt = fileExt.toLowerCase(); // 대소문자 무시

    switch (fileExt) {
      case "doc":
        mimeType = "application/msword";
        break;
      case "docx":
        mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
      case "xls":
        mimeType = "application/vnd.ms-excel";
        break;
      case "xlsx":
        mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      case "xml":
        mimeType = "application/xml";
        break;
      case "ppt":
        mimeType = "application/vnd.ms-powerpoint";
        break;
      case "pptx":
        mimeType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        break;
      case "txt":
        mimeType = "text/plain";
        break;
      case "csv":
        mimeType = "text/csv";
        break;
      case "json":
        mimeType = "application/json";
        break;
      case "pdf":
        mimeType = "application/pdf";
        break;
      case "png":
        mimeType = "image/png";
        break;
      case "jpg":
      case "jpeg":
        mimeType = "image/jpeg";
        break;
      case "gif":
        mimeType = "image/gif";
        break;
      case "bmp":
        mimeType = "image/bmp";
        break;
      case "svg":
        mimeType = "image/svg+xml";
        break;
      case "webp":
        mimeType = "image/webp";
        break;
      case "tiff":
      case "tif":
        mimeType = "image/tiff";
        break;
      case "mp4":
        mimeType = "video/mp4";
        break;
      case "avi":
        mimeType = "video/x-msvideo";
        break;
      case "mp3":
        mimeType = "audio/mpeg";
        break;
      case "wav":
        mimeType = "audio/wav";
        break;
      case "zip":
        mimeType = "application/zip";
        break;
      case "rar":
        mimeType = "application/vnd.rar";
        break;
      case "tar":
        mimeType = "application/x-tar";
        break;
      case "7z":
        mimeType = "application/x-7z-compressed";
        break;
      default:
        break;
    }

    return mimeType;
  }

  public static String encodeFileToBase64(String thumbnailFilePath) throws IOException {
    File file = new File(thumbnailFilePath);

    if (!file.exists()) {
      throw new IOException("파일이 존재하지 않습니다: " + thumbnailFilePath);
    }

    // 파일을 바이트 배열로 변환
    byte[] fileContent = Files.readAllBytes(file.toPath());

    // Base64 인코딩
    return Base64.getEncoder().encodeToString(fileContent);
  }

  public static String convertTemplateMessage(String messageTemplate, Object... args) {
    return MessageFormat.format(messageTemplate, args);
  }

}
