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
    <Form variant="header" onSub={onSub} taskObject={taskObject}>
      <Input
        inputVariant="create-task"
        onUserInput={onUserInput}
        isFocus={isFocus}
      />
      <Button type="submit" isValid={isValid}>
        Add
      </Button>
      {focus && !isValid && (
        <ValidationInfo>{validationMessage}</ValidationInfo>
      )}
    </Form>
  );
}
