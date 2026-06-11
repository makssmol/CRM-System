import { TodoListPage } from "./pages/TodoListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { RootLayout } from "./pages/RootPage/RootPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <TodoListPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
