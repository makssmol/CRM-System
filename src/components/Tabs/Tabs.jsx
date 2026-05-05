import styles from "./Tabs.module.css";
import { NavButton } from "../../ui";

export function Tabs({ info, selectedTask, setSelectedTask }) {
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
