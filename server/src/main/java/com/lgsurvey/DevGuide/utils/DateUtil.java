package com.lgsurvey.DevGuide.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class DateUtil {

  public static String formatChange(String date, String fromFormatString, String toFormatString) {

    SimpleDateFormat fromFormat = new SimpleDateFormat(fromFormatString);
    SimpleDateFormat toFormat = new SimpleDateFormat(toFormatString);
    Date fromDate = null;

    try {
      fromDate = fromFormat.parse(date);
    } catch (ParseException e) {
      return date;
    }

    return toFormat.format(fromDate);
  }

  public static int dayOfWeek() {
    Calendar cal = Calendar.getInstance();
    cal.setTime(new Date());
    return cal.get(Calendar.DAY_OF_WEEK);
  }

  public static String getHours() {
    Calendar cal = Calendar.getInstance();
    cal.setTime(new Date());
    return String.format("%02d", cal.get(Calendar.HOUR_OF_DAY));
  }

  public static String getMinute() {
    Calendar cal = Calendar.getInstance();
    cal.setTime(new Date());
    return String.format("%02d", cal.get(Calendar.MINUTE));
  }

  public static String now(String formatString) {
    SimpleDateFormat toFormat = new SimpleDateFormat(formatString);
    Date fromDate = new Date();
    return toFormat.format(fromDate);
  }

  public static String toSimpleFormat(long value) {
    Date date = new Date(value);
    SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
    return df2.format(date);
  }

  public static String toDateFormat(long value, String formatString) {
    Date date = new Date(value);
    SimpleDateFormat toFormat = new SimpleDateFormat(formatString);
    return toFormat.format(date);
  }

  public static String timeFormatParser(String dateTime) {
    DateTimeFormatter inputFormatter =
        DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.KOREA);
    return LocalTime.parse(dateTime, inputFormatter).toString();
  }
}

