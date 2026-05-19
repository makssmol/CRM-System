import styles from "./TodoItem.module.css";
import React, { useState } from "react";
import { deleteTask, changeTask } from "../../api";
import { useValidation } from "../../hooks";
import { Checkbox, Input, IconButton } from "../../ui";
import {
  EditIcon,
  DeleteIcon,
  ConfirmIcon,
  CancelIcon,
} from "../../assets/icons";
import { TaskError } from "../TaskError";
import type { TodoRequest, TodoFilter } from "../../types/basicTypes";

export const TodoItem: React.FC<{
  taskIndex: number;
  title: string;
  isComplete: boolean;
  updateTodo: () => void;
}> = (props) => {
  const { taskIndex, title, isComplete, updateTodo, } =
    props;

  const { validation, validateTitle } = useValidation();
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  function handleEditTask(event:React.SubmitEvent<HTMLFormElement>, id: number, title: string, isDone: boolean): void {
    event.preventDefault()
    setIsEditing(true);
    async function editTaskById(id: number, title: string, isDone: boolean): Promise<void> {
      try {
        await changeTask(id, title, isDone);
        await updateTodo();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Не удалось отредактировать задачу");
        }
      }
    }
    editTaskById(id, title, isDone);
    setIsEditing(!isEditing);
  }

  function handleCompleteTask(id: number, title: string, isDone: boolean): void {
    async function markTaskForCompletion(id: number, title: string, isDone: boolean): Promise<void> {
      try {
        await changeTask(id, title, isDone);
        await updateTodo();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Не удалось поменять статус задачи");
        }
      }
    }

    markTaskForCompletion(id, title, isDone);
  }

  function handleDeleteTask(id: number): void {
    async function deleteTaskbyId(id: number): Promise<void> {
      try {
        await deleteTask(id);
        await updateTodo();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Не удалось поменять статус задачи");
        }
      }
    }

    deleteTaskbyId(id);
  }

  function handleEditInput(title: string): void {
    validateTitle(title);
    setEditedTitle(title);
  }

  function handleEditConfirmation(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    setIsEditing(true);
  }

  if (error) {
      return <TaskError title="An error occurred" message={error} />;
    }

  return (
    <>
      <form
        onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => {
          handleEditTask(event, taskIndex, editedTitle, isComplete);
        }}
      >
        <div className={styles.task}>
          <div className={styles.task_main}>
            <Checkbox
              checked={isComplete}
              onClick={() =>
                handleCompleteTask(taskIndex, title, !isComplete)
              }
              label={!isEditing && title}
            />
            {isEditing && (
              <Input
                type="text"
                defaultValue={title}
                inputVariant="input"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleEditInput(event.target.value)
                }
                validationMessage={validation.message}
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
                  handleEditConfirmation(event)
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
    </>
  );
};
