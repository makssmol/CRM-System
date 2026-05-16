import styles from "./AddTask.module.css";
import { Button, Input } from "../../ui";
import { createNewTask } from "../../api";
import type { TodoRequest, TodoFilter } from "../../types/basicTypes";

export const AddTask: React.FC<{
  loadTasks: (arg: TodoFilter) => void;
  setError: (errorMessage: string | null) => void;
  taskObject: TodoRequest;
  onUserInput: (title: string) => void;
  isValid: boolean;
  validationMessage: string;
  selectedTask: TodoFilter;
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

  function handleAddTask(newTask: TodoRequest): void {
    async function addTask(newTask: TodoRequest): Promise<void> {
      if (!newTask) {
        return;
      }
      try {
        await createNewTask(newTask);
        await loadTasks(selectedTask);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Не удалось добавить задачу");
        }
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onUserInput?.(event.target.value)
          }
          placeholder="Задача на выполнение..."
          type="text"
          validationMessage={validationMessage}
        />
        <Button isValid={isValid}>Добавить</Button>
      </div>
    </form>
  );
};
