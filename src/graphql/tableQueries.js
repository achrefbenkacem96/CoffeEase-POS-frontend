import { gql } from '@apollo/client';

// Query to get all tables
export const GET_TABLES = gql`
  query GetTables {
    tables {
      id
      number
      status
      createdAt
    }
  }
`;

// Mutation to create a table
export const CREATE_TABLE = gql`
  mutation CreateTable($number: Int!, $status: String!) {
    createTable(number: $number, status: $status) {
      id
      number
      status
      createdAt
    }
  }
`;

// Mutation to update table status
export const UPDATE_TABLE_STATUS = gql`
  mutation UpdateTableStatus($id: Int!, $status: String!) {
    updateTableStatus(id: $id, status: $status) {
      id
      number
      status
      createdAt
    }
  }
`;

// Mutation to delete a table
export const DELETE_TABLE = gql`
  mutation DeleteTable($id: Int!) {
    deleteTable(id: $id) {
      id
    }
  }
`;
