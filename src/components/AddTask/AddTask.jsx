import styles from "./AddTask.module.css";
import { Button, Input } from "../../ui";
import { ValidationInfo } from "../ValidationInfo";
import { useEffect } from "react";
import { createNewTask } from "../../api";

export function AddTask({
  loadTasks,
  setError,
  taskObject,
  onUserInput,
  isFocus,
  isValid,
  focus,
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
          isFocus={isFocus}
          placeholder="Task To Be Done..."
          type="text"
        />
        <Button name="create-task" isValid={isValid}>
          Add
        </Button>
      </div>
      {focus && !isValid && (
        <ValidationInfo>{validationMessage}</ValidationInfo>
      )}
    </form>
  );
}
