import styles from "./AddTask.module.css";
import { Button, Input } from "../../ui";
import { useEffect } from "react";
import { createNewTask } from "../../api";
import type { TaskBody } from "../../types/basicTypes";

export const AddTask: React.FC<{
  loadTasks: (arg: string) => void;
  setError: (errorMessage: string | null) => void;
  taskObject: TaskBody;
  onUserInput: (title: string) => void;
  isValid: boolean;
  validationMessage: string;
  selectedTask: string;
}> = (props) => {
  const {
    loadTasks,
    setError,
    taskObject,
    onUserInput,
    isValid,
    validationMessage,
    selectedTask,
  } = props;

  function handleAddTask(newTask: TaskBody) {
    async function addTask(newTask: TaskBody) {
      if (!newTask) {
        return;
      }
      try {
        await createNewTask(newTask);
        loadTasks(selectedTask);
      } catch (error: any) {
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
          inputVariant="input"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onUserInput?.(event.target.value)}
          placeholder="Task To Be Done..."
          type="text"
          validationMessage={validationMessage}
        />
        <Button isValid={isValid}>
          Add
        </Button>
      </div>
    </form>
  );
};
