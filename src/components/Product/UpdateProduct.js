import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PRODUCT, GET_PRODUCTS } from '../../graphql/productQueries';
import { GET_CATEGORIES } from '../../graphql/categoryQueries';

const UpdateProduct = ({ open, setOpen, handleCancel, product }) => {
  const [form] = Form.useForm();
  const { data: categoryData } = useQuery(GET_CATEGORIES);

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
    updateProduct({ variables: { productId: product.id, ...values } });
  };

  return (
    <Modal
      title="Update Product"
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: product?.name,
          description: product?.description,
          price: product?.price,
          stock: product?.stock,
          imageUrl: product?.imageUrl,
          categoryId: product?.category?.id,
        }}
      >
        <Form.Item label="Product Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Image URL" name="imageUrl">
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="categoryId" rules={[{ required: true }]}>
          <Select>
            {categoryData?.categories.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProduct;
