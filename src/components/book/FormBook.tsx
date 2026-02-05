import { Button, Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { genreList } from '@/src/utils/genreList';

export interface IFormValues {
  title: string;
  author: string;
  published_year: number;
  genre: string;
}

interface FormBookProps {
  form: FormInstance;
  onFinish: (values: IFormValues) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  mode: 'create' | 'edit';
  loadingFinish?: boolean;
}

export default function FormBook({
  form,
  onFinish,
  setIsModalOpen,
  mode,
  loadingFinish,
}: FormBookProps) {
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input the book title!' }]}
      >
        <Input placeholder="Enter the book title" />
      </Form.Item>
      <Form.Item
        label="Author"
        name="author"
        rules={[{ required: true, message: 'Please input the author!' }]}
      >
        <Input placeholder="Enter the author" />
      </Form.Item>
      <Form.Item
        label="Published Year"
        name="published_year"
        getValueProps={(value) => ({ value: value ? dayjs().year(value) : undefined })}
        normalize={(value) => {
          return value ? value.year() : undefined;
        }}
      >
        <DatePicker
          picker="year"
          placeholder="Select the published year"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Genre" name="genre">
        <Select
          placeholder="Select the genre"
          options={genreList}
        />
      </Form.Item>
      <Row justify="end" gutter={8}>
        <Col>
          <Button onClick={() => setIsModalOpen(false)} disabled={loadingFinish}>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" loading={loadingFinish}>
            {mode === 'create' ? 'Create' : 'Update'} Book
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
