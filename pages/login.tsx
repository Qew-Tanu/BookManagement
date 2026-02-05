import React, { useState } from 'react';
import { Button, Form, Input, Card, Layout, Typography, message, Row, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ButtonCreateUser from '@/src/components/login/ButtonCreateUser';
import api from '@/src/utils/api';
import _ from 'lodash';

const { Content } = Layout;
const { Title } = Typography;

interface ILoginValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const onFinish = async (values: ILoginValues) => {
    console.log('Received values of form: ', values);
    try {
      const response = await api.post('/api/auth/login', {
        email: values.email,
        password: values.password,
      });
      const { accessToken } = response.data;
      if (!accessToken) {
        throw new Error('No token received');
      }
      localStorage.setItem('token', accessToken);
      notification.success({
        message: 'Login successful!',
      });
      form.resetFields();
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error(error);
      const errorMsg = _.get(error, 'response.data.message');
      if (errorMsg) {
        setErrorMessage(errorMsg);
      }
      notification.error({
        message: errorMsg || 'Login failed!',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Login - Book Management</title>
      </Head>
      <Layout
        style={{
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f0f2f5',
        }}
      >
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Title level={3}>Sign in</Title>
              <Typography.Text type="secondary">Welcome to Book Management</Typography.Text>
            </div>

            <Form form={form} onFinish={onFinish} size="large" layout="vertical">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'The input is not valid E-mail!' },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              {errorMessage && (
                <Row justify="center" style={{ marginBottom: 16 }}>
                  <Typography.Text type="danger">{errorMessage}</Typography.Text>
                </Row>
              )}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                  Log in
                </Button>
                <ButtonCreateUser />
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    </>
  );
};

export default Login;
