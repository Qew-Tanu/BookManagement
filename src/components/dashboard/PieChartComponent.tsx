import { Col, Row, Typography } from 'antd';
import { Pie, PieChart, Sector, PieSectorDataItem, Tooltip, TooltipIndex, Label, PieLabelRenderProps } from 'recharts';

const { Text } = Typography;

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartComponent({
  data,
  isAnimationActive = true,
  defaultIndex = undefined,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
  data: { name: string; value: number }[];
}) {
  return (
    <>
      <Row justify="center" align="middle" style={{ marginTop: 32, marginBottom: 32 }}>
        <Col>
          <Text strong style={{ fontSize: 24, marginBottom: 16, display: 'block' }}>
            Book per Years (Pie Chart)
          </Text>
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <PieChart
          style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
          responsive
          margin={{
            top: 25,
            right: 25,
            bottom: 25,
            left: 25,
          }}
        >
          <Pie
            data={data}
            // cx="50%"
            // cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            fill="#1100ff"
            label={({name, value}) => `${name}: ${value}`}
            dataKey="value"
            isAnimationActive={isAnimationActive}
          />
          <Tooltip defaultIndex={defaultIndex} />
        </PieChart>
      </Row>
    </>
  );
}
