class ApiResponse {
    public success: boolean;
    public statusCode: number;
    public message: string;
    public data: any;
    constructor(statusCode: number, message: string = "success", data: any) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;