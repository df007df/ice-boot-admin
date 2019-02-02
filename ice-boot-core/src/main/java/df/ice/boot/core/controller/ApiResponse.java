package df.ice.boot.core.controller;

/**
 * Created by df on 2018/9/5.
 */
public class ApiResponse<T> {

    private String message = "";

    private boolean success = true;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    private int code = 0;

    private T data;

    public ApiResponse(T data) {
        this.data = data;
    }

    public ApiResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    static class ApiErrorResponse extends ApiResponse {

        public ApiErrorResponse(String msg) {
            this.setSuccess(false);
            this.setMessage(msg);
        }
    }
}
