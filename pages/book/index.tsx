import ButtonCreateBook from '@/src/components/book/ButtonCreateBook';
import ButtonDeleteBook from '@/src/components/book/ButtonDeleteBook';
import ButtonUpdateBook from '@/src/components/book/ButtonUpdateBook';
import api from '@/src/utils/api';
import { genreList } from '@/src/utils/genreList';
import { Col, Row, Select, Table, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

export default function Book() {
  const [bookData, setBookData] = useState([]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [tableLoading, setTableLoading] = useState(false);

  const getBooks = async () => {
    setTableLoading(true);
    try {
      const data = await api.get('/api/books', {
        params: {
          genre: search,
          current: pagination.current,
          pageSize: pagination.pageSize,
        },
      });
      console.log(data);

      setBookData(data.data);
      setTotal(parseInt(data.headers['x-total-count'], 10) || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, [search, pagination.current, pagination.pageSize]);

  return (
    <>
      <Row justify="space-between" align="middle"  gutter={16}>
        <Col flex={"none"} style={{ marginBottom: 16 }}>
          <ButtonCreateBook afterFinish={getBooks} />
        </Col>
        <Col flex={"auto"} style={{ marginBottom: 16 }}>
          <Row justify={'space-between'} align="middle">
            <Col>
              <Select
                placeholder="Select the genre"
                options={genreList}
                allowClear
                style={{ width: 180 }}
                onChange={(value) => {
                  setPagination({ current: 1, pageSize: pagination.pageSize });
                  setSearch(value || undefined);
                }}
              />
            </Col>
            <Col>
              <Select
                placeholder="Select page size"
                value={pagination.pageSize}
                style={{ width: 80 }}
                onChange={(value) => {
                  setPagination({ current: 1, pageSize: value });
                }}
                options={[
                  { value: 3, label: '3' },
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                  { value: 50, label: '50' },
                ]}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Table
        dataSource={bookData}
        loading={tableLoading}
        scroll={{ x: true }}
        rowKey="id"
        pagination={{
          onChange: (page, pageSize) => {
            setPagination({ current: page, pageSize: pageSize });
          },
          pageSize: pagination.pageSize,
          current: pagination.current,
          // pageSizeOptions: ['3', '5', '10', '50'],
          showSizeChanger: false,
          total: total,
          showTotal: (total) => `Total ${total} items`,
        }}
      >
        <Table.Column title="Title" dataIndex="title" />
        <Table.Column title="Author" dataIndex="author" />
        <Table.Column title="Published Year" dataIndex="published_year" />
        <Table.Column title="Genre" dataIndex="genre" />
        <Table.Column
          title="Actions"
          align="center"
          render={(record) => {
            return (
              <Row wrap={false} style={{ gap: 8 }} justify="center" align="middle">
                <ButtonUpdateBook id={record.id} afterFinish={getBooks} />
                <ButtonDeleteBook id={record.id} afterFinish={getBooks} />
              </Row>
            );
          }}
        />
      </Table>
    </>
  );
}
