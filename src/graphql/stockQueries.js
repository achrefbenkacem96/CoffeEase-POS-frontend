import { gql } from '@apollo/client';

export const GET_STOCKS = gql`
  query GetStocks {
    stocks {
      id
      quantity
      movement
      product {
        id
        name
        category {
          id
          name
        }
      }
    }
  }
`;

export const ADD_STOCK = gql`
  mutation AddStock($productId: Int!, $quantity: Int!, $movement: String!) {
    addStock(productId: $productId, quantity: $quantity, movement: $movement) {
      id
      quantity
      movement
      product {
        id
        name
      }
    }
  }
`;

export const UPDATE_STOCK = gql`
  mutation UpdateStock($id: Int!, $quantity: Int!) {
    updateStock(id: $id, quantity: $quantity) {
      id
      quantity
      product {
        id
        name
      }
    }
  }
`;

export const DELETE_STOCK = gql`
  mutation DeleteStock($id: Int!) {
    deleteStock(id: $id) {
      id
      product {
        id
        name
      }
    }
  }
`;
