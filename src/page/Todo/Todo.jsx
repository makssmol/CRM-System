import { useEffect, useState } from "react";
import {
  TodoListContainer,
  TaskButton,
  TaskInput,
  Tasks,
  TaskError,
} from "../../components";
import { createNewTask } from "../../util/http";

export function Todo() {
  const [isFetching, setIsFetching] = useState(false);
  const [selectedTask, setSelectedTask] = useState("all");
  const [taskObject, setTaskObject] = useState({});
  const [error, setError] = useState();
  const [newTask, setNewTask] = useState({});
  
  console.log("newTask1: ", newTask);

  function handleSelect(status) {
    setSelectedTask(status);
  }

  async function fetchTasks(selectedTask) {
    setIsFetching(true);

    try {
      const response = await fetch(
        `https://easydev.club/api/v1/todos?filter=${selectedTask}`,
      );
      const resData = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      setTaskObject(resData);
      // console.log(resData);
    } catch (error) {
      setError(error);
    }
    setIsFetching(false);
  }

  useEffect(() => {
    fetchTasks(selectedTask);
  }, [selectedTask]);

  function handleInputChange(title) {
    setNewTask(() => {
      return {
        isDone: true,
        title: `${title}`,
      };
    });
  }

  function handleConfirmTask(newTask) {
    createNewTask(newTask);
  }

  // console.log(taskObject);
  if (!taskObject.data) {
    if (error) {
      return <TaskError title="An error occurred" message={error.message} />;
    }
    return <p>No tasks available</p>;
  }

  if (!taskObject.info) {
    if (error) {
      return <TaskError title="An error occurred" message={error.message} />;
    }
    return <p>No tasks available</p>;
  }
  console.log("info: ", taskObject.info);

  const taskTabs = Object.entries(taskObject.info).map(
    ([status, values], index) => ({
      id: index,
      status,
      values,
    }),
  );

  console.log("taskTabs: ", taskTabs);
  console.log("newTask2: ", newTask);
  return (
    <TodoListContainer variant="todo">
      <TodoListContainer variant="header">
        <TaskInput inputVariant="create-task" onUserInput={handleInputChange} />
        <TaskButton onConfirm={handleConfirmTask} taskObject={newTask}>
          Add
        </TaskButton>
      </TodoListContainer>
      <TodoListContainer variant="content">
        <TodoListContainer variant="tabs">
          {taskTabs.map((tab) => (
            <TaskButton
              key={tab.id}
              variant="tab-button"
              selected={selectedTask === tab.status}
              onConfirm={() => handleSelect(tab.status)}
            >
              {tab.status}({tab.values})
            </TaskButton>
          ))}
        </TodoListContainer>
        {isFetching && <p>Tasks are loading</p>}
        {!isFetching &&
          taskObject.data.map((data) => (
            <Tasks key={data.id} taskIndex={data.id} title={data.title} />
          ))}
      </TodoListContainer>
    </TodoListContainer>
  );
}
