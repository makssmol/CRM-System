import styles from "./AddTask.module.css";
import { Form } from "../Form";
import { Button, Input } from "../../ui";
import { ValidationInfo } from "../ValidationInfo";

export function AddTask({
  onSub,
  taskObject,
  onUserInput,
  isFocus,
  isValid,
  focus,
  validationMessage,
}) {
  return (
    <Form onSub={onSub} taskObject={taskObject}>
      <div className={styles.header}>
        <Input
          inputVariant="create-task"
          onUserInput={onUserInput}
          isFocus={isFocus}
        />
        <Button type="submit" isValid={isValid}>
          Add
        </Button>
      </div>
      {focus && !isValid && (
        <ValidationInfo>{validationMessage}</ValidationInfo>
      )}
    </Form>
  );
}
