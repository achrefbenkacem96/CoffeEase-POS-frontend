import React from 'react';
import { Modal, Form, Input, InputNumber, Button, Select, Spin } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT, GET_PRODUCTS } from '../../graphql/productQueries';
import { GET_CATEGORIES } from '../../graphql/categoryQueries';

const { Option } = Select;

const CreateProduct = ({ open, setOpen, handleCancel }) => {
  const [form] = Form.useForm();
  const { loading, error, data: categoryData } = useQuery(GET_CATEGORIES);

  const [addProduct] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    onCompleted: () => {
      form.resetFields();
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onFinish = (values) => {
    addProduct({ variables: { ...values } });
  };

  if (loading) return <Spin />; // Show loading indicator
  if (error) return <p>Error fetching categories: {error.message}</p>;

  return (
    <Modal
      title="Add Product"
      visible={open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
          <Select placeholder="Select a category">
            {categoryData.categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}  
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Product</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProduct;
