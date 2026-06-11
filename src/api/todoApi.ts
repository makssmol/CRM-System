import type {
  Todo,
  MetaResponse,
  TodoFilter,
  TodoInfo,
  TodoRequest,
} from "../types/basicTypes";
import axios from "axios";

const todoURL = "https://easydev.club/api/v1/todos";

export async function fetchTasks(
  taskFilter: TodoFilter
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await axios.get<MetaResponse<Todo, TodoInfo>>(
    `${todoURL}?filter=${taskFilter}`
  );

  if (!response) {
    throw new Error("Не удалось загрузить задачи");
  }
  console.log("response: ", response);
  return response.data;
}

export async function createNewTask(title: string): Promise<TodoRequest> {
  const response = await axios.post<TodoRequest>(todoURL, {
    title: title,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response) {
    throw new Error("Не удалось добавить задачу");
  }

  return response.data;
}

export async function deleteTask(id: number): Promise<TodoRequest> {
  const response = await axios.delete<TodoRequest>(`${todoURL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

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
  const response = await axios.put<string>(`${todoURL}/${id}`, {
    title: title,
    headers: {
      "Content-Type": "application/json",
    },
    isDone: isDone,
  });

  if (!response) {
    throw new Error("Не удалось отредактировать задачу");
  }

  return response.data;
}
