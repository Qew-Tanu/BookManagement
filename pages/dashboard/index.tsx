import BarChartComponent from '@/src/components/dashboard/BarChartComponent';
import PieChartComponent from '@/src/components/dashboard/PieChartComponent';
import api from '@/src/utils/api';
import { genreList } from '@/src/utils/genreList';
import { Col, DatePicker, Row, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
interface SearchParams {
  genre?: string;
  startYear?: dayjs.Dayjs;
  endYear?: dayjs.Dayjs;
}

export default function Dashboard() {
  const [barChartData, setBarChartData] = useState([]);
  const [search, setSearch] = useState<SearchParams>({
    genre: undefined,
    startYear: undefined,
    endYear: undefined,
  });
  const [tableLoading, setTableLoading] = useState(false);

  const getReport = async () => {
    setTableLoading(true);
    try {
      const data = await api.get('/api/books/report', {
        params: {
          genre: search.genre,
          startYear: search.startYear?.year(),
          endYear: search.endYear?.year(),
        },
      });

      setBarChartData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    getReport();
  }, [search?.genre, search?.startYear, search?.endYear]);

  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <Row style={{ width: '100%' }} gutter={16}>
          <Col sm={{ flex: 'none' }} xs={{ span: 24 }}>
            <Select
              placeholder="Select the genre"
              options={genreList}
              allowClear
              style={{ width: '100%', marginTop: 16 }}
              onChange={(value) => {
                setSearch((prev) => ({ ...prev, genre: value || undefined }));
              }}
            />
          </Col>
          <Col>
            <DatePicker.RangePicker
              picker="year"
              style={{ width: '100%', marginTop: 16 }}
              placeholder={['Start Year', 'End Year']}
              format="YYYY"
              value={[search.startYear, search.endYear]}
              onChange={(date) => {
                console.log(date);

                const startYear = date ? dayjs(date[0]) : undefined;
                const endYear = date ? dayjs(date[1]) : undefined;
                setSearch((prev) => ({ ...prev, startYear, endYear }));
              }}
            />
          </Col>
        </Row>
      </Col>
      {tableLoading && barChartData.length === 0 ? (
        <Skeleton
          active
          paragraph={{ rows: 10 }}
          style={{ width: '100%', marginTop: 32, minHeight: 400, maxWidth: 700 }}
        />
      ) : (
        <>
          <BarChartComponent data={barChartData} />
          <PieChartComponent data={barChartData} />
        </>
      )}
    </Row>
  );
}
