class ApiResponse<T> {
    public success: boolean;
    public statusCode: number;
    public message: string;
    public data: any | T;
    constructor(statusCode: number, message: string = "success", data: T | any) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;
