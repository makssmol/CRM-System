import { TaskForm } from "../TaskForm";
import { TaskInput } from "../Taskinput";
import { TaskButton } from "../TaskButton";
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
    <TaskForm variant="header" onSub={onSub} taskObject={taskObject}>
      <TaskInput
        inputVariant="create-task"
        onUserInput={onUserInput}
        isFocus={isFocus}
      />
      <TaskButton type="submit" isValid={isValid}>
        Add
      </TaskButton>
      {focus && !isValid && (
        <ValidationInfo>{validationMessage}</ValidationInfo>
      )}
    </TaskForm>
  );
}
