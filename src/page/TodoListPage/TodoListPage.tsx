import styles from "./TodoListPage.module.css";
import { useEffect, useState } from "react";
import { AddTodo, TodoTabs, TodoList } from "../../components";
import { fetchTasks } from "../../api/todoApi";
import {
  type Todo,
  type TodoInfo,
  type MetaResponse,
  type TodoFilter,
} from "../../types/basicTypes";

export const TodoListPage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<TodoFilter>("all");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [task, setTask] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo | null>();
  const [error, setError] = useState<string | null>();

  async function handleLoadTask(filter: TodoFilter): Promise<void> {
    setIsFetching(true);
    setError(null);

    try {
      const taskData: MetaResponse<Todo, TodoInfo> = await fetchTasks(filter);
      setTask(taskData.data || []);
      setInfo(taskData.info);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Не удалось загрузить задачи");
        setTask([]);
        setInfo(null);
      }
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    handleLoadTask(selectedTask);
    if (error) {
      alert(error);
    }
  }, [selectedTask, error]);

  if (!task || !info) {
    return <p>Нет доступных задач</p>;
  }

  return (
    <div className={styles.todo}>
      <AddTodo updateTodo={() => handleLoadTask(selectedTask)} />
      <div className={styles.content}>
        <TodoTabs
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
