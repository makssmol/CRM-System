import styles from "./AddTask.module.css";
import { Button, Input } from "../../ui";
import { useEffect } from "react";
import { createNewTask } from "../../api";

export function AddTask({
  loadTasks,
  setError,
  taskObject,
  onUserInput,
  isValid,
  validationMessage,
}) {
  function handleAddTask(newTask) {
    async function addTask(newTask) {
      if (!newTask) {
        return;
      }
      try {
        await createNewTask(newTask);
        await loadTasks()
      } catch (error) {
        setError(error.message || "Не удалось добавить задачу");
      }
    }

    addTask(newTask);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask?.(taskObject);
      }}
    >
      <div className={styles.header}>
        <Input
          name="create-task"
          inputVariant="input"
          onChange={(event) => onUserInput?.(event.target.value)}
          placeholder="Task To Be Done..."
          type="text"
          validationMessage={validationMessage}
        />
        <Button name="create-task" isValid={isValid}>
          Add
        </Button>
      </div>
    </form>
  );
}
