import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Table, message, Popconfirm } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TABLES, CREATE_TABLE, DELETE_TABLE, UPDATE_TABLE_STATUS } from '../graphql/tableQueries';
import { GET_ORDERS_BY_TABLE, UPDATE_ORDER_QUANTITY, CREATE_PAYMENT } from '../graphql/orderQueries';  
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';

const Tables = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const { loading: tablesLoading, error: tablesError, data: tablesData, refetch: refetchTables } = useQuery(GET_TABLES);
  const [createTable] = useMutation(CREATE_TABLE, {
    refetchQueries: [{ query: GET_TABLES }],
    onCompleted: () => message.success('Table added successfully'),
    onError: (error) => message.error(`Failed to add table: ${error.message}`)
  });

  const [deleteTable] = useMutation(DELETE_TABLE, {
    refetchQueries: [{ query: GET_TABLES }],
    onCompleted: () => message.success('Table deleted successfully'),
    onError: (error) => message.error(`Failed to delete table: ${error.message}`)
  });

  const [updateTableStatus] = useMutation(UPDATE_TABLE_STATUS, {
    refetchQueries: [{ query: GET_TABLES }],
    onCompleted: () => message.success('Table status updated'),
    onError: (error) => message.error(`Failed to update table: ${error.message}`)
  });

  const [updateOrderQuantity] = useMutation(UPDATE_ORDER_QUANTITY, {
    onCompleted: () => message.success('Quantity updated successfully'),
    onError: (error) => message.error(`Failed to update quantity: ${error.message}`)
  });

  const [createPayment] = useMutation(CREATE_PAYMENT, {
    onCompleted: (data) => {
      message.success('Payment successful!');
      generatePDF(); // Générer le PDF après le paiement
      refetchOrders();
      refetchTables();
    },
    onError: (error) => {
      message.error(`Failed to process payment: ${error.message}`);
    }
  });

  const { loading: ordersLoading, error: ordersError, data: ordersData, refetch: refetchOrders } = useQuery(GET_ORDERS_BY_TABLE, {
    variables: { tableId: selectedTable },
    skip: !selectedTable,
  });

  useEffect(() => {
    calculateTotal();
  }, [ordersData]);

  const calculateTotal = () => {
    let total = 0;
    if (ordersData?.orders) {
      ordersData.orders.forEach(order => {
        total += order.product.price * order.quantity;
      });
    }
    setTotalAmount(total);
  };

  const handleAddTable = () => {
    const tableNumber = tablesData?.tables.length + 1 || 1; 
    createTable({ variables: { number: tableNumber, status: 'AVAILABLE' } });
  };

  const handleDeleteTable = (id) => {
    deleteTable({ variables: { id } });
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table.id);
    refetchOrders({ tableId: table.id });
  };

  const handleQuantityChange = (orderId, quantityChange) => {
    const order = ordersData.orders.find(order => order.id === orderId);
    const newQuantity = order.quantity + quantityChange;
    if (newQuantity > 0) {
      updateOrderQuantity({ variables: { orderId, quantity: newQuantity } });
    }
  };

  const handlePayment = () => {
    createPayment({ variables: { orderId: selectedTable, amount: totalAmount, paymentType: 'CASH' } });
  };

  // Fonction pour générer le ticket PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Ticket de Commande', 20, 20);
    ordersData.orders.forEach((order, index) => {
      doc.text(`Produit: ${order.product.name}`, 20, 30 + index * 10);
      doc.text(`Quantité: ${order.quantity}`, 120, 30 + index * 10);
      doc.text(`Prix: ${order.product.price}`, 160, 30 + index * 10);
    });
    doc.text(`Total: $${totalAmount.toFixed(2)}`, 20, 90);
    doc.save(`ticket_table_${selectedTable}.pdf`);
  };

  const handleUpdateTableStatus = (tableId, currentStatus) => {
    const newStatus = currentStatus === 'OCCUPIED' ? 'AVAILABLE' : 'OCCUPIED';
    updateTableStatus({
      variables: { id: tableId, status: newStatus },
    });
  };

  const columns = [
    { title: 'Product Name', dataIndex: ['product', 'name'], key: 'name' },
    { title: 'Price', dataIndex: ['product', 'price'], key: 'price', render: (price) => `$${price.toFixed(2)}` },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <>
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleQuantityChange(record.id, -1)}
          />
          <span style={{ margin: '0 10px' }}>{record.quantity}</span>
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleQuantityChange(record.id, 1)}
          />
        </>
      )
    },
    { title: 'Total', key: 'total', render: (text, record) => `$${(record.product.price * record.quantity).toFixed(2)}` },
    { title: 'Status', dataIndex: 'status', key: 'status' }
  ];

  if (tablesLoading) return <p>Loading tables...</p>;
  if (tablesError) return <p>Error loading tables: {tablesError.message}</p>;

  const orders = ordersData?.orders || [];

  const sortedOrders = [...orders].sort((a, b) => a.id - b.id);
  const sortedTables = [...(tablesData?.tables || [])].sort((a, b) => a.id - b.id);

  return (
    <Row gutter={22}>
      <Col span={12}>
        <Card title="Tables List" bordered={false} extra={<Button type="primary" onClick={handleAddTable}>Add Table</Button>}>
          <Row gutter={[12, 12]}>
            {sortedTables.map((table) => (
              <Col span={4} key={table.id}>
                <Button
                  shape="circle"
                  size="large"
                  style={{ backgroundColor: table.status === 'OCCUPIED' ? '#ff4d4f' : '#52c41a', color: 'white' }}
                  onClick={() => handleTableSelect(table)}
                >
                  T{table.number}
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleUpdateTableStatus(table.id, table.status)}
                  style={{ marginTop: '5px', backgroundColor: table.status === 'OCCUPIED' ? '#ff4d4f' : '#52c41a', color: 'white' }}
                >
                  {table.status === 'OCCUPIED' ? 'Mark as Available' : 'Mark as Occupied'}
                </Button>
                <Popconfirm
                  title="Are you sure to delete this table?"
                  onConfirm={() => handleDeleteTable(table.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>

      <Col span={12}>
        <Card title={`Order List for Table ${selectedTable || ''}`}>
          {ordersLoading ? (
            <p>Loading orders...</p>
          ) : ordersError ? (
            <p>Error loading orders: {ordersError.message}</p>
          ) : orders.length === 0 ? (
            <p>No orders for this table</p>
          ) : (
            <>
              <Table columns={columns} dataSource={sortedOrders} pagination={false} />
              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <p>Total Amount: <strong>${totalAmount.toFixed(2)}</strong></p>
                <Button type="primary" onClick={handlePayment} disabled={totalAmount === 0}>
                  Pay Now
                </Button>
              </div>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;
