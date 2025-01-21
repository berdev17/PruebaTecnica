import {Layout, Menu} from "antd";
import {Link, Outlet} from "react-router-dom";
import "../Styles/Layout.css"
const{ Header, Content, Sider} = Layout;

const AppLayout = () =>{
    return(
        <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <div className="logo" style={{ color: "#fff", textAlign: "center", padding: "16px" }}>
            My App
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/productos">Productos</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/categorias">Categorias</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0, textAlign: "center" }}>
            <h1>Client App</h1>
          </Header>
          <Content style={{ margin: "16px" }}>
            <Outlet /> {/* Este componente renderiza las rutas hijas */}
          </Content>
        </Layout>
      </Layout>
    );
  };
   
export default AppLayout;