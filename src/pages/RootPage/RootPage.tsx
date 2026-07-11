import { Link, Outlet } from "react-router";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";

const items = [
  {
    key: 1,
    icon: <ProfileOutlined />,
    label: <Link to="/">Список задач</Link>,
  },
  { key: 2, icon: <UserOutlined />, label: <Link to="/profile">Профиль</Link> },
];

const menuStyle = {
  root: {
    backgroundColor: "#F9F9F9",
  },
  item: {
    color: "#717171",
  },
};

export const RootPage: React.FC = () => {
  return (
    <>
      <Layout
        style={{ width: "100%", minHeight: "100%", position: "absolute" }}
      >
        <Sider style={{ backgroundColor: "#F9F9F9" }}>
          <Menu
            styles={menuStyle}
            theme="dark"
            mode="inline"
            items={items}
            className="ant-menu"
          />
        </Sider>
        <Layout style={{ backgroundColor: "white" }}>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
