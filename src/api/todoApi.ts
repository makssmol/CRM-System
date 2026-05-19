import type {
  Todo,
  TodoRequest,
  MetaResponse,
  TodoFilter,
  TodoInfo,
} from "../types/basicTypes";

export async function fetchTasks(
  taskFilter: TodoFilter
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${taskFilter}`
  );
  const resData: MetaResponse<Todo, TodoInfo> = await response.json();

  if (!response.ok) {
    throw new Error("Failed to display task");
  }

  return resData;
}

export async function createNewTask(title: string): Promise<string> {
  const newTask: TodoRequest = {
    title: title,
    isDone: false,
  };

  const response = await fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData: Todo = await response.json();

  if (!response.ok) {
    throw new Error("Failed to add new task");
  }

  return resData.title;
}

export async function deleteTask(id: number): Promise<Todo> {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const text = await response.text();
  const resData: Todo = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  return resData;
}

export async function changeTask(
  id: number,
  title: string,
  isDone: boolean
): Promise<string> {

  const task:TodoRequest = {
    title: title,
    isDone: isDone,
  }

  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData: Todo = await response.json();

  if (!response.ok) {
    throw new Error("Failed to edit task");
  }

  return resData.title;
}
