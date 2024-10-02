import React from 'react';
import { Modal, Form, InputNumber } from 'antd';
import { useMutation } from '@apollo/client';
import { UPDATE_STOCK, GET_STOCKS } from '../../graphql/stockQueries';

const UpdateStock = ({ open, setOpen, handleCancel, stock }) => {
  const [form] = Form.useForm();
  const [updateStock] = useMutation(UPDATE_STOCK, {
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
    updateStock({ variables: { id: stock.id, ...values } });
  };

  return (
    <Modal
      title="Update Stock"
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          quantity: stock?.quantity,
        }}
      >
        <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateStock;
