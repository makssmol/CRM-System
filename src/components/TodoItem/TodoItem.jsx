import { TodoItemButtons } from "../TodoItemButtons";
import { TodoItemInputs } from "../TodoItemInputs";
import { TaskForm } from "../TaskForm";
import { useState } from "react";
import { useValidation } from "../../hooks";
import { ValidationInfo } from "../ValidationInfo";

export function TodoItem({
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
        <TodoItemInputs
          onCheck={onCheck}
          title={title}
          isComplete={isComplete}
          taskIndex={taskIndex}
          isEditing={isEditing}
          onUserInput={handleEditInput}
          isFocus={isFocus}
        />
        <TodoItemButtons
          isEditing={isEditing}
          isValid={validation.isValid}
          onEditConfirm={onEditConfirm}
          taskIndex={taskIndex}
          onDelete={onDelete}
        />
      </TaskForm>
      {focus && !validation.isValid && (
        <ValidationInfo>{validation.message}</ValidationInfo>
      )}
    </>
  );
}
