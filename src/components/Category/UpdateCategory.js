// src/components/Category/UpdateCategory.js
import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { useMutation, gql } from '@apollo/client';
import { GET_CATEGORIES, UPDATE_CATEGORY } from '../../graphql/categoryQueries';

 

const UpdateCategory = ({ open, setOpen, handleCancel, category }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryName, setCategoryName] = useState(category?.name || '');
  console.log("🚀 ~ UpdateCategory ~ categoryName:", categoryName)

  // GraphQL mutation to update the category
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    onCompleted: (data) => {
      message.success(`Category "${data.updateCategory.name}" updated successfully!`);
      setOpen(false);
      setConfirmLoading(false);
    },
    onError: (error) => {
      message.error(`Failed to update category: ${error.message}`);
      setConfirmLoading(false);
    },
  });

  const handleOk = async () => {
    if (!categoryName.trim()) {
      message.error("Category name can't be empty");
      return;
    }
    setCategoryName()
    setConfirmLoading(true);
    // Call the mutation to update the category
    await updateCategory({ variables: { id: category.id, name: categoryName } });
  };

  return (
    <Modal
      title="Update Category"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter category name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
    </Modal>
  );
};

export default UpdateCategory;
