import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { taskApi } from '@/services/taskApi';
import { Task, CreateTaskInput, UpdateTaskInput, TaskQuery } from '@/types/task';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const meta = ref({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });

  const currentQuery = ref<TaskQuery>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const fetchTasks = async (query?: TaskQuery) => {
    loading.value = true;
    error.value = null;

    try {
      const mergedQuery = { ...currentQuery.value, ...query };
      currentQuery.value = mergedQuery;

      const response = await taskApi.getTasks(mergedQuery);

      if (response.success) {
        tasks.value = response.data;
        meta.value = response.meta;
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch tasks';
    } finally {
      loading.value = false;
    }
  };

  const createTask = async (data: CreateTaskInput) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await taskApi.createTask(data);

      if (response.success) {
        await fetchTasks(currentQuery.value);
        return true;
      }
      return false;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create task';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const updateTask = async (id: string, data: UpdateTaskInput) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await taskApi.updateTask(id, data);

      if (response.success) {
        await fetchTasks(currentQuery.value);
        return true;
      }
      return false;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update task';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteTask = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await taskApi.deleteTask(id);

      if (response.success) {
        await fetchTasks(currentQuery.value);
        return true;
      }
      return false;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete task';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    tasks,
    loading,
    error,
    meta,
    currentQuery,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    clearError
  };
});