import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
  Select,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import _ from 'lodash';
import api from '../../utils/api';
import { PlusCircleOutlined } from '@ant-design/icons';
import FormBook, { IFormValues } from './FormBook';

interface ButtonCreateBookProps {
  afterFinish: () => void;
}

export default function ButtonCreateBook({ afterFinish }: ButtonCreateBookProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingFinish, setLoadingFinish] = useState(false);

  const onFinish = async (values: IFormValues) => {
    setLoadingFinish(true);
    console.log('values', values);

    try {
      await api.post('/api/books', {
        title: values.title,
        author: values.author,
        published_year: values.published_year,
        genre: values.genre,
      });
      notification.success({
        message: 'Book creation successful!',
      });
      form.resetFields();
      setIsModalOpen(false);
      afterFinish();
    } catch (error: unknown) {
      console.error(error);
      const errorMsg = _.get(error, 'response.data.message', 'Book creation failed');
      notification.error({
        message: errorMsg,
      });
    } finally {
      setLoadingFinish(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        <PlusCircleOutlined /> Create New Book
      </Button>
      <Modal
        title="Create Book"
        open={isModalOpen}
        onCancel={() => {
          form.resetFields();
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <FormBook 
        form={form} 
        onFinish={onFinish} 
        setIsModalOpen={setIsModalOpen} 
        mode="create"
        loadingFinish={loadingFinish}
        />
      </Modal>
    </>
  );
}
