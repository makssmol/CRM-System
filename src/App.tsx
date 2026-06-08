import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { TodoListPage } from "./page/TodoListPage";
import { Layout, Menu } from "antd";

const { Content, Sider } = Layout;

const items = [
  {
    key: 1,
    icon: <ProfileOutlined />,
    label: "Список задач",
  },
  { key: 2, icon: <UserOutlined />, label: "Профиль" },
];

function App() {
  return (
    <Layout style={{ width: "100%", minHeight: "100%", position: "absolute"}}>
      <Sider>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content>
          <TodoListPage />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
