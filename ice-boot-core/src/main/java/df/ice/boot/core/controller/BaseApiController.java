package df.ice.boot.core.controller;

import javax.validation.ValidationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by df on 2018/7/22.
 */
@RestController
public abstract class BaseApiController {

    private static Logger runLogger = LoggerFactory.getLogger(BaseApiController.class);

    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(Exception.class)
    public ApiResponse apiException(Exception e) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(HttpStatus.BAD_REQUEST.value());
        apiResponse.setMessage(e.getMessage());
        apiResponse.setSuccess(false);

        runLogger.error(e.getMessage());
        e.printStackTrace();

        return apiResponse;
    }

    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse handle(ValidationException e) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(HttpStatus.BAD_REQUEST.value());
        apiResponse.setMessage(e.getMessage());
        apiResponse.setSuccess(false);

        runLogger.error("ValidationException: {}", e.getMessage());
        e.printStackTrace();

        return apiResponse;
    }
}
