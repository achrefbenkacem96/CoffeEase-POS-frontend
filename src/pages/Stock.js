import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Table, Button, Card, Row, Col, Space, Popconfirm, message } from 'antd';
import { GET_STOCKS, DELETE_STOCK } from '../graphql/stockQueries';
import CreateStock from '../components/stock/CreateStock';
import UpdateStock from '../components/stock/UpdateStock';

const Stock = () => {
  const { loading, error, data } = useQuery(GET_STOCKS);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const [deleteStock] = useMutation(DELETE_STOCK, {
    refetchQueries: [{ query: GET_STOCKS }],
    onCompleted: () => {
      message.success('Stock deleted successfully!');
    },
    onError: (error) => {
      message.error(`Failed to delete stock: ${error.message}`);
    },
  });

  const showAddModal = () => {
    setOpen(true);
  };

  const showUpdateModal = (stock) => {
    setSelectedStock(stock);
    setUpdateOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setUpdateOpen(false);
  };

  const handleDelete = (id) => {
    deleteStock({ variables: { id } });
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: ['product', 'name'],
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Movement',
      dataIndex: 'movement',
      key: 'movement',
    },
    {
      title: 'Action',
      render: (_, stock) => (
        <Space size="middle">
          <a onClick={() => showUpdateModal(stock)}>Update</a>
          <Popconfirm
            title="Are you sure to delete this stock?"
            onConfirm={() => handleDelete(stock.id)}
            okText="Yes"
            cancelText="No"
          >
            <a style={{ color: 'red' }}>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  data.stocks.map((stock, index) => {
   if(stock.quantity < 20){
    message.error(stock.product.name + " alert stock bas");
   }
  }
)
  // Mapping des données avec une clé unique
  const stockData = data.stocks.map((stock, index) => ({
    key: stock.id || index,  
    ...stock,
  }));

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Stock Table"
            extra={
              <Button type="primary" onClick={showAddModal}>
                Add Stock
              </Button>
            }
          >
            <CreateStock open={open} setOpen={setOpen} handleCancel={handleCancel} />
            <UpdateStock open={updateOpen} setOpen={setUpdateOpen} handleCancel={handleCancel} stock={selectedStock} />
            <Table columns={columns} dataSource={stockData} pagination={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Stock;
