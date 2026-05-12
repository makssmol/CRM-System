import type React from "react";
import { TodoItem } from "../TodoItem";
import type { TasksData } from "../../types/basicTypes";

export const TodoList: React.FC<{
  loadTasks: (arg: string) => void;
  setError: (errorMessage: string | null) => void;
  isFetching: boolean;
  task: TasksData[];
  selectedTask: string;
}> = (props) => {
  const { loadTasks, setError, isFetching, task, selectedTask } = props;
  return (
    <>
      {isFetching && <p>Tasks are loading</p>}
      {!isFetching &&
        task.map((data) => (
          <TodoItem
            key={data.id}
            taskIndex={data.id}
            title={data.title}
            isComplete={data.isDone}
            loadTasks={loadTasks}
            setError={setError}
            selectedTask={selectedTask}
          />
        ))}
    </>
  );
};
