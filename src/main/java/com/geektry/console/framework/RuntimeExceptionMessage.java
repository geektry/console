package com.geektry.console.framework;

/**
 * @author Chaohang Fu
 */
public enum RuntimeExceptionMessage {

    /**
     * RuntimeExceptionMessage
     */
    SESSION_EXPIRED("会话已失效，请重新登录~"),
    PASSWORD_INVALID("密码不正确~"),
    WEIGHT_RECORD_DATE_INVALID("今天已经记过体重咯~"),
    WEIGHT_NULL("体重不能为空~");

    private String message;

    RuntimeExceptionMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
