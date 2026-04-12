import { TodoListContainer } from "../TodoListContainer";
import { TaskButton } from "../TaskButton";
import { TaskCheckbox } from "../TaskCheckbox";
import { TaskInput } from "../Taskinput";
import { TaskForm } from "../TaskForm";
import { Icon } from "../Icon";
import { useState } from "react";
import { useValidation } from "../../hooks";
import { ValidationInfo } from "../ValidationInfo";

export function Tasks({
  taskIndex,
  title,
  onDelete,
  onEdit,
  onEditConfirm,
  isEditing,
  onCheck,
  isComplete,
}) {
  const [editedTitle, setEditedTitle] = useState(title);
  const { validation, validateTitle, focus, isFocus } = useValidation();
  function handleEditInput(title) {
    validateTitle(title);
    setEditedTitle(title);
  }

  return (
    <>
      <TaskForm
        variant="task"
        onSub={onEdit}
        taskIndex={taskIndex}
        taskObject={{ title: editedTitle, isDone: isComplete }}
      >
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
              onUserInput={handleEditInput}
              isFocus={isFocus}
            />
          )}
        </TodoListContainer>
        {isEditing ? (
          <TodoListContainer variant="task-buttons">
            <TaskButton
              variant="confirm-action"
              type="submit"
              isValid={validation.isValid}
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
      </TaskForm>
      {focus && !validation.isValid && (
        <ValidationInfo>{validation.message}</ValidationInfo>
      )}
    </>
  );
}
