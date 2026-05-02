
class ApiError extends Error {
    public statusCode: number;
    public errors: any[];
    public success: boolean;
    public message = "something went wrong";

    constructor(statusCode: number = 500, errorMessage: string, errors: any[] = []) {
        super(errorMessage);

        this.statusCode = statusCode;
        this.message = errorMessage;
        this.errors = errors;
        this.success = false;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;