package com.geektry.console.framework;

import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;

/**
 * @author Chaohang Fu
 */
@RestControllerAdvice
public class RuntimeExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    ResponseEntity<RuntimeExceptionEntity> handleRuntimeException(ServiceRuntimeException exception) {
        return new ResponseEntity<>(new RuntimeExceptionEntity() {{
            setMessage(exception.getMessage());
        }}, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    ResponseEntity<RuntimeExceptionEntity> handleFeignException(FeignException exception) throws IOException {
        String originMessage = exception.getMessage();
        String[] originMessageArray = originMessage.split("\n");
        String message;
        if (originMessageArray.length == 2) {
            String jsonStrResponse = originMessageArray[1];
            message = new ObjectMapper().readTree(jsonStrResponse).path("message").asText();
        } else {
            message = originMessage;
        }
        return new ResponseEntity<>(new RuntimeExceptionEntity() {{
            setMessage(message);
        }}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
