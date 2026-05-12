import type { TasksData, TaskBody, TaskModel} from "../types/basicTypes";


export async function fetchTasks(taskFilter:string) {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${taskFilter}`
  );
  const resData: TaskModel = await response.json();

  if (!response.ok) {
    throw new Error("Failed to display task");
  }

  return resData;
}

export async function createNewTask(newTask: TaskBody) {
  const response = await fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData: TasksData  = await response.json();

  if (!response.ok) {
    throw new Error("Failed to add new task");
  }

  return resData.title;
}

export async function deleteTask(id: number) {
  const response = await fetch(
    `https://easydev.club/api/v1/todos/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resData: TasksData =  await response.json();

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return resData.title;
}

export async function changeTask(id: number, task: TaskBody) {

  const response = await fetch(
    `https://easydev.club/api/v1/todos/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resData: TasksData =  await response.json();

  if (!response.ok) {
    throw new Error("Failed to edit task");
  }

  return resData.title;
}

