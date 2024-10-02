import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      imageUrl
      products {
        id
        name
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $imageUrl: String!) {
    createCategory(name: $name, imageUrl: $imageUrl) {
      id
      name
      imageUrl
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: Int!, $name: String!, $imageUrl: String!) {
    updateCategory(id: $id, name: $name, imageUrl: $imageUrl) {
      id
      name
      imageUrl
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Float!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;
