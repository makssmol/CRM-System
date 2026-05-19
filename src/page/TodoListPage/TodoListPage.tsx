import styles from "./TodoListPage.module.css";
import { useEffect, useState, type JSX, type JSXElementConstructor } from "react";
import { AddTask, Tabs, TodoList, TaskError } from "../../components/index.js";
import { useValidation } from "../../hooks/index.js";
import { fetchTasks } from "../../api/index.js";
import {
  type Todo,
  type TodoInfo,
  type MetaResponse,
  type TodoFilter,
} from "../../types/basicTypes.js";

export const TodoListPage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<TodoFilter>("all");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [task, setTask] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo | null>();
  const [error, setError] = useState<string | null>();


  function handleLoadTask(selectedTask: TodoFilter): void {
    async function loadTasks(filter: TodoFilter): Promise<void> {
      setIsFetching(true);
      setError(null);

      try {
        const taskData: MetaResponse<Todo, TodoInfo> = await fetchTasks(filter);
        setTask(taskData.data || []);
        setInfo(taskData.info);
      } catch (error: unknown) {
        if (error instanceof Error){
          setError(error.message || "Не удалось загрузить задачи");
          setTask([]);
          setInfo(null);
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

  if (error) {
    return <TaskError title="An error occurred" message={error} />;
  }
  if (!task || !info) {
    return <p>No tasks available</p>;
  }

  return (
    <div className={styles.todo}>
      <AddTask
        updateTodo={() => handleLoadTask(selectedTask)}
      />
      <div className={styles.content}>
        <Tabs
          info={info}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
        <TodoList
          updateTodo={() => handleLoadTask(selectedTask)}
          isFetching={isFetching}
          task={task}
        />
      </div>
    </div>
  );
};
