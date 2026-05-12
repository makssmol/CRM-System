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
import type { TaskBody } from "../../types/basicTypes";

export const TodoItem: React.FC<{
  taskIndex: number;
  title: string;
  isComplete: boolean;
  loadTasks: (arg: string) => void;
  setError: (errorMessage: string | null) => void;
  selectedTask: string;
}> = (props) => {
  const { taskIndex, title, isComplete, loadTasks, setError, selectedTask } =
    props;

  const { validation, validateTitle } = useValidation();
  const [editedTitle, setEditedTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditTask(id: number, task: TaskBody) {
    setIsEditing(true);
    console.log("isEditing: ", isEditing);
    async function editTaskById(id: number, task: TaskBody) {
      try {
        await changeTask(id, task);
        loadTasks(selectedTask);
      } catch (error: any) {
        setError(error.message || "Не удалось отредактировать задачу");
      }
    }
    editTaskById(id, task);
    setIsEditing(!isEditing);
  }

  function handleCompleteTask(id: number, task: TaskBody) {
    async function markTaskForCompletion(id: number, task: TaskBody) {
      try {
        await changeTask(id, task);
        loadTasks(selectedTask);
      } catch (error: any) {
        setError(error.message || "Не удалось поменять статус задачи");
      }
    }

    markTaskForCompletion(id, task);
  }

  function handleDeleteTask(id: number) {
    async function deleteTaskbyId(id: number) {
      try {
        await deleteTask(id);
        loadTasks(selectedTask);
      } catch (error: any) {
        setError(error.message || "Не удалось удалить задачу");
      }
    }

    deleteTaskbyId(id);
    console.log("end");
  }

  function handleEditInput(title: string) {
    validateTitle(title);
    setEditedTitle(title);
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditTask(taskIndex, { title: editedTitle, isDone: isComplete });
        }}
      >
        <div className={styles.task}>
          <div className={styles.task_main}>
            <Checkbox
              checked={isComplete}
              onClick={() =>
                handleCompleteTask(taskIndex, {
                  title: title,
                  isDone: !isComplete,
                })
              }
              label={!isEditing && title}
            />
            {isEditing && (
              <Input
                type="text"
                defaultValue={title}
                inputVariant="input"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleEditInput?.(event.target.value)
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
                isValid={validation.isValid}
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
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
                type="button"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                variant="danger"
                type="button"
                onClick={() => handleDeleteTask?.(taskIndex)}
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
