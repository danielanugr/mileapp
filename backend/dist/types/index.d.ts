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
export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateTaskRequest {
    title: string;
    description: string;
    status?: 'pending' | 'in-progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
}
export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    status?: 'pending' | 'in-progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
}
export interface TaskQuery {
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'priority' | 'status';
    sortOrder?: 'asc' | 'desc';
    status?: 'pending' | 'in-progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
    search?: string;
}
export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
//# sourceMappingURL=index.d.ts.map