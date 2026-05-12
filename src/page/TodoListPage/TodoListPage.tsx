import styles from "./TodoListPage.module.css";
import { useEffect, useState } from "react";
import { AddTask, Tabs, TodoList, TaskError } from "../../components/index.js";
import { useValidation } from "../../hooks/index.js";
import { fetchTasks } from "../../api/index.js";
import {
  type TasksData,
  type TaskInfo,
  type TaskBody,
  type TaskModel,
} from "../../types/basicTypes.js";

export const TodoListPage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState("all");
  const [taskBody, setTaskBody] = useState<TaskBody>({
    isDone: false,
    title: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const [task, setTask] = useState<TasksData[]>([]);
  const [info, setInfo] = useState<TaskInfo>();
  const [error, setError] = useState<string | null>();
  const { validation, validateTitle } = useValidation();

  function handleLoadTask(selectedTask: string) {
    async function loadTasks(filter: string) {
      setIsFetching(true);
      setError(null);

      try {
        const taskData: TaskModel = await fetchTasks(filter);
        setTask(taskData.data || []);
        setInfo(taskData.info || {});
      } catch (error: any) {
          setError(error.message || "Не удалось загрузить задачи");
          setTask([]);
          setInfo(undefined);
      } finally {
        setIsFetching(false);
      }
    }

    loadTasks(selectedTask);
  }

  useEffect(() => {
    handleLoadTask(selectedTask);
  }, [selectedTask]);

  function handleInputChange(title: string) {
    validateTitle(title);
    setTaskBody({ isDone: false, title });
  }

  if (error) {
    return <TaskError title="An error occurred" message={error} />;
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
          selectedTask={selectedTask}
        />
      </div>
    </div>
  );
};
