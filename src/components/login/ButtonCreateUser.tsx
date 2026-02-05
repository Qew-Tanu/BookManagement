import { Button, Col, Form, Input, message, Modal, notification, Row, Typography } from 'antd';
import React, { useState } from 'react';
import _ from 'lodash';
import api from '../../utils/api';

const { Text } = Typography;

interface IFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function ButtonCreateUser() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: IFormValues) => {
    console.log('values', values);
    setLoading(true);
    try {
      await api.post('/api/auth/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      notification.success({
        message: 'Registration successful!',
      });
      form.resetFields();
      setIsModalOpen(false);
    } catch (error: unknown) {
      console.error(error);
      const errorMsg = _.get(error, 'response.data.message', 'Registration failed');
      notification.error({
        message: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ marginTop: 16 }}>
        <Col>
          <Text type="secondary">
            Don't have an account?{' '}
            <Button type="link" onClick={() => setIsModalOpen(true)}>
              Register now!
            </Button>
          </Text>
        </Col>
      </Row>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          form.resetFields();
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
