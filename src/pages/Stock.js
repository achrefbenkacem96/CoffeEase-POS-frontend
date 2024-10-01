import { Row, Col, Card, Radio, Table, Progress, Avatar, Typography, Modal, Button, Form, Input } from "antd";
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from "react-router-dom";
import { useState } from 'react';

const { Title } = Typography;

// Définition de la requête GraphQL pour récupérer les stocks
const GET_STOCKS = gql`
  query GetStocks {
    stocks {
      id
      product {
        id
        name
      }
      quantity
      movement
    }
  }
`;

// Mutation GraphQL pour mettre à jour le stock
const UPDATE_STOCK = gql`
  mutation UpdateStock($productId: Float!, $quantity: Float!) {
    updateStock(productId: $productId, quantity: $quantity) {
      id
      quantity
      product {
        name
      }
    }
  }
`;

// stock table configuration
const stockColumns = (onUpdate) => [
  {
    title: "ITEM",
    dataIndex: "item",
    width: "32%",
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
  },
  {
    title: "STATUS",
    dataIndex: "status",
  },
  {
    title: "REORDER",
    dataIndex: "reorder",
  },
  {
    title: "UPDATE",
    dataIndex: "update",
    render: (_, record) => (
      <Button onClick={() => onUpdate(record)}>Update</Button>
    ),
  },
];

function Stock() {
  // Utiliser useQuery pour récupérer les stocks depuis le backend
  const { loading, error, data, refetch } = useQuery(GET_STOCKS);
  const [updateStock] = useMutation(UPDATE_STOCK);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();
  const [filter, setFilter] = useState("all");

  const onChange = (e) => setFilter(e.target.value);

  // Ouvrir le modal pour la mise à jour des stocks
  const showUpdateModal = (record) => {
    console.log("Opening modal for product:", record);
    setSelectedProduct(record);
    setIsModalVisible(true);
    form.setFieldsValue({ quantity: record.quantity });
  };

  // Fermer le modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Gérer la soumission de la mise à jour du stock
  const handleUpdateStock = async (values) => {
    console.log("Submitting update with values:", values);
    try {
      // Vérifiez que selectedProduct et product existent avant d'essayer d'accéder à leurs propriétés
      if (!selectedProduct || !selectedProduct.product || !selectedProduct.product.id) {
        throw new Error('Product details are missing.');
      }

      // Appel de la mutation updateStock avec les valeurs du formulaire
      await updateStock({
        variables: {
          productId: selectedProduct.product.id,  // Assurez-vous que l'ID du produit est passé
          quantity: parseInt(values.quantity),
        },
      });

      // Réinitialiser le formulaire et cacher le modal
      form.resetFields();
      setIsModalVisible(false);

      // Recharger les stocks après mise à jour
      refetch();
    } catch (e) {
      console.error("Erreur lors de la mise à jour du stock :", e);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtrer les données en fonction du statut de stock
  const filteredData = data.stocks.filter((stock) => {
    if (filter === "all") return true;
    if (filter === "in-stock") return stock.quantity > 0;
    if (filter === "low-stock") return stock.quantity <= 10; // Ajustez selon vos critères
    return false;
  });

  // Mapping des données récupérées vers le format attendu par le tableau
  const stockData = filteredData.map((stock) => ({
    key: stock.id,
    item: (
      <Avatar.Group>
        <div className="avatar-info">
          <Title level={5}>{stock.product.name}</Title>
        </div>
      </Avatar.Group>
    ),
    quantity: (
      <div className="semibold">{stock.quantity} units</div>
    ),
    status: (
      <div className="text-sm">
        {stock.quantity > 0 ? "In Stock" : "Out of Stock"}
      </div>
    ),
    reorder: (
      <div className="ant-progress-project">
        <Progress
          percent={Math.min((stock.quantity / 100) * 100, 100)}
          size="small"
          status={stock.quantity <= 10 ? "exception" : undefined}
        />
      </div>
    ),
    product: stock.product,  // Inclure le produit ici pour passer au modal
    update: stock,
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
              <Radio.Group onChange={onChange} defaultValue="all">
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="in-stock">In Stock</Radio.Button>
                <Radio.Button value="low-stock">Low Stock</Radio.Button>
              </Radio.Group>
            }
          >
            <div className="table-responsive">
              <Table
                columns={stockColumns(showUpdateModal)}
                dataSource={stockData}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modal pour la mise à jour du stock */}
      <Modal
        title="Update Stock"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdateStock}>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input quantity!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Stock;
