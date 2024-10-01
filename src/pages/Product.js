import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Table, Button, Card, Row, Col, Space, Popconfirm, message } from 'antd';
import { DELETE_PRODUCT, GET_PRODUCTS } from '../graphql/productQueries';
import CreateProduct from '../components/Product/CreateProduct';
import UpdateProduct from '../components/Product/UpdateProduct';

const Product = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    onCompleted: () => {
      message.success('Product deleted successfully!');
    },
    onError: (error) => {
      message.error(`Failed to delete product: ${error.message}`);
    },
  });

  const showAddModal = () => {
    setOpen(true);
  };

  const showUpdateModal = (product) => {
    setSelectedProduct(product);
    setUpdateOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setUpdateOpen(false);
  };

  const handleDelete = (id) => {
    deleteProduct({ variables: { id } });
  };

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => category?.name,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, product) => (
        <Space size="middle">
          <a onClick={() => showUpdateModal(product)}>Update</a>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(product.id)}
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

  const productData = data.products.map((product) => ({
    key: product.id,
    ...product,
  }));

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Product Table"
            extra={
              <Button type="primary" onClick={showAddModal}>
                Add Product
              </Button>
            }
          >
            <CreateProduct open={open} setOpen={setOpen} handleCancel={handleCancel} />
            <UpdateProduct open={updateOpen} setOpen={setUpdateOpen} handleCancel={handleCancel} product={selectedProduct} />
            <Table columns={columns} dataSource={productData} pagination={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
