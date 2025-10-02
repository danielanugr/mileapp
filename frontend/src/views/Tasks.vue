<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Task Manager</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Welcome, {{ authStore.user?.name }}</span>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="mb-6 flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-900">Tasks</h2>
          <button
            @click="openCreateModal"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            + New Task
          </button>
        </div>

        <div class="bg-white shadow rounded-lg p-6 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                v-model="filters.search"
                @input="handleSearch"
                type="text"
                placeholder="Search tasks..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="filters.status"
                @change="handleFilterChange"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                v-model="filters.priority"
                @change="handleFilterChange"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                v-model="filters.sortBy"
                @change="handleFilterChange"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="createdAt">Created Date</option>
                <option value="updatedAt">Updated Date</option>
                <option value="title">Title</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="taskStore.loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>

        <div v-else-if="taskStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {{ taskStore.error }}
        </div>

        <div v-else-if="taskStore.tasks.length === 0" class="bg-white shadow rounded-lg p-12 text-center">
          <p class="text-gray-500">No tasks found. Create your first task!</p>
        </div>

        <div v-else class="bg-white shadow rounded-lg overflow-hidden">
          <ul class="divide-y divide-gray-200">
            <li v-for="task in taskStore.tasks" :key="task.id" class="p-6 hover:bg-gray-50">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 class="text-lg font-medium text-gray-900">{{ task.title }}</h3>
                    <div class="flex items-center gap-2">
                      <span
                        :class="getStatusClass(task.status)"
                        class="px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
                      >
                        {{ task.status }}
                      </span>
                      <span
                        :class="getPriorityClass(task.priority)"
                        class="px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
                      >
                        {{ task.priority }}
                      </span>
                    </div>
                  </div>
                  <p class="mt-2 text-sm text-gray-600">{{ task.description }}</p>
                  <p class="mt-2 text-xs text-gray-400">
                    Created: {{ formatDate(task.createdAt) }} | Updated: {{ formatDate(task.updatedAt) }}
                  </p>
                </div>
                <div class="flex space-x-2 ml-4">
                  <button
                    @click="openEditModal(task)"
                    class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(task)"
                    class="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="taskStore.meta.totalPages > 1" class="mt-6 flex justify-center">
          <nav class="flex space-x-2">
            <button
              @click="goToPage(taskStore.meta.page - 1)"
              :disabled="taskStore.meta.page === 1"
              class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="px-3 py-2 text-sm text-gray-700">
              Page {{ taskStore.meta.page }} of {{ taskStore.meta.totalPages }}
            </span>
            <button
              @click="goToPage(taskStore.meta.page + 1)"
              :disabled="taskStore.meta.page === taskStore.meta.totalPages"
              class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </main>

    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ isEditing ? 'Edit Task' : 'Create New Task' }}
          </h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="form.description"
                required
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                v-model="form.priority"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div class="flex space-x-3">
              <button
                type="submit"
                :disabled="taskStore.loading"
                class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
              >
                {{ isEditing ? 'Update' : 'Create' }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useTaskStore } from '@/stores/task';
import { Task } from '@/types/task';

const router = useRouter();
const authStore = useAuthStore();
const taskStore = useTaskStore();

const showModal = ref(false);
const isEditing = ref(false);
const editingTask = ref<Task | null>(null);

const form = ref({
  title: '',
  description: '',
  status: 'pending' as 'pending' | 'in-progress' | 'completed',
  priority: 'medium' as 'low' | 'medium' | 'high'
});

const filters = ref({
  search: '',
  status: '',
  priority: '',
  sortBy: 'createdAt'
});

let searchTimeout: any = null;

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

const openCreateModal = () => {
  isEditing.value = false;
  editingTask.value = null;
  form.value = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  };
  showModal.value = true;
};

const openEditModal = (task: Task) => {
  isEditing.value = true;
  editingTask.value = task;
  form.value = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
  editingTask.value = null;
};

const handleSubmit = async () => {
  if (isEditing.value && editingTask.value) {
    const success = await taskStore.updateTask(editingTask.value.id, form.value);
    if (success) {
      closeModal();
    }
  } else {
    const success = await taskStore.createTask(form.value);
    if (success) {
      closeModal();
    }
  }
};

const confirmDelete = async (task: Task) => {
  if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
    await taskStore.deleteTask(task.id);
  }
};

const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    handleFilterChange();
  }, 300);
};

const handleFilterChange = () => {
  const query: any = { page: 1 };
  if (filters.value.search) query.search = filters.value.search;
  if (filters.value.status) query.status = filters.value.status;
  if (filters.value.priority) query.priority = filters.value.priority;
  if (filters.value.sortBy) query.sortBy = filters.value.sortBy;

  taskStore.fetchTasks(query);
};

const goToPage = (page: number) => {
  taskStore.fetchTasks({ page });
};

const getStatusClass = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };
  return classes[status as keyof typeof classes] || '';
};

const getPriorityClass = (priority: string) => {
  const classes = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800'
  };
  return classes[priority as keyof typeof classes] || '';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  taskStore.fetchTasks();
});
</script>