import { Task } from '../types';

export let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the API endpoints',
    status: 'in-progress',
    priority: 'high',
    userId: '1',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: '2',
    title: 'Fix authentication bug',
    description: 'Resolve issue with token expiration',
    status: 'completed',
    priority: 'high',
    userId: '1',
    createdAt: new Date('2024-01-14T09:00:00Z'),
    updatedAt: new Date('2024-01-15T11:00:00Z')
  },
  {
    id: '3',
    title: 'Update UI components',
    description: 'Refresh the design of login and dashboard pages',
    status: 'pending',
    priority: 'medium',
    userId: '1',
    createdAt: new Date('2024-01-13T08:00:00Z'),
    updatedAt: new Date('2024-01-13T08:00:00Z')
  },
  {
    id: '4',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    status: 'pending',
    priority: 'low',
    userId: '2',
    createdAt: new Date('2024-01-12T07:00:00Z'),
    updatedAt: new Date('2024-01-12T07:00:00Z')
  },
  {
    id: '5',
    title: 'Write unit tests',
    description: 'Add test coverage for all API endpoints',
    status: 'in-progress',
    priority: 'medium',
    userId: '2',
    createdAt: new Date('2024-01-11T06:00:00Z'),
    updatedAt: new Date('2024-01-14T10:00:00Z')
  }
];

let taskIdCounter = 6;

export const getNextTaskId = (): string => {
  return String(taskIdCounter++);
};