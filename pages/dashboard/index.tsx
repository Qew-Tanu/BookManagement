import BarChartComponent from '@/src/components/dashboard/BarChartComponent';
import api from '@/src/utils/api';
import { genreList } from '@/src/utils/genreList';
import { Col, DatePicker, Row, Select } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
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
    console.log(search);

    getReport();
  }, [search?.genre, search?.startYear, search?.endYear]);

  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <Row style={{ width: '100%' }} gutter={16}>
          <Col lg={{ span: 24 }}>
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
      <BarChartComponent data={barChartData} />
    </Row>
  );
}
