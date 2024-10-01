import React, { useState } from 'react';
import { Row, Col, Button, Table, Card, Radio, Avatar, Typography, message } from 'antd';
import { CheckOutlined, DollarOutlined, CreditCardOutlined, GiftOutlined, DeleteOutlined, PlusOutlined, MinusOutlined, SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

const tables = [
  { key: 'T1', etat:true}, { key: 'T2', etat:true }, { key: 'T3', etat:false}, { key: 'T4', etat:true }, { key: 'T5', etat:true},
  { key: 'T6', etat:false}, { key: 'T7', etat:true }, { key: 'T8', etat:false }, { key: 'T9', etat:true }, { key: 'T10', etat:false },
  { key: 'T11', etat:true }, { key: 'T12', etat:false }, { key: 'T13', etat:true }, { key: 'T14', etat:false }, { key: 'T15', etat:true },
  { key: 'T16', etat:true }, { key: 'T17', etat:true }, { key: 'T18', etat:true }, { key: 'T19', etat:true }, { key: 'T20', etat:true },
  { key: 'T21', etat:false }, { key: 'T22', etat:false }
];

const initialOrderData = [
  { key: 1, item: 'CRISPY STRIPS MEAL', price: 14.99, quantity: 2 },
  { key: 2, item: 'LIGHT STRIPS BOX', price: 5.99, quantity: 1 },
  { key: 3, item: 'ZINGER BOX', price: 8.99, quantity: 1 },
  { key: 4, item: 'MIGHTY ZINGER', price: 7.99, quantity: 1 },
];

const Tables = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderData, setOrderData] = useState(initialOrderData);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const onTableSelect = (tableKey) => {
    setSelectedTable(tableKey);
    message.success(`Table ${tableKey} selected`);
  };

  const onAddItem = (key) => {
    const updatedOrder = orderData.map((item) => {
      if (item.key === key) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setOrderData(updatedOrder);
  };

  const onRemoveItem = (key) => {
    const updatedOrder = orderData
      .map((item) => {
        if (item.key === key && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter(item => item.quantity > 0); // Remove if quantity is 0
    setOrderData(updatedOrder);
  };

  const orderColumns = [
    {
      title: 'Item',
      dataIndex: 'item',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      render: (quantity, record) => (
        <>
         <Button
          style={{ marginRight: 8,padding:1}}
          type="default"
          icon={<MinusOutlined />}
          onClick={() => onRemoveItem(record.key)}
        />
        {quantity} 
        <Button
          style={{ marginRight: 8,padding:1}}
          type="default"
          icon={<PlusOutlined  />}
          onClick={() => onAddItem(record.key)}
        />
        </>
      ),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Button
        style={{ padding:1}}

          type="primary"
          icon={<DeleteOutlined  />}
          onClick={() => onRemoveItem(record.key)}
          danger
         />
      ),
    },
  ];

  const calculateTotal = () => {
    const subTotal = orderData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subTotal * 0.1;
    const total = subTotal + tax;
    return { subTotal, tax, total };
  };

  const { subTotal, tax, total } = calculateTotal();

  return (
    <Row gutter={22}>
      {/* Tables List */}
      <Col span={12}>
        <Card title="Tables List" bordered={false}>
          <Row gutter={[12, 12]}>
            {tables.map((table) => (
              <Col span={4} key={table.key}>
                {table.etat ?
                <Button
                  shape="circle"
                  size="large"
                  onClick={() => onTableSelect(table.key)}
                  type={selectedTable === table.key ? 'primary' : 'default'}
                  className={selectedTable === table.key ? 'selected-table' : ''}
                  style={{backgroundColor: "#40FF40"}}

                >
                  {table.key}
                </Button> :
                <Button
                  shape="circle"
                  size="large"
                   type={'primary'}
                  className={selectedTable === table.key ? 'selected-table' : ''}
                  disabled={true}
                  style={{backgroundColor: "#FF3131"}}
                  danger
                >
                  {table.key}
                </Button>}
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
    
      {/* Order and Payment Section */}
      <Col span={12}>
        <Card
          title={`Order List ${selectedTable || ''}`}
          extra={
            <Button type="primary" onClick={() => message.success('Payment processed')}>
              Pay ${total.toFixed(2)}
            </Button>
          }
        >
          <Table
            columns={orderColumns}
            dataSource={orderData}
            pagination={false}
            summary={() => (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={2}>Sub Total</Table.Summary.Cell>
                  <Table.Summary.Cell>{`$${subTotal.toFixed(2)}`}</Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={2}>Tax (10%)</Table.Summary.Cell>
                  <Table.Summary.Cell>{`$${tax.toFixed(2)}`}</Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={2}>Total</Table.Summary.Cell>
                  <Table.Summary.Cell>{`$${total.toFixed(2)}`}</Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            )}
          />

          {/* <Card title="Payment Method">
            <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <Radio.Button value="cash">
                <DollarOutlined /> Cash
              </Radio.Button>
              <Radio.Button value="card">
                <CreditCardOutlined /> Card
              </Radio.Button>
              <Radio.Button value="gift">
                <GiftOutlined /> Gift
              </Radio.Button>
            </Radio.Group>
          </Card> */}
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;
