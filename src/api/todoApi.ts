import type {
  Todo,
  MetaResponse,
  TodoFilter,
  TodoInfo,
  TodoRequest,
} from "../types/basicTypes";
import axios from "axios";

const todoURL = "https://easydev.club/api/v1/todos";
const instance = axios.create({
  baseURL: todoURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchTasks(
  filter: TodoFilter
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await instance.get<MetaResponse<Todo, TodoInfo>>("", {
    params: {
      filter,
    },
  });

  if (!response) {
    throw new Error("Не удалось загрузить задачи");
  }
  return response.data;
}

export async function createNewTask(title: string): Promise<TodoRequest> {
  const response = await instance.post<TodoRequest>("", {
    title: title,
  });

  if (!response) {
    throw new Error("Не удалось добавить задачу");
  }

  return response.data;
}

export async function deleteTask(id: number): Promise<TodoRequest> {
  const response = await instance.delete<TodoRequest>(`/${id}`);

  if (!response) {
    throw new Error("Не удалось удалить задачу");
  }
  
  return response.data;
}

export async function changeTask(
  id: number,
  title: string,
  isDone: boolean
): Promise<string> {
  const response = await instance.put<string>(`/${id}`, {
    title: title,
    isDone: isDone,
  });

  if (!response) {
    throw new Error("Не удалось отредактировать задачу");
  }

  return response.data;
}
