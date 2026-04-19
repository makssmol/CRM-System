import styles from "./Tabs.module.css"
import { Button} from "../../ui";

export function Tabs({ info, selectedTask, setSelectedTask }) {
  return (
    <div className={styles.tabs}>
      {Object.entries(info).map(([status, values], index) => (
        <Button
          key={index}
          variant="tab-button"
          selected={selectedTask === status}
          onConfirm={() => setSelectedTask(status)}
        >
          {status.trim()}({values})
        </Button>
      ))}
    </div>
  );
}
