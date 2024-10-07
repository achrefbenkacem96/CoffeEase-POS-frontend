import { gql } from '@apollo/client';

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

export const CREATE_TABLE = gql`
  mutation CreateTable($number: Float!, $status: String!) {
    createTable(number: $number, status: $status) {
      id
      number
      status
      createdAt
    }
  }
`;

export const DELETE_TABLE = gql`
  mutation DeleteTable($id: Int!) {
    deleteTable(id: $id) {
      id
    }
  }
`;

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
