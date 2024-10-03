import React, { useState } from 'react';
import { Row, Col, Button, Card, Table, message, Popconfirm } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TABLES, CREATE_TABLE, DELETE_TABLE, UPDATE_TABLE_STATUS } from '../graphql/tableQueries';
import { GET_ORDERS_BY_TABLE } from '../graphql/orderQueries'; // Requête pour obtenir les commandes par table
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';

const Tables = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderData, setOrderData] = useState([]);

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

  // Fetch orders by table
  const { loading: ordersLoading, error: ordersError, data: ordersData, refetch: refetchOrders } = useQuery(GET_ORDERS_BY_TABLE, {
    variables: { tableId: selectedTable },
    skip: !selectedTable, // Ne fait la requête que si une table est sélectionnée
  });

  // Ajouter une table
  const handleAddTable = () => {
    const tableNumber = tablesData?.tables.length + 1 || 1; // Attribuer un numéro de table automatiquement
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

  const columns = [
    { title: 'Product Name', dataIndex: ['product', 'name'], key: 'name' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Status', dataIndex: 'status', key: 'status' }
  ];

  if (tablesLoading) return <p>Loading tables...</p>;
  if (tablesError) return <p>Error loading tables: {tablesError.message}</p>;

  const orders = ordersData?.orders || []; // Utilisation de "?" pour éviter l'erreur si ordersData est indéfini

  return (
    <Row gutter={22}>
      {/* Tables List */}
      <Col span={12}>
        <Card title="Tables List" bordered={false} extra={<Button type="primary" onClick={handleAddTable}>Add Table</Button>}>
          <Row gutter={[12, 12]}>
            {tablesData.tables.map((table) => (
              <Col span={4} key={table.id}>
                <Button
                  shape="circle"
                  size="large"
                  type={table.status === 'OCCUPIED' ? 'danger' : 'primary'}
                  onClick={() => handleTableSelect(table)}
                >
                  T{table.number}
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

      {/* Order and Payment Section */}
      <Col span={12}>
        <Card title={`Order List for Table ${selectedTable || ''}`}>
          {ordersLoading ? (
            <p>Loading orders...</p>
          ) : ordersError ? (
            <p>Error loading orders: {ordersError.message}</p>
          ) : orders.length === 0 ? (
            <p>No orders for this table</p>
          ) : (
            <Table columns={columns} dataSource={orders} pagination={false} />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;
