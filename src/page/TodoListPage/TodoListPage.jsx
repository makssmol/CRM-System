import { useState } from "react";
import {
  AddTask,
  TaskTabs,
  TodoList,
  TodoListContainer,
  TaskError,
} from "../../components";
import { useTodo, useValidation } from "../../hooks";

export function TodoListPage() {
  const [selectedTask, setSelectedTask] = useState("all");

  const [taskBody, setTaskBody] = useState({
    isDone: false,
    title: "",
  });
  const { validation, validateTitle, focus, isFocus } = useValidation();
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
    if (title.length > 64) {
      return;
    }
    validateTitle(title);
    setTaskBody({ isDone: false, title });
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
    return <TaskError title="An error occurred" message={error} />;
  }
  if (!task || !info) {
    return <p>No tasks available</p>;
  }

  return (
    <TodoListContainer variant="todo">
      <AddTask
        onSub={handleAddTask}
        taskObject={taskBody}
        onUserInput={handleInputChange}
        isFocus={isFocus}
        isValid={validation.isValid}
        focus={focus}
        validationMessage={validation.message}
      />
      <TodoListContainer variant="content">
        <TaskTabs
          info={info}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
        <TodoList
          isFetching={isFetching}
          task={task}
          onDelete={deleteTaskbyId}
          onEdit={handleEdit}
          onEditConfirm={handleEditConfirmation}
          editingId={editingId}
          onCheck={handleTaskCompletion}
        />
      </TodoListContainer>
    </TodoListContainer>
  );
}
