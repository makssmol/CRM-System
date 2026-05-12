import styles from "./Tabs.module.css";
import { NavButton } from "../../ui";
import type { TaskInfo } from "../../types/basicTypes";

export const Tabs: React.FC<{info: TaskInfo, selectedTask: string, setSelectedTask: (status: string) => void}> = (props) => {
  const {info, selectedTask, setSelectedTask} = props
  return (
    <div className={styles.tabs}>
      {Object.entries(info).map(([status, values], index) => (
        <NavButton
          key={index}
          variant="tab-button"
          selected={selectedTask === status}
          onClick={() => setSelectedTask(status)}
        >
          {status.trim()}({values})
        </NavButton>
      ))}
    </div>
  );
}
