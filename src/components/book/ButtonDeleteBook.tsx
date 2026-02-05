import {
  Button,
  Col,
  Form,
  Modal,
  notification,
  Row,
  Typography,
} from 'antd';
import { useState } from 'react';
import _ from 'lodash';
import api from '../../utils/api';
import { DeleteOutlined } from '@ant-design/icons';

interface ButtonDeleteBookProps {
  id: number;
  afterFinish: () => void;
}

export default function ButtonDeleteBook({ id, afterFinish }: ButtonDeleteBookProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingFinish, setLoadingFinish] = useState(false);

  const onFinish = async () => {
    setLoadingFinish(true);
    console.log('Deleting book with id', id);

    try {
      await api.delete(`/api/books/${id}`);
      notification.success({
        message: 'Book delete successful!',
      });
      form.resetFields();
      setIsModalOpen(false);
      afterFinish();
    } catch (error: unknown) {
      console.error(error);
      const errorMsg = _.get(error, 'response.data.message', 'Book delete failed');
      notification.error({
        message: errorMsg,
      });
    }
    setLoadingFinish(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        <DeleteOutlined />
      </Button>
      <Modal
        // loading={loading}
        title="Delete Book"
        open={isModalOpen}
        onCancel={() => {
          form.resetFields();
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <Typography.Text>Are you sure you want to delete this book?</Typography.Text>
        <Row justify="end" gutter={8}>
          <Col>
            <Button onClick={() => setIsModalOpen(false)} loading={loadingFinish}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              danger
              onClick={onFinish}
              loading={loadingFinish}
            >
              Delete Book
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
