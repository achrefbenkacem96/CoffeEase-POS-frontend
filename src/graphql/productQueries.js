import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      stock
      createdAt
      category {
        id
        name
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $description: String!, $price: Float!, $stock: Float!, $categoryId: Float!) {
    addProduct(name: $name, description: $description, price: $price, stock: $stock, categoryId: $categoryId) {
      id
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Float!, $name: String!, $description: String!, $price: Float!, $stock: Float!, $categoryId: Int) {
    updateProduct(id: $id, name: $name, description: $description, price: $price, stock: $stock, categoryId: $categoryId) {
      id
      name
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Float!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
