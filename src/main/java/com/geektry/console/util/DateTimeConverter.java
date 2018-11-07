package com.geektry.console.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * @author Chaohang Fu
 */
public class DateTimeConverter {

    private static final DateTimeFormatter FORMATTER =  DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static LocalDateTime toDateTime(String dateTimeStr) {
        return dateTimeStr == null ? null : LocalDateTime.parse(dateTimeStr, FORMATTER);
    }

    public static String toDateTimeStr(LocalDateTime dateTime) {
        return dateTime.format(FORMATTER);
    }
}
