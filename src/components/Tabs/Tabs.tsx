import styles from "./Tabs.module.css";
import { NavButton } from "../../ui";
import type { TodoInfo, TodoFilter } from "../../types/basicTypes";

const STATUS_LABELS = {
  all: "Все",
  completed: "Выполненные",
  inWork: "В работе",
} as const;

export const Tabs: React.FC<{
  info: TodoInfo;
  selectedTask: TodoFilter;
  setSelectedTask: (status: TodoFilter) => void;
}> = (props) => {
  const { info, selectedTask, setSelectedTask } = props;
  return (
    <div className={styles.tabs}>
      {(Object.entries(info) as [status: TodoFilter, number][]).map(([status, values], index) => (
        <NavButton
          key={index}
          variant="tab-button"
          selected={selectedTask === status}
          onClick={() => setSelectedTask(status)}
        >
          {STATUS_LABELS[status]}({values})
        </NavButton>
      ))}
    </div>
  );
};
