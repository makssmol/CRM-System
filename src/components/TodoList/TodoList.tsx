import type React from "react";
import { TodoItem } from "../TodoItem";
import type { Todo, TodoFilter } from "../../types/basicTypes";

export const TodoList: React.FC<{
  updateTodo: () => void;
  isFetching: boolean;
  task: Todo[];
}> = (props) => {
  const { updateTodo, isFetching, task, } = props;
  return (
    <>
      {isFetching && <p>Задачи загружаются</p>}
      {!isFetching &&
        task.map((data) => (
          <TodoItem
            key={data.id}
            taskIndex={data.id}
            title={data.title}
            isComplete={data.isDone}
            updateTodo={updateTodo}
          />
        ))}
    </>
  );
};
