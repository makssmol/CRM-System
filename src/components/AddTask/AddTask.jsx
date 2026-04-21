import styles from "./AddTask.module.css";
import { Button, Input } from "../../ui";
import { ValidationInfo } from "../ValidationInfo";

export function AddTask({
  handleAddTask,
  taskObject,
  onUserInput,
  isFocus,
  isValid,
  focus,
  validationMessage,
}) {
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
        <Button name="create-task" isValid={isValid}>Add</Button>
      </div>
      {focus && !isValid && (
        <ValidationInfo>{validationMessage}</ValidationInfo>
      )}
    </form>
  );
}
