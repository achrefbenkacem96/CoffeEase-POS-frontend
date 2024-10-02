import React, { useEffect } from "react";
import { Row, Col, Card, Radio, Table, Button, Typography } from "antd";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/orderQueries";

const { Title } = Typography;


const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
    width: "20%",
  }, 
  {
    title: "Table",
    key: "table",
    dataIndex: "table",
    width: "10%",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
    width: "30%",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    width: "15%",
  },
  {
    title: "Order Time",
    dataIndex: "orderTime",
    key: "orderTime",
    width: "20%",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    width: "10%",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    width: "5%",
  },
];

function Order() {
  const { loading, error, data } = useQuery(GET_ORDERS);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Transform data for the table
  const transformedData = data.orders.map((order) => ({
    key: order.id,
    orderId: <span>{`ORD-${order.id}`}</span>,
    table: <span>{order.table.number}</span>,
    productName: <span>{order.product.name}</span>,
    quantity: <span>{order.quantity}</span>,
    orderTime: <span>{new Date(order.createdAt).toLocaleString()}</span>,
    status: (
      <Button type={order.status === "Confirmed" ? "primary" : order.status === "Canceled" ? "danger" : "default"}>
        {order.status}
      </Button>
    ),
    action: (
      <>
        <a href="#edit">Edit</a> | <a href="#cancel">Cancel</a>
      </>
    ),
  }));

  const onChange = (e) => console.log(`radio checked: ${e.target.value}`);

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Order Table"
            extra={
              <Radio.Group onChange={onChange} defaultValue="a">
                <Radio.Button value="a">All</Radio.Button>
                <Radio.Button value="b">Confirmed</Radio.Button>
                <Radio.Button value="c">Pending</Radio.Button>
                <Radio.Button value="d">Canceled</Radio.Button>
              </Radio.Group>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={transformedData}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Order;
