import React, { useState } from "react";
import { Row, Col, Card, Table, Button, Modal, Input, message, Select } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ORDERS_BY_TABLE, UPDATE_ORDER_STATUS, UPDATE_ORDER_QUANTITY } from "../graphql/orderQueries";  
import { GET_TABLES } from "../graphql/tableQueries";

const { Option } = Select;

const columns = (onEdit, onCancel) => [
  {
    title: "ID de commande",
    dataIndex: "orderId",
    key: "orderId",
    width: "15%",
  },
  {
    title: "Table",
    key: "table",
    dataIndex: "table",
    width: "10%",
  },
  {
    title: "Nom du produit",
    dataIndex: "productName",
    key: "productName",
    width: "25%",
  },
  {
    title: "Quantité",
    dataIndex: "quantity",
    key: "quantity",
    width: "15%",
  },
  {
    title: "Date de commande",
    dataIndex: "orderTime",
    key: "orderTime",
    width: "20%",
  },
  {
    title: "Statut",
    key: "status",
    dataIndex: "status",
    width: "10%",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    width: "15%",
    render: (_, record) => (
      <>
        <Button onClick={() => onEdit(record)}>Modifier</Button> |{" "}
        <Button type="danger" onClick={() => onCancel(record.key)}>Annuler</Button>
      </>
    ),
  },
];

function Order() {
  const [selectedTableId, setSelectedTableId] = useState(null);  // Sélection de la table
  const [isModalVisible, setIsModalVisible] = useState(false);  // Modale d'édition
  const [editOrder, setEditOrder] = useState(null);  // Commande à éditer
  const [newQuantity, setNewQuantity] = useState(0);  // Nouvelle quantité

  // Mutation pour annuler la commande
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => message.success("Commande annulée"),
    onError: () => message.error("Erreur lors de l'annulation"),
  });

  // Mutation pour modifier la quantité
  const [updateOrderQuantity] = useMutation(UPDATE_ORDER_QUANTITY, {
    onCompleted: () => message.success("Quantité modifiée avec succès"),
    onError: () => message.error("Erreur lors de la modification de la quantité"),
  });

  // Requête pour obtenir les commandes par table seulement si `tableId` est sélectionné
  const { loading, error, data } = useQuery(GET_ORDERS_BY_TABLE, {
    variables: { tableId: selectedTableId },
    skip: !selectedTableId, // Ne pas exécuter tant qu'une table n'est pas sélectionnée
  });

  // Requête pour obtenir les tables
  const { data: tablesData } = useQuery(GET_TABLES);

  // Modifier la commande
  const handleEdit = (order) => {
    setEditOrder(order);
    setNewQuantity(order.quantity);
    setIsModalVisible(true);
  };

  // Sauvegarder la modification de quantité
  const handleEditSave = () => {
    updateOrderQuantity({ variables: { orderId: editOrder.key, quantity: newQuantity } });
    setIsModalVisible(false);
  };

  // Annuler une commande
  const handleCancelOrder = (orderId) => {
    updateOrderStatus({ variables: { id: orderId, status: "Canceled" } });
  };

  // Transformation des données
  const transformedData = data?.orders.map((order) => ({
    key: order.id,
    orderId: <span>{`ORD-${order.id}`}</span>,
    table: <span>{order.table ? order.table.number : "N/A"}</span>,
    productName: <span>{order.product ? order.product.name : "N/A"}</span>,
    quantity: <span>{order.quantity}</span>,
    orderTime: <span>{new Date(order.createdAt).toLocaleString()}</span>,
    status: (
      <Button
        type={order.status === "Confirmed" ? "primary" : order.status === "Canceled" ? "danger" : "default"}
      >
        {order.status}
      </Button>
    ),
  }));

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Table des commandes"
            extra={
              <Select
                style={{ width: "200px" }}
                placeholder="Sélectionner une table"
                onChange={setSelectedTableId} // Permet la sélection d'une table
                allowClear
              >
                {tablesData?.tables.map((table) => (
                  <Option key={table.id} value={table.id}>
                    Table {table.number}
                  </Option>
                ))}
              </Select>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns(handleEdit, handleCancelOrder)}
                dataSource={transformedData}
                pagination={false}
                className="ant-border-space"
                loading={loading}
              />
            </div>
            {error && <p>Erreur lors du chargement des commandes : {error.message}</p>}
          </Card>
        </Col>
      </Row>

      {/* Modale pour modifier la commande */}
      <Modal
        title="Modifier la commande"
        visible={isModalVisible}
        onOk={handleEditSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>ID de commande: {editOrder?.orderId}</p>
        <p>Produit: {editOrder?.productName}</p>
        <Input
          type="number"
          value={newQuantity}
          onChange={(e) => setNewQuantity(parseInt(e.target.value))}
          min={1}
        />
      </Modal>
    </div>
  );
}

export default Order;
