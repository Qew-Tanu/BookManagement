import React, { ReactNode, useEffect, useState } from 'react';
import { BookOutlined, DashboardOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Col, Layout, Menu, Modal, Row, theme } from 'antd';
import { useRouter } from 'next/router';
import { Typography } from 'antd';

const { Text } = Typography;

const { Header, Content, Footer } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: `Dashboard`,
  },
  {
    key: 'book',
    icon: <BookOutlined />,
    label: `Books`,
  },
];

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }
    };

    checkAuth();
  }, [router]);

  const currentMenuKey = router.pathname.split('/')[1];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 5px',
        }}
      >
        <Col flex={1}>
          <Row align="middle" justify="center">
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
              Book Management System
            </Text>
          </Row>
        </Col>
        <Col flex={'none'}>
          <Button
            type="primary"
            danger
            onClick={() => {
              Modal.confirm({
                title: 'Logout',
                content: 'Are you sure you want to logout?',
                onOk: () => {
                  localStorage.removeItem('token');
                  router.push('/login');
                },
              });
            }}
          >
            <LogoutOutlined />
          </Button>
        </Col>
      </Header>
      <Header
        style={{
          position: 'sticky',
          top: 64,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={[currentMenuKey]}
          selectedKeys={[currentMenuKey]}
          onClick={(item) => {
            router.push(`/${item.key}`);
          }}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      {/* <Row
        style={{
          backgroundColor: '#001529',
        }}
      >
        <Col span={24}>
          <Row
            align="middle"
            justify="center"
            style={{
              padding: '16px 0',
              // background: colorBgContainer
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              Book Management System
            </Text>
          </Row>
          <Row>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[currentMenuKey]}
              selectedKeys={[currentMenuKey]}
              items={items}
              onClick={(item) => {
                router.push(`/${item.key}`);
              }}
              style={{ width: '100%' }}
            />
          </Row>
        </Col>
      </Row> */}

      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div
          style={{
            padding: 24,
            textAlign: 'center',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* <Text strong style={{ fontSize: 24, marginBottom: 16, display: 'block' }}>
          {currentMenuKey.charAt(0).toUpperCase() + currentMenuKey.slice(1)}
        </Text> */}
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>created By Qewww - Ant Design</Footer>
    </Layout>
  );
};

export default AppLayout;
