import React, { useState } from 'react';
import { Row, Col, Button, Card, Table, message, Popconfirm } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TABLES, CREATE_TABLE, DELETE_TABLE, UPDATE_TABLE_STATUS } from '../graphql/tableQueries';
import { GET_ORDERS_BY_TABLE, UPDATE_ORDER_QUANTITY } from '../graphql/orderQueries';  
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';

const Tables = () => {
  const [selectedTable, setSelectedTable] = useState(null);

  // Fetch tables
  const { loading: tablesLoading, error: tablesError, data: tablesData } = useQuery(GET_TABLES);

  // Mutation pour créer une table
  const [createTable] = useMutation(CREATE_TABLE, {
    refetchQueries: [{ query: GET_TABLES }],
    onCompleted: () => message.success('Table added successfully'),
    onError: (error) => message.error(`Failed to add table: ${error.message}`)
  });

  // Mutation pour supprimer une table
  const [deleteTable] = useMutation(DELETE_TABLE, {
    refetchQueries: [{ query: GET_TABLES }],
    onCompleted: () => message.success('Table deleted successfully'),
    onError: (error) => message.error(`Failed to delete table: ${error.message}`)
  });

  // Mutation pour mettre à jour le statut d'une table
  const [updateTableStatus] = useMutation(UPDATE_TABLE_STATUS, {
    refetchQueries: [{ query: GET_TABLES }],
    onCompleted: () => message.success('Table status updated'),
    onError: (error) => message.error(`Failed to update table: ${error.message}`)
  });

  // Mutation pour mettre à jour la quantité d'une commande
  const [updateOrderQuantity] = useMutation(UPDATE_ORDER_QUANTITY, {
    onCompleted: () => message.success('Quantity updated successfully'),
    onError: (error) => message.error(`Failed to update quantity: ${error.message}`)
  });

  // Fetch orders by table
  const { loading: ordersLoading, error: ordersError, data: ordersData, refetch: refetchOrders } = useQuery(GET_ORDERS_BY_TABLE, {
    variables: { tableId: selectedTable },
    skip: !selectedTable,
  });

  if (ordersData) {
    console.log('Orders Data:', ordersData);
  }
  

  // Ajouter une table
  const handleAddTable = () => {
    const tableNumber = tablesData?.tables.length + 1 || 1; 
    createTable({ variables: { number: tableNumber, status: 'AVAILABLE' } });
  };

  // Supprimer une table
  const handleDeleteTable = (id) => {
    deleteTable({ variables: { id } });
  };

  // Sélectionner une table et afficher les commandes associées
  const handleTableSelect = (table) => {
    setSelectedTable(table.id);
    refetchOrders({ tableId: table.id });
  };

  // Fonction pour mettre à jour la quantité d'une commande
  const handleQuantityChange = (orderId, quantityChange) => {
    const order = ordersData.orders.find(order => order.id === orderId);
    const newQuantity = order.quantity + quantityChange;
    if (newQuantity > 0) {
      updateOrderQuantity({ variables: { orderId, quantity: newQuantity } });
    }
  };

  // Fonction pour mettre à jour le statut de la table
  const handleUpdateTableStatus = (tableId, currentStatus) => {
    const newStatus = currentStatus === 'OCCUPIED' ? 'AVAILABLE' : 'OCCUPIED';
    updateTableStatus({
      variables: { id: tableId, status: newStatus },
    });
  };

  const columns = [
    { title: 'Product Name', dataIndex: ['product', 'name'], key: 'name' },
    { title: 'Price', dataIndex: ['product', 'price'], key: 'price' }, 
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
    { title: 'Status', dataIndex: 'status', key: 'status' }
  ];
  
  if (tablesLoading) return <p>Loading tables...</p>;
  if (tablesError) return <p>Error loading tables: {tablesError.message}</p>;

  const orders = ordersData?.orders || []; 

  // Trier les commandes par identifiant pour éviter qu'elles se déplacent
  const sortedOrders = [...orders].sort((a, b) => a.id - b.id);

  // Trier les tables par identifiant pour éviter qu'elles changent de place
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
                  type={table.status === 'OCCUPIED' ? 'danger' : 'primary'}
                  onClick={() => handleTableSelect(table)}
                >
                  T{table.number}
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleUpdateTableStatus(table.id, table.status)}
                  style={{ marginTop: '5px' }}
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
            <Table columns={columns} dataSource={sortedOrders} pagination={false} />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;
