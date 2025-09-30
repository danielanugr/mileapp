export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    success: boolean;
    token?: string;
    message: string;
    user?: {
        id: string;
        email: string;
        name: string;
    };
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message: string;
    errors?: string[];
}
export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
}
//# sourceMappingURL=index.d.ts.map