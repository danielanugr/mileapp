import { Response } from 'express';
import { Task, CreateTaskRequest, UpdateTaskRequest, PaginatedResponse } from '../types';
import { AuthenticatedRequest } from '../middleware/auth';
import { mockTasks, getNextTaskId } from '../data/tasks';

export const getTasks = (req: AuthenticatedRequest, res: Response<PaginatedResponse<Task>>) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 }
      });
    }

    const {
      page = '1',
      limit = '10',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
      priority,
      search
    } = req.query as Record<string, string>;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    let filteredTasks = mockTasks.filter(task => task.userId === userId);

    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    if (priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    filteredTasks.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Task];
      let bValue: any = b[sortBy as keyof Task];

      if (aValue instanceof Date) {
        aValue = aValue.getTime();
        bValue = (bValue as Date).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    const total = filteredTasks.length;
    const totalPages = Math.ceil(total / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedTasks,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages
      }
    });

  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 }
    });
  }
};

export const createTask = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const { title, description, status = 'pending', priority = 'medium' } = req.body as CreateTaskRequest;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    const newTask: Task = {
      id: getNextTaskId(),
      title,
      description,
      status,
      priority,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockTasks.push(newTask);

    res.status(201).json({
      success: true,
      data: newTask,
      message: 'Task created successfully'
    });

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateTask = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const { id } = req.params;
    const updates = req.body as UpdateTaskRequest;

    const taskIndex = mockTasks.findIndex(task => task.id === id && task.userId === userId);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const updatedTask: Task = {
      ...mockTasks[taskIndex],
      ...updates,
      updatedAt: new Date()
    };

    mockTasks[taskIndex] = updatedTask;

    res.json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully'
    });

  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteTask = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const { id } = req.params;

    const taskIndex = mockTasks.findIndex(task => task.id === id && task.userId === userId);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const deletedTask = mockTasks[taskIndex];
    mockTasks.splice(taskIndex, 1);

    res.json({
      success: true,
      data: deletedTask,
      message: 'Task deleted successfully'
    });

  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};