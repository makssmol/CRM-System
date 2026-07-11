import styles from "./TodoListPage.module.css";
import { useCallback, useEffect, useState } from "react";
import { AddTodo, TodoTabs, TodoList } from "../../components";
import { fetchTasks } from "../../api/todoApi";
import {
  type Todo,
  type TodoInfo,
  type MetaResponse,
  type TodoFilter,
} from "../../types/TodoTypes";
import { notification } from "antd";

export const TodoListPage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<TodoFilter>("all");
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo | null>();

  const handleLoadTask = useCallback(
    async (filter: TodoFilter): Promise<void> => {
      try {
        const taskData: MetaResponse<Todo, TodoInfo> = await fetchTasks(filter);
        setTasks(taskData.data || []);
        setInfo(taskData.info);
      } catch (error: unknown) {
        if (error instanceof Error) {
          notification.error({
            message: "Ошибка!",
            description: "Не удалось загрузить задачи!",
          });
          setTasks([]);
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
    return () => clearInterval(interval);
  }, [selectedTask]);

  if (!tasks || !info) {
    return <p>Нет доступных задач</p>;
  }

  return (
    <div className={styles.todo}>
      <AddTodo updateTodo={updateTodo} />
      <div className={styles.content}>
        <TodoTabs
          info={info}
          setSelectedTask={setSelectedTask}
        />
        <TodoList updateTodo={updateTodo} tasks={tasks} />
      </div>
    </div>
  );
};
