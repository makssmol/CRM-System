import { useEffect, useState } from "react";
import {
  fetchTasks,
  deleteTask,
  createNewTask,
  editTask,
  taskCompletion,
} from "../api";

export function useTodo(filterProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [task, setTask] = useState([]);
  const [info, setInfo] = useState({});
  const [error, setError] = useState();
  const [editingId, setEditingId] = useState(null);

  async function loadTasks(filter) {
    setIsFetching(true);
    setError(null);

    try {
      const taskData = await fetchTasks(filter);
      setTask(taskData.data || []);
      setInfo(taskData.info || {});
    } catch (error) {
      setError(error.message || "Не удалось загрузить задачи");
      setTask([]);
      setInfo({});
    } finally {
      setIsFetching(false);
    }
  }

  async function addTask(newTask) {
    if (!newTask) {
      return;
    }
    try {
      await createNewTask(newTask);
      await loadTasks(filterProps);
    } catch (error) {
      setError(error.message || "Не удалось добавить задачу");
    }
  }

  async function deleteTaskbyId(taskIndex) {
    try {
      await deleteTask(taskIndex);
      await loadTasks(filterProps);
    } catch (error) {
      setError(error.message || "Не удалось удалить задачу");
    }
  }

  async function handleEditConfirmation(taskIndex) {
    try {
      setEditingId(taskIndex);
      await loadTasks(filterProps);
    } catch (error) {
      setError(error.message || "Не удалось отредактировать задачу");
    }
  }

  async function editTaskById(taskIndex, taskObject) {
    try {
      await editTask(taskIndex, taskObject);
      await loadTasks(filterProps);
    } catch (error) {
      setError(error.message || "Не удалось отредактировать задачу");
    }
  }

  async function markTaskForCompletion(taskIndex, taskObject) {
    try {
      await taskCompletion(taskIndex, taskObject);
      await loadTasks(filterProps);
    } catch (error) {
      setError(error.message || "Не удалось поменять статус задачи");
    }
  }

  useEffect(() => {
    loadTasks(filterProps);
  }, [filterProps]);

  return {
    task,
    info,
    isFetching,
    error,
    deleteTaskbyId,
    addTask,
    editTaskById,
    editingId,
    setEditingId,
    handleEditConfirmation,
    markTaskForCompletion,
  };
}
