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
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import api from '../../utils/api';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import FormBook, { IFormValues } from './FormBook';

interface ButtonUpdateBookProps {
  id: number;
  afterFinish: () => void;
}

export default function ButtonUpdateBook({ id, afterFinish }: ButtonUpdateBookProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFinish, setLoadingFinish] = useState(false);

  const getDetailData = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/api/books/${id}`);
      form.setFieldsValue({
        title: data.data.title,
        author: data.data.author,
        published_year: data.data.published_year,
        genre: data.data.genre,
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Error fetching book details',
      });
      setIsModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailData();
    }
  }, [id, isModalOpen]);

  const onFinish = async (values: IFormValues) => {
    setLoadingFinish(true);
    console.log('values', values);

    try {
      await api.patch(`/api/books/${id}`, {
        title: values.title,
        author: values.author,
        published_year: values.published_year,
        genre: values.genre,
      });
      notification.success({
        message: 'Book update successful!',
      });
      form.resetFields();
      setIsModalOpen(false);
      afterFinish();
    } catch (error: unknown) {
      console.error(error);
      const errorMsg = _.get(error, 'response.data.message', 'Book update failed');
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
        <EditOutlined />
      </Button>
      <Modal
        loading={loading}
        title="Edit Book"
        open={isModalOpen}
        // onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          form.resetFields();
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <FormBook form={form} onFinish={onFinish} setIsModalOpen={setIsModalOpen} mode="edit" loadingFinish={loadingFinish} />
      </Modal>
    </>
  );
}
