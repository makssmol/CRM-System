import type {
  Todo,
  MetaResponse,
  TodoFilter,
  TodoInfo,
  TodoRequest,
} from "../types/basicTypes";
import axios from "axios";

const todoURL = "https://easydev.club/api/v1";
const instance = axios.create({
  baseURL: todoURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchTasks(
  filter: TodoFilter
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await instance.get<MetaResponse<Todo, TodoInfo>>("todos", {
    params: {
      filter,
    },
  });

  return response.data;
}

export async function createNewTask(title: string): Promise<TodoRequest> {
  const response = await instance.post<TodoRequest>("todos", {
    title: title,
  });

  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await instance.delete<TodoRequest>(`todos/${id}`);
}

export async function changeTask(
  id: number,
  title: string,
  isDone: boolean
): Promise<string> {
  const response = await instance.put<string>(`todos/${id}`, {
    title: title,
    isDone: isDone,
  });

  return response.data;
}
