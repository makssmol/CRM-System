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

export async function deleteTask(id) {
  const response = await fetch(
    `https://easydev.club/api/v1/todos/${id}`,
    {
      method: "DELETE",
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

export async function changeTask(id, task) {

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
  const resData = response;

  if (!response.ok) {
    throw new Error("Failed to edit task");
  }

  return resData.title;
}

