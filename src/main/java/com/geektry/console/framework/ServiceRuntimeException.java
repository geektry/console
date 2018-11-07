package com.geektry.console.framework;

/**
 * @author Chaohang Fu
 */
public class ServiceRuntimeException extends RuntimeException {

    public ServiceRuntimeException(RuntimeExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
