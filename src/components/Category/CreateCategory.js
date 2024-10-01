import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY, GET_CATEGORIES } from '../../graphql/categoryQueries';

const CreateCategory = ({ open, setOpen, handleCancel }) => {
  const [form] = Form.useForm();
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const handleSubmit = (values) => {
    createCategory({
      variables: { name: values.name, imageUrl: values.imageUrl },
    });
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Add Category"
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
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategory;
