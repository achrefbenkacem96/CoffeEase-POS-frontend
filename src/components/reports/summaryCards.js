import { Card, Col, Row } from 'antd';

const SummaryCards = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Total Ventes" bordered={false}>
          $12,000
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Stock Actuel" bordered={false}>
          1200 unités
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Profit Net" bordered={false}>
          $4,500
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryCards;
