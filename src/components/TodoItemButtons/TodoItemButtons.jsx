import { TodoListContainer } from "../TodoListContainer";
import { TaskButton } from "../TaskButton";
import { Icon } from "../Icon";


export function TodoItemButtons({isEditing, isValid, onEditConfirm, taskIndex, onDelete}) {
  return (
    <>
      {isEditing ? (
        <TodoListContainer variant="task-buttons">
          <TaskButton
            variant="confirm-action"
            type="submit"
            isValid={isValid}
          >
            <Icon name="confirm" />
          </TaskButton>
          <TaskButton variant="cancel-action" onConfirm={onEditConfirm}>
            <Icon name="cancel" />
          </TaskButton>
        </TodoListContainer>
      ) : (
        <TodoListContainer variant="task-buttons">
          <TaskButton
            variant="redact"
            onConfirm={onEditConfirm}
            taskIndex={taskIndex}
          >
            <Icon name="edit" />
          </TaskButton>
          <TaskButton
            variant="delete"
            onConfirm={onDelete}
            taskIndex={taskIndex}
          >
            <Icon name="delete" />
          </TaskButton>
        </TodoListContainer>
      )}
    </>
  );
}
