import { TodoListContainer } from "../TodoListContainer";
import { TaskButton } from "../TaskButton";

export function TaskTabs({ info, selectedTask, setSelectedTask }) {
  return (
    <TodoListContainer variant="tabs">
      {Object.entries(info).map(([status, values], index) => (
        <TaskButton
          key={index}
          variant="tab-button"
          selected={selectedTask === status}
          onConfirm={() => setSelectedTask(status)}
        >
          {status.trim()}({values})
        </TaskButton>
      ))}
    </TodoListContainer>
  );
}
