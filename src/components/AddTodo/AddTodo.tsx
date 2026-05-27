import styles from "./AddTodo.module.css";
import { Button, Input } from "../../ui";
import { createNewTask } from "../../api/todoApi";
import { useState, useEffect } from "react";
import { useValidation } from "../../hooks/useValidation";

export const AddTodo: React.FC<{
  updateTodo: () => void;
}> = (props) => {
  const { updateTodo } = props;
  const [taskText, setTaskText] = useState<string>("");
  const [error, setError] = useState<string | null>();
  const { validation, validateTitle } = useValidation();

  function handleTaskInput(title: string): void {
    validateTitle(title);
    setTaskText(title);
  }

  async function handleAddTask(
    event: React.SubmitEvent<HTMLFormElement>,
    title: string
  ): Promise<void> {
    event.preventDefault();
    if (!title) {
      return;
    }
    try {
      await createNewTask(title);
      await updateTodo();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Не удалось добавить задачу");
      }
    }
  }

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

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
            handleTaskInput(event.target.value)
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
