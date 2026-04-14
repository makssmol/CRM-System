import { TodoListContainer } from "../TodoListContainer";
import { TaskCheckbox } from "../TaskCheckbox";
import { TaskInput } from "../Taskinput";

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
    <TodoListContainer variant="task-main">
      <TaskCheckbox
        onCheck={onCheck}
        title={title}
        isComplete={isComplete}
        taskIndex={taskIndex}
      />
      {!isEditing ? (
        <TaskInput
          title={title}
          inputVariant="tasks-input"
          isComplete={isComplete}
        />
      ) : (
        <TaskInput
          title={title}
          inputVariant="edit-input"
          onUserInput={onUserInput}
          isFocus={isFocus}
        />
      )}
    </TodoListContainer>
  );
}
