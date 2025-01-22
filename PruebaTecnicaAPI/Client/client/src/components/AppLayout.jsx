import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { HomeOutlined, AppstoreOutlined, TagsOutlined } from "@ant-design/icons"; // Iconos para menú
import "../Styles/Layout.css";

const { Header, Content, Sider } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible breakpoint="lg" theme="dark" style={{ background: "#001529" }}>
        <div className="logo" style={{ textAlign: "center", padding: "16px" }}>
          <h2 style={{ color: "#fff", margin: 0, fontWeight: "bold" }}>Client App</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to="/productos">Productos</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TagsOutlined />}>
            <Link to="/categorias">Categorías</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px", textAlign: "center", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>Gestión de Clientes</h1>
        </Header>

        <Content
          style={{
            margin: "16px",
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Outlet /> 
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
