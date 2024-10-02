import React from 'react';
import { Modal, Form, InputNumber, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_STOCK, GET_STOCKS } from '../../graphql/stockQueries';

const CreateStock = ({ open, setOpen, handleCancel }) => {
  const [form] = Form.useForm();
  const [addStock] = useMutation(ADD_STOCK, {
    refetchQueries: [{ query: GET_STOCKS }],
    onCompleted: () => {
      form.resetFields();
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onFinish = (values) => {
    addStock({ variables: { ...values } });
  };

  return (
    <Modal
      title="Add Stock"
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item label="Product ID" name="productId" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Movement" name="movement" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateStock;
