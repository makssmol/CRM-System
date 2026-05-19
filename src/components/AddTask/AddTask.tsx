import styles from "./AddTask.module.css";
import { Button, Input } from "../../ui";
import { createNewTask } from "../../api";
import { useState } from "react";
import { useValidation } from "../../hooks";
import { TaskError } from "../TaskError";

export const AddTask: React.FC<{
  updateTodo: () => void;
}> = (props) => {
  const {
    updateTodo,
  } = props;
  const [taskText, setTaskText] = useState<string>("");
  const [error, setError] = useState<string | null>();

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
        await updateTodo();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Не удалось добавить задачу");
        }
      }
    }

    addTask(title);
  }

  if (error) {
      return <TaskError title="An error occurred" message={error} />;
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
