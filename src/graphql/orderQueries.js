import { gql } from '@apollo/client';

// Query to get all orders
export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      status
      quantity
      product {
        id
        name
        price
      }
      table {
        id
        number
      }
      createdAt
    }
  }
`;

// Query to get a single order by ID
export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: Int!) {
    getOrderById(id: $id) {
      id
      status
      quantity
      product {
        id
        name
        price
      }
      table {
        id
        number
      }
      createdAt
    }
  }
`;

// Mutation to create an order
export const CREATE_ORDER = gql`
  mutation CreateOrder($productId: Float!, $quantity: Float!, $tableId: Float!) {
    createOrder(productId: $productId, quantity: $quantity, tableId: $tableId) {
      id
      status
      quantity
      product {
        id
        name
        price
      }
      table {
        id
        number
      }
      createdAt
    }
  }
`;

// Mutation to update order status
export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: Int!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      status
      quantity
      product {
        id
        name
        price
      }
      table {
        id
        number
      }
      createdAt
    }
  }
`;

// Mutation to delete an order
export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: Int!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;
