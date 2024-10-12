import React, { useState } from "react";
import { Row, Col, Card, Radio, Table, Button, Typography, Modal, Input, message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ORDERS_BY_TABLE, UPDATE_ORDER_STATUS, UPDATE_ORDER_QUANTITY } from "../graphql/orderQueries";  // Importer les mutations

const { Title } = Typography;

const columns = (onEdit, onCancel) => [
  {
    title: "ID de commande",
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
    title: "Nom du produit",
    dataIndex: "productName",
    key: "productName",
    width: "30%",
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
        <Button type="danger" onClick={() => onCancel(record.id)}>Annuler</Button>
      </>
    ),
  },
];

function Order() {
  const [selectedTableId, setSelectedTableId] = useState(null);  // Définir l'ID de la table sélectionnée
  const [isModalVisible, setIsModalVisible] = useState(false);  // Gestion de la modale d'édition
  const [editOrder, setEditOrder] = useState(null);  // La commande à éditer
  const [newQuantity, setNewQuantity] = useState(0);  // Nouvelle quantité pour l'édition

  // Requête pour récupérer les commandes selon l'ID de la table sélectionnée
  const { loading, error, data } = useQuery(GET_ORDERS_BY_TABLE, {
    variables: { tableId: selectedTableId },
    skip: !selectedTableId,  // Ne pas exécuter si aucune table n'est sélectionnée
  });

  // Mutation pour mettre à jour le statut d'une commande
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => message.success("Commande annulée"),
    onError: () => message.error("Erreur lors de l'annulation"),
  });

  // Mutation pour mettre à jour la quantité d'une commande
  const [updateOrderQuantity] = useMutation(UPDATE_ORDER_QUANTITY, {
    onCompleted: () => message.success("Quantité modifiée avec succès"),
    onError: () => message.error("Erreur lors de la modification de la quantité"),
  });

  // Gérer la modification d'une commande
  const handleEdit = (order) => {
    setEditOrder(order);
    setNewQuantity(order.quantity);
    setIsModalVisible(true);
  };

  // Appliquer les modifications de quantité
  const handleEditSave = () => {
    updateOrderQuantity({ variables: { orderId: editOrder.key, quantity: newQuantity } });
    setIsModalVisible(false);
  };

  // Annuler une commande
  const handleCancelOrder = (orderId) => {
    updateOrderStatus({ variables: { id: orderId, status: "Canceled" } });
  };

  // Transfo des données pour le tableau
  const transformedData = data?.orders.map((order) => ({
    key: order.id,
    orderId: <span>{`ORD-${order.id}`}</span>,
    table: <span>{order.table ? order.table.number : "N/A"}</span>,
    productName: <span>{order.product ? order.product.name : "N/A"}</span>,
    quantity: <span>{order.quantity}</span>,
    orderTime: <span>{new Date(order.createdAt).toLocaleString()}</span>,
    status: (
      <Button
        type={
          order.status === "Confirmed"
            ? "primary"
            : order.status === "Canceled"
            ? "danger"
            : "default"
        }
      >
        {order.status}
      </Button>
    ),
  }));

  const onTableSelect = (tableId) => {
    setSelectedTableId(tableId);  // Définir l'ID de la table sélectionnée
  };

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Table des commandes"
            extra={
              <Radio.Group onChange={(e) => onTableSelect(e.target.value)} defaultValue={null}>
                <Radio.Button value={1}>Table 1</Radio.Button>
                <Radio.Button value={2}>Table 2</Radio.Button>
                <Radio.Button value={3}>Table 3</Radio.Button>
              </Radio.Group>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns(handleEdit, handleCancelOrder)}
                dataSource={transformedData}
                pagination={false}
                className="ant-border-space"
              />
            </div>
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
