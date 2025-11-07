"use client";

import { Layout, Menu, Dropdown, Avatar, Space } from "antd";
import {
  DashboardOutlined,
  ProjectOutlined,
  BugOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const { Header, Sider, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // 登录/注册页面不显示导航栏
  if (pathname === "/" || pathname === "/register") {
    return <>{children}</>;
  }

  // 动态菜单配置
  const menuItems = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "系统看板" },
    { key: "/projects", icon: <ProjectOutlined />, label: "项目管理" },
    { key: "/errors", icon: <BugOutlined />, label: "错误监控" },
    { key: "/settings", icon: <SettingOutlined />, label: "系统设置" },
  ];

  // 用户下拉菜单
  const userMenu = (
    <Menu
      items={[
        {
          key: "profile",
          icon: <SettingOutlined />,
          label: "用户配置",
          onClick: () => router.push("/user/settings"),
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "退出登录",
          onClick: async () => {
            await logout();
            router.push("/");
          },
        },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 左侧导航栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {collapsed ? "监控" : "前端监控系统"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={(e) => router.push(e.key)}
        />
      </Sider>

      {/* 右侧内容区 */}
      <Layout>
        {/* 顶部导航栏 */}
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {/* 左侧伸缩按钮 */}
          <Space>
            {collapsed ? (
              <MenuUnfoldOutlined
                onClick={() => setCollapsed(false)}
                style={{ fontSize: 18 }}
              />
            ) : (
              <MenuFoldOutlined
                onClick={() => setCollapsed(true)}
                style={{ fontSize: 18 }}
              />
            )}
          </Space>

          {/* 右侧用户信息 */}
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Space style={{ cursor: "pointer" }}>
              <Avatar style={{ backgroundColor: "#1890ff" }}>
                {user?.name?.[0] || user?.email?.[0] || "U"}
              </Avatar>
              <span>{user?.name || user?.email}</span>
            </Space>
          </Dropdown>
        </Header>

        {/* 页面内容 */}
        <Content style={{ margin: "16px", padding: 16, background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
