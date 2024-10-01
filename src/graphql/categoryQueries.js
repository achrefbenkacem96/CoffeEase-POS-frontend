import { gql } from '@apollo/client';
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      products {
        id
        name
      }
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

 

export const CREATE_CATEGORY = gql`
mutation CreateCategory($name: String!) {
  createCategory(name: $name) {
    id
    name
  }
}
`;

export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($id: Int!, $name: String!) {
  updateCategory(id: $id, name: $name) {
    id
    name
  }
}
`;
 