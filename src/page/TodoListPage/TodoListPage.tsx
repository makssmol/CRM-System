import styles from "./TodoListPage.module.css";
import { useEffect, useState, type JSX, type JSXElementConstructor } from "react";
import { AddTask, Tabs, TodoList, TaskError } from "../../components/index.js";
import { useValidation } from "../../hooks/index.js";
import { fetchTasks } from "../../api/index.js";
import {
  type Todo,
  type TodoInfo,
  type TodoRequest,
  type MetaResponce,
  type TodoFilter,
} from "../../types/basicTypes.js";

export const TodoListPage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<TodoFilter>("all");
  const [taskBody, setTaskBody] = useState<TodoRequest>({
    isDone: false,
    title: "",
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [task, setTask] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>();
  const [error, setError] = useState<string | null>();
  const { validation, validateTitle } = useValidation();

  function handleLoadTask(selectedTask: TodoFilter): void {
    async function loadTasks(filter: TodoFilter): Promise<void> {
      setIsFetching(true);
      setError(null);

      try {
        const taskData: MetaResponce = await fetchTasks(filter);
        setTask(taskData.data || []);
        setInfo(taskData.info || {});
      } catch (error: unknown) {
        if (error instanceof Error){
          setError(error.message || "Не удалось загрузить задачи");
          setTask([]);
          setInfo(undefined);
        }
      } finally {
        setIsFetching(false);
      }
    }

    loadTasks(selectedTask);
  }

  useEffect(() => {
    handleLoadTask(selectedTask);
  }, [selectedTask]);

  function handleInputChange(title: string): void {
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
