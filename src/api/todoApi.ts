import type { Todo, TodoRequest, MetaResponce, TodoFilter } from "../types/basicTypes";

export async function fetchTasks(taskFilter: TodoFilter): Promise<MetaResponce> {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${taskFilter}`
  );
  const resData: MetaResponce = await response.json();

  if (!response.ok) {
    throw new Error("Failed to display task");
  }

  return resData;
}

export async function createNewTask(newTask: TodoRequest): Promise<string> {
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

export async function changeTask(id: number, task: TodoRequest): Promise<string>{
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
