import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { UPDATE_CATEGORY, GET_CATEGORIES } from '../../graphql/categoryQueries';

const UpdateCategory = ({ open, setOpen, handleCancel, category }) => {
  const [form] = Form.useForm();
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        imageUrl: category.imageUrl,
      });
    }
  }, [category]);

  const handleSubmit = (values) => {
    updateCategory({
      variables: { id: category.id, name: values.name, imageUrl: values.imageUrl },
    });
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Update Category"
      visible={open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: 'Please input category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[{ required: true, message: 'Please input the image URL!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategory;
