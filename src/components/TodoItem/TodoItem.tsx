import styles from "./TodoItem.module.css";
import React, { useState, useEffect } from "react";
import { deleteTask, changeTask } from "../../api/todoApi";
import { validateTitle } from "../../util/validateTitle";
import { Checkbox, Input, IconButton } from "../../ui";
import {
  EditIcon,
  DeleteIcon,
  ConfirmIcon,
  CancelIcon,
} from "../../assets/icons";

export const TodoItem: React.FC<{
  taskIndex: number;
  title: string;
  isComplete: boolean;
  updateTodo: () => void;
}> = (props) => {
  const { taskIndex, title, isComplete, updateTodo } = props;

  const [validation, setValidation] = useState({
    isValid: true,
    message: "",
  });
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  async function handleEditTask(
    event: React.SubmitEvent<HTMLFormElement>,
    id: number,
    title: string,
    isDone: boolean
  ): Promise<void> {
    event.preventDefault();
    setIsEditing(true);
    if (!title) {
      return;
    }
    const valid = validateTitle(title);
    setValidation(valid)
    if (!valid.isValid) {
      return;
    }
    try {
      await changeTask(id, title, isDone);
      await updateTodo();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Не удалось отредактировать задачу");
      }
    }
    setIsEditing(!isEditing);
  }

  async function handleCompleteTask(
    id: number,
    title: string,
    isDone: boolean
  ): Promise<void> {
    try {
      await changeTask(id, title, isDone);
      await updateTodo();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Не удалось поменять статус задачи");
      }
    }
  }

  async function handleDeleteTask(id: number): Promise<void> {
    try {
      await deleteTask(id);
      await updateTodo();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Не удалось удалить задачу");
      }
    }
  }

  function handleEditTaskInput(title: string): void {
    setValidation({
      isValid: true,
      message: "",
    });
    setEditedTitle(title);
  }

  function handleEditConfirmation(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsEditing(true);
  }

 useEffect(() => {
     if (error) {
       alert(error);
     }
   }, [error]);

  return (
    <form
      onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => {
        handleEditTask(event, taskIndex, editedTitle, isComplete);
      }}
    >
      <div className={styles.task}>
        <div className={styles.task_main}>
          <Checkbox
            checked={isComplete}
            onClick={() => handleCompleteTask(taskIndex, title, !isComplete)}
            label={!isEditing && title}
          />
          {isEditing && (
            <Input
              type="text"
              defaultValue={title}
              inputVariant="input"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleEditTaskInput(event.target.value)
              }
              errorMessage={validation.message}
            />
          )}
        </div>
        {isEditing ? (
          <div className={styles.task_buttons}>
            <IconButton
              variant="primary"
              type="submit"
              disabled={validation.isValid}
            >
              <ConfirmIcon />
            </IconButton>
            <IconButton
              variant="secoundary"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              <CancelIcon />
            </IconButton>
          </div>
        ) : (
          <div className={styles.task_buttons}>
            <IconButton
              variant="primary"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                handleEditConfirmation(event);
              }}
              type="button"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              variant="danger"
              type="button"
              onClick={() => handleDeleteTask(taskIndex)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
    </form>
  );
};
