import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select, Spin } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCTS, UPDATE_PRODUCT } from '../../graphql/productQueries';
import { GET_CATEGORIES } from '../../graphql/categoryQueries';

const { Option } = Select;

const UpdateProduct = ({ open, setOpen, handleCancel, product }) => {
  const [form] = Form.useForm();
  const { loading, error, data: categoryData } = useQuery(GET_CATEGORIES);

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
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
    updateProduct({ variables: { id: product.id, ...values } });
  };

  useEffect(() => {
    if (product) {
      form.setFieldsValue({ ...product, categoryId: product.category.id }); // Set the categoryId
    }
  }, [product, form]);

  if (loading) return <Spin />; // Show loading indicator
  if (error) return <p>Error fetching categories: {error.message}</p>;

  return (
    <Modal
      title="Update Product"
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
          <Select placeholder="Select a category" allowClear>
            {categoryData.categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Update Product</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProduct;
