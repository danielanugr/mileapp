import api from './api';
import { Task, CreateTaskInput, UpdateTaskInput, TaskQuery, TasksResponse } from '@/types/task';

export const taskApi = {
  async getTasks(query: TaskQuery = {}): Promise<TasksResponse> {
    const params = new URLSearchParams();

    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.sortBy) params.append('sortBy', query.sortBy);
    if (query.sortOrder) params.append('sortOrder', query.sortOrder);
    if (query.status) params.append('status', query.status);
    if (query.priority) params.append('priority', query.priority);
    if (query.search) params.append('search', query.search);

    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  },

  async createTask(data: CreateTaskInput): Promise<{ success: boolean; data: Task; message: string }> {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  async updateTask(id: string, data: UpdateTaskInput): Promise<{ success: boolean; data: Task; message: string }> {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  async deleteTask(id: string): Promise<{ success: boolean; data: Task; message: string }> {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  }
};