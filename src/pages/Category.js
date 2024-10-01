import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Table, Button, Card, Row, Col, Space, Popconfirm, message } from 'antd';
import CreateCategory from '../components/Category/CreateCategory';
import UpdateCategory from '../components/Category/UpdateCategory';
import { DELETE_CATEGORY, GET_CATEGORIES } from '../graphql/categoryQueries';

const Category = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [open, setOpen] = useState(false); // Modal visibility for adding
  const [updateOpen, setUpdateOpen] = useState(false); // Modal visibility for updating
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category for updating

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    onCompleted: () => {
      message.success('Category deleted successfully!');
    },
    onError: (error) => {
      message.error(`Failed to delete category: ${error.message}`);
    },
  });

  const showAddModal = () => setOpen(true);
  const showUpdateModal = (category) => {
    setSelectedCategory(category);
    setUpdateOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setUpdateOpen(false);
  };

  const handleDelete = (id) => {
    deleteCategory({ variables: { id } });
  };

  const columns = [
    {
      title: "Category ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image URL",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    
    {
      title: "Action",
      dataIndex: "action",
      render: (_, category) => (
        <Space size="middle">
          <a onClick={() => showUpdateModal(category)}>Update</a>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(category.id)}
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

  const categoryData = data.categories.map(category => ({
    key: category.id,
    id: category.id,
    name: category.name,
    imageUrl: category.imageUrl,
    products: category.products,
  }));

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Category Table"
            extra={
              <Button type="primary" onClick={showAddModal}>
                Add Category
              </Button>
            }
          >
            <CreateCategory open={open} setOpen={setOpen} handleCancel={handleCancel} />
            <UpdateCategory 
              open={updateOpen} 
              setOpen={setUpdateOpen} 
              handleCancel={handleCancel} 
              category={selectedCategory} 
            />
            <Table
              columns={columns}
              dataSource={categoryData}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Category;
