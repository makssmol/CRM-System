import styles from "./Tabs.module.css";
import type { TodoInfo, TodoFilter } from "../../types/basicTypes";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";

enum todoFIlter{
  'all',
  'completed', 
  'inWork'
}

const STATUS_LABELS = {
  all: "Все",
  completed: "Выполненные",
  inWork: "В работе",
} as const;

const stylesObject: TabsProps["styles"] = {
  root: { height: 35 },
  item: { padding: `6px 10px` },
  indicator: { height: 2 },
};

export const TodoTabs: React.FC<{
  info: TodoInfo;
  selectedTask: TodoFilter;
  setSelectedTask: (status: TodoFilter) => void;
}> = (props) => {
  const { info, setSelectedTask } = props;
  const [activeKey, setActiveKey] = useState("all");

  const items: TabsProps["items"] = (
    Object.entries(info) as [status: TodoFilter, number][]
  ).map(([status, values]) => {
    const tabLabel = `${STATUS_LABELS[status]} (${values})`;
    return {
      label: tabLabel,
      key: `${status}`,
    };
  });

  function isTodoStatus(key: string | todoFIlter): key is todoFIlter{
    return key in todoFIlter
  }

  function handleTabChange(key: string) {
    setActiveKey(key);
    if(isTodoStatus(key)){
      setSelectedTask(key)
    }
  }


  return (
    <div className={styles.tabs}>
      <Tabs
        activeKey={activeKey}
        items={items}
        onChange={handleTabChange}
        size="large"
        styles={stylesObject}
      />
    </div>
  );
};
