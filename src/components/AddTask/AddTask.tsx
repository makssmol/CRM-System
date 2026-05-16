import styles from "./AddTask.module.css";
import { Button, Input } from "../../ui";
import { createNewTask } from "../../api";
import type { TodoFilter } from "../../types/basicTypes";
import { useState } from "react";
import { useValidation } from "../../hooks";

export const AddTask: React.FC<{
  loadTasks: (arg: TodoFilter) => void;
  setError: (errorMessage: string | null) => void;
  selectedTask: TodoFilter;
}> = (props) => {
  const {
    loadTasks,
    setError,
    selectedTask,
  } = props;
  const [taskText, setTaskText] = useState<string>("");

  const { validation, validateTitle } = useValidation();

  function handleInputChange(title: string): void {
    validateTitle(title);
    setTaskText(title);
  }

  function handleAddTask(event: React.SubmitEvent<HTMLFormElement>, title: string): void {
    event.preventDefault();
    async function addTask(title: string): Promise<void> {
      if (!title) {
        return;
      }
      try {
        // await validateTitle(title);
        await createNewTask(title);
        await loadTasks(selectedTask);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Не удалось добавить задачу");
        }
      }
    }

    addTask(title);
  }

  return (
    <form
      onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => {
        handleAddTask(event, taskText);
      }}
    >
      <div className={styles.header}>
        <Input
          inputVariant="input"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event.target.value)
          }
          placeholder="Задача на выполнение..."
          type="text"
          validationMessage={validation.message}
        />
        <Button disabled={validation.isValid}>Добавить</Button>
      </div>
    </form>
  );
};
