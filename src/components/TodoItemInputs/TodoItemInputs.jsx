import { Checkbox, Input, Container } from "../../ui";

export function TodoItemInputs({
  isEditing,
  onCheck,
  title,
  isComplete,
  taskIndex,
  onUserInput,
  isFocus
}) {
  return (
    <Container variant="task-main">
      <Checkbox
        onCheck={onCheck}
        title={title}
        isComplete={isComplete}
        taskIndex={taskIndex}
      />
      {!isEditing ? (
        <Input
          title={title}
          inputVariant="tasks-input"
          isComplete={isComplete}
        />
      ) : (
        <Input
          title={title}
          inputVariant="edit-input"
          onUserInput={onUserInput}
          isFocus={isFocus}
        />
      )}
    </Container>
  );
}
