import styles from "./TodoListPage.module.css";
import { useEffect, useState } from "react";
import { AddTask, Tabs, TodoList, Error } from "../../components";
import { useValidation } from "../../hooks";
import { fetchTasks } from "../../api";

export function TodoListPage() {
  const [selectedTask, setSelectedTask] = useState("all");
  const [taskBody, setTaskBody] = useState({
    isDone: false,
    title: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const [task, setTask] = useState([]);
  const [info, setInfo] = useState({});
  const [error, setError] = useState();
  const [editingId, setEditingId] = useState(null);
  const { validation, validateTitle} = useValidation();

  function handleLoadTask(selectedTask) {
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

    loadTasks(selectedTask);
  }

  useEffect(() => {
    handleLoadTask(selectedTask);
  }, [selectedTask]);

  function handleInputChange(title) {
    validateTitle(title);
    setTaskBody({ isDone: false, title });
  }

  if (error) {
    return <Error title="An error occurred" message={error} />;
  }
  if (!task || !info) {
    return <p>No tasks available</p>;
  }

  return (
    <div className={styles.todo}>
      <AddTask
        loadTasks={handleLoadTask}
        setError={setError}
        taskObject={taskBody}
        onUserInput={handleInputChange}
        isValid={validation.isValid}
        validationMessage={validation.message}
        selectedTask={selectedTask}
      />
      <div className={styles.content}>
        <Tabs
          info={info}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
        <TodoList
          loadTasks={handleLoadTask}
          setError={setError}
          isFetching={isFetching}
          task={task}
          editingId={editingId}
          setEditingId={setEditingId}
          selectedTask={selectedTask}
        />
      </div>
    </div>
  );
}
