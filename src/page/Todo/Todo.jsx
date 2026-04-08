import { useState } from "react";
import {
  TodoListContainer,
  TaskButton,
  TaskInput,
  Tasks,
  TaskError,
  TaskForm,
} from "../../components";
import { useTodo } from "../../hooks";

export function Todo() {
  const [selectedTask, setSelectedTask] = useState("all");
  const [taskBody, setTaskBody] = useState({
    isDone: false,
    title: "",
  });
  const [isValid, setIsValid] = useState("");
  const {
    task,
    info,
    isFetching,
    error,
    deleteTaskbyId,
    addTask,
    editTaskById,
    editingId,
    setEditingId,
    handleEditConfirmation,
    markTaskForCompletion,
  } = useTodo(selectedTask);

  function handleInputChange(title) {
    if (title.length >= 64) {
      setIsValid("Максимальная длина текста 64 символа");
    } else if (title.length < 2) {
      setIsValid("Минимальная длина текста 2 символа");
    } else if (title.length === "") {
      setIsValid("Это поле не может быть пустым");
    } else {
      setIsValid("");
      setTaskBody({ isDone: false, title });
    }
  }

  function handleAddTask(_, taskObject) {
    addTask(taskObject);
  }

  function handleEdit(taskIndex, taskObject) {
    editTaskById(taskIndex, taskObject);
    setEditingId(null);
  }

  function handleTaskCompletion(taskIndex, title, isComplete) {
    if (taskIndex) {
      markTaskForCompletion(taskIndex, {
        isDone: !isComplete,
        title: `${title}`,
      });
    } else {
      return;
    }
  }

  if (error) {
    console.log("error: ", error);
    return <TaskError title="An error occurred" message={error} />;
  }
  if (!task || !info) {
    return <p>No tasks available</p>;
  }

  return (
    <TodoListContainer variant="todo">
      <TaskForm variant="header" onSub={handleAddTask} taskObject={taskBody}>
        <TaskInput inputVariant="create-task" onUserInput={handleInputChange} />
        <TaskButton type="submit">Add</TaskButton>
        {isValid && <p className="valid-input">{isValid}</p>}
      </TaskForm>
      <TodoListContainer variant="content">
        <TodoListContainer variant="tabs">
          {Object.entries(info).map(([status, values], index) => (
            <TaskButton
              key={index}
              variant="tab-button"
              selected={selectedTask === status}
              onConfirm={() => setSelectedTask(status)}
            >
              {status.trim()}({values})
            </TaskButton>
          ))}
        </TodoListContainer>
        {isFetching && <p>Tasks are loading</p>}
        {!isFetching &&
          task.map((data) => (
            <Tasks
              key={data.id}
              taskIndex={data.id}
              title={data.title}
              onDelete={deleteTaskbyId}
              onEdit={handleEdit}
              onEditConfirm={handleEditConfirmation}
              isEditing={editingId === data.id}
              onCheck={handleTaskCompletion}
              isComplete={data.isDone}
              isValid={isValid}
              setIsValid={setIsValid}
            />
          ))}
      </TodoListContainer>
    </TodoListContainer>
  );
}
