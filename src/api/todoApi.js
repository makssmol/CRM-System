export async function fetchTasks(taskFilter) {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${taskFilter}`
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to display task");
  }

  return resData;
}
export async function createNewTask(newTask) {
  const response = await fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to add new task");
  }

  return resData.title;
}

export async function deleteTask(taskIndex) {

  const response = await fetch(
    `https://easydev.club/api/v1/todos/${taskIndex}`,
    {
      method: "DELETE",
      body: JSON.stringify(taskIndex),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resData = response;

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return resData.title;
}

export async function editTask(taskIndex, taskObject) {

  const response = await fetch(
    `https://easydev.club/api/v1/todos/${taskIndex}`,
    {
      method: "PUT",
      body: JSON.stringify(taskObject),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resData = response;

  if (!response.ok) {
    throw new Error("Failed to edit task");
  }

  return resData.title;
}

export async function taskCompletion(taskIndex, taskObject) {

  const response = await fetch(
    `https://easydev.club/api/v1/todos/${taskIndex}`,
    {
      method: "PUT",
      body: JSON.stringify(taskObject),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resData = response;

  if (!response.ok) {
    throw new Error("Failed to mark task completion");
  }

  return resData.title;
}
