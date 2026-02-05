import { Col, Grid, Row, Typography, theme } from 'antd';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { Text } = Typography;

interface BarChartComponentProps {
  data: any[];
}

const { useBreakpoint } = Grid;

export default function BarChartComponent({ data }: BarChartComponentProps) {
const screens = useBreakpoint();
  
  return (
    <>
      <Row justify="center" align="middle" style={{ marginTop: 32, marginBottom: 32 }}>
        <Col>
          <Text strong style={{ fontSize: 24, marginBottom: 16, display: 'block' }}>
            Book Genre Distribution Over Years
          </Text>
        </Col>
      </Row>
      <Row justify="center" align="middle"style={{width: "100%"}}>      

      <BarChart
        style={{ width: '100%', maxWidth: '700px', aspectRatio: 1.618, minHeight: !screens.lg ? '400px' : '300px' }}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis width="auto" type="number" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Mystery"
          fill="#8884d8"
          activeBar={{ fill: '#6864b8', stroke: '#6864b8' }}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="Fantasy"
          fill="#82ca9d"
          activeBar={{ fill: '#62aa7d', stroke: '#62aa7d' }}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="Romance"
          fill="#ffc658"
          activeBar={{ fill: '#dfa638', stroke: '#dfa638' }}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="Horror"
          fill="#ff6b6b"
          activeBar={{ fill: '#df4b4b', stroke: '#df4b4b' }}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="Other"
          fill="#8dd1e1"
          activeBar={{ fill: '#6db1c1', stroke: '#6db1c1' }}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
      </Row>
    </>
  );
}
