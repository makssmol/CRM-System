import type React from "react";
import { TodoItem } from "../TodoItem";
import type { Todo } from "../../types/basicTypes";
import { memo } from "react";

export const TodoList: React.FC<{
  updateTodo: () => void;
  task: Todo[];
}> = memo((props) => {
  const { updateTodo, task } = props;
  return (
    <>
      {task.map((data) => (
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
});
