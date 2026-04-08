export async function fetchTasks(selectedTask) {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${selectedTask}`
  );
  const resData = await response.json();
  console.log("resData😒😒: ", resData);

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
  console.log("resData: ", resData);

  if (!response.ok) {
    throw new Error("Failed to add new task");
  }

  return resData.title;
}

export async function deleteTask(taskIndex) {
  console.log("taskIndex: ", taskIndex);

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
  console.log("deleteData: ", resData);

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return resData.title;
}

export async function editTask(taskIndex, taskObject) {
  console.log("taskObject: ", taskObject);
  console.log("taskIndex: ", taskIndex);

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
  console.log("editedData: ", resData);

  if (!response.ok) {
    throw new Error("Failed to edit task");
  }

  return resData.title;
}

export async function taskCompletion(taskIndex, taskObject) {
  console.log("taskObject: ", taskObject);
  console.log("taskIndex: ", taskIndex);

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
  console.log("editedData: ", resData);

  if (!response.ok) {
    throw new Error("Failed to mark task completion");
  }

  return resData.title;
}
