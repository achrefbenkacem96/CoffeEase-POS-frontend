// src/components/Category/CreateCategory.js
import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { useMutation, gql, useQuery } from '@apollo/client';
import { CREATE_CATEGORY, GET_CATEGORIES } from '../../graphql/categoryQueries';
 
 

const CreateCategory = ({ open, setOpen, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  // GraphQL mutation to create a new category
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    update: (cache, { data: { createCategory } }) => {
      const { categories } = cache.readQuery({ query: GET_CATEGORIES });
      cache.writeQuery({
        query: GET_CATEGORIES,
        data: {
          categories: [...categories, createCategory],
        },
      });
    },
    onCompleted: (data) => {
      message.success(`Category "${data.createCategory.name}" created successfully!`);
      setCategoryName(''); // Clear the input field
      setOpen(false); // Close the modal
      setConfirmLoading(false); // Reset the loading state
    },
    onError: (error) => {
      message.error(`Failed to create category: ${error.message}`);
      setConfirmLoading(false); // Reset the loading state
    },
  });

  const handleOk = async () => {
    if (!categoryName.trim()) {
      message.error("Category name can't be empty");
      return;
    }

    setConfirmLoading(true);
    // Call the mutation to create a new category
    await createCategory({ variables: { name: categoryName } });
  };

  return (
    <Modal
      title="Add New Category"
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

export default CreateCategory;
