import styles from "./TodoItem.module.css";
import { Form } from "../Form";
import { useState } from "react";
import { useValidation } from "../../hooks";
import { ValidationInfo } from "../ValidationInfo";
import { Checkbox, Input, Button, IconButton } from "../../ui";
import {
  EditIcon,
  DeleteIcon,
  ConfirmIcon,
  CancelIcon,
} from "../../assets/icons";

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
      <Form
        onSub={onEdit}
        taskIndex={taskIndex}
        taskObject={{ title: editedTitle, isDone: isComplete }}
      >
        <div className={styles.task}>
          <div className={styles.task_main}>
            <Checkbox
              checked={isComplete}
              onClick={() => onCheck(taskIndex, title, isComplete)}
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
                onUserInput={handleEditInput}
                isFocus={isFocus}
              />
            )}
          </div>
          {isEditing ? (
            <div className={styles.task_buttons}>
              <IconButton variant="primary" type="submit">
                <ConfirmIcon />
              </IconButton>
              <IconButton
                variant="secoundary"
                type="button"
                onClick={() => onEditConfirm()}
              >
                <CancelIcon />
              </IconButton>
            </div>
          ) : (
            <div className={styles.task_buttons}>
              <IconButton
                variant="primary"
                onClick={() => onEditConfirm(taskIndex)}
                type="button"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                variant="danger"
                type="button"
                onClick={() => onDelete?.(taskIndex)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>
      </Form>
      {focus && !validation.isValid && (
        <ValidationInfo>{validation.message}</ValidationInfo>
      )}
    </>
  );
}
