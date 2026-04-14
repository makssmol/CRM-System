import { TaskLayout } from "./components";
import { TodoListPage } from "./page/TodoListPage";
import "./App.css";

function App() {
  return (
    <TaskLayout>
      <TodoListPage />
    </TaskLayout>
  );
}

export default App;
