import styles from "./TodoListPage.module.css";
import { useCallback, useEffect, useState } from "react";
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
  const [task, setTask] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo | null>();
  const [error, setError] = useState<string | null>();

  const handleLoadTask = useCallback(
    async (filter: TodoFilter): Promise<void> => {
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
      }
    },
    []
  );

  const updateTodo = useCallback(() => {
    handleLoadTask(selectedTask);
  }, [selectedTask, handleLoadTask]);

  useEffect(() => {
    handleLoadTask(selectedTask);

    const interval = setInterval(handleLoadTask, 5000, selectedTask);

    if (error) {
      alert(error);
    }

    return () => clearInterval(interval);
  }, [selectedTask]);

  if (!task || !info) {
    return <p>Нет доступных задач</p>;
  }

  return (
    <div className={styles.todo}>
      <AddTodo updateTodo={updateTodo} />
      <div className={styles.content}>
        <TodoTabs
          info={info}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
        <TodoList updateTodo={updateTodo} task={task} />
      </div>
    </div>
  );
};
