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
    throw new Error("Failed to create new task");
  }

  return resData.title;
}


