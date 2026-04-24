import styles from "./TodoItem.module.css";
import { useState } from "react";
import { deleteTask, changeTask } from "../../api";
import { useValidation } from "../../hooks";
import { Checkbox, Input, Button, IconButton } from "../../ui";
import {
  EditIcon,
  DeleteIcon,
  ConfirmIcon,
  CancelIcon,
} from "../../assets/icons";

export function TodoItem({
  loadTasks,
  setError,
  taskIndex,
  title,
  isEditing,
  isComplete,
  setEditingId,
}) {
  const [editedTitle, setEditedTitle] = useState(title);
  const { validation, validateTitle} = useValidation();

  function handleEditTask(id, task) {
    async function editTaskById(id, task) {
      try {
        await changeTask(id, task);
        await loadTasks();
      } catch (error) {
        setError(error.message || "Не удалось отредактировать задачу");
      }
    }

    editTaskById(id, task);
    setEditingId(null);
  }

  function handleEditConfirmation(id) {
    async function editConfirmation(id) {
      try {
        setEditingId(id);
        await loadTasks();
      } catch (error) {
        setError(error.message || "Не удалось отредактировать задачу");
      }
    }

    editConfirmation(id);
  }

  function handleCompleteTask(id, task) {
    async function markTaskForCompletion(id, task) {
      try {
        await changeTask(id, task);
        await loadTasks();
      } catch (error) {
        setError(error.message || "Не удалось поменять статус задачи");
      }
    }

    markTaskForCompletion(id, task);
  }

  function handleDeleteTask(id) {
    async function deleteTaskbyId(id) {
      try {
        await deleteTask(id);
        await loadTasks();
      } catch (error) {
        setError(error.message || "Не удалось удалить задачу");
      }
    }

    deleteTaskbyId(id);
  }

  function handleEditInput(title) {
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
                defaultValue={title}
                inputVariant="input"
                onChange={(event) => handleEditInput?.(event.target.value)}
                validationMessage={validation.message}
              />
            )}
          </div>
          {isEditing ? (
            <div className={styles.task_buttons}>
              <IconButton variant="primary" type="submit" isValid={validation.isValid}>
                <ConfirmIcon />
              </IconButton>
              <IconButton
                variant="secoundary"
                type="button"
                onClick={() => handleEditConfirmation()}
              >
                <CancelIcon />
              </IconButton>
            </div>
          ) : (
            <div className={styles.task_buttons}>
              <IconButton
                variant="primary"
                onClick={() => handleEditConfirmation(taskIndex)}
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
}
