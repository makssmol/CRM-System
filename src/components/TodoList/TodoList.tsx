import type React from "react";
import { TodoItem } from "../TodoItem";
import type { Todo, TodoFilter } from "../../types/basicTypes";

export const TodoList: React.FC<{
  loadTasks: (arg: TodoFilter) => void;
  setError: (errorMessage: string | null) => void;
  isFetching: boolean;
  task: Todo[];
  selectedTask: TodoFilter;
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
