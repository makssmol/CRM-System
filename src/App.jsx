import { TaskLayout } from "./components";
import { Todo } from "./page/Todo";
import "./App.css";

function App() {
  return (
    <TaskLayout>
      <Todo />
    </TaskLayout>
  );
}

export default App;
