export interface TasksData {
  created: string;
  id: number;
  isDone: boolean;
  title: string;
}

export interface TaskInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface TaskModel {
  data: TasksData[];
  info: TaskInfo;
  meta: {
    totalAmount: number;
  };
}

export type TaskBody = Omit<TasksData, 'created' | 'id'>