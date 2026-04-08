import { TodoListContainer } from "../TodoListContainer";
import { TaskButton } from "../TaskButton";
import { TaskCheckbox } from "../TaskCheckbox";
import { TaskInput } from "../Taskinput";
import { TaskForm } from "../TaskForm";
import { Icon } from "../Icon";
import { useState } from "react";

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
  const [isValid, setIsValid] = useState("");
  const [editedTitle, setEditedTitle] = useState(title);
  function handleEditInput(title) {
    if (title.length >= 64) {
      setIsValid("Максимальная длина текста 64 символа");
    } else if (title.length < 2 && title.length > 0) {
      setIsValid("Минимальная длина текста 2 символа");
    } else if (title === "") {
      setIsValid("Это поле не может быть пустым");
    } else {
      setIsValid("");
      setEditedTitle(title);
    }
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
            />
          )}
        </TodoListContainer>
        {isEditing ? (
          <TodoListContainer variant="task-buttons">
            <TaskButton variant="confirm-action" type="submit">
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
      {isValid && <p className="valid-input">{isValid}</p>}
    </>
  );
}
