import { gql } from '@apollo/client';

// Query pour le Sales Report
export const GET_SALES_REPORT = gql`
  query {
    getSalesReports {
      productId
      quantitySold
      totalRevenue
      createdAt
    }
  }
`;

export const GET_STOCK_REPORT = gql`
  query GetStockReport {
    getStockReports {
      product {
        id
        name  
      }
      stockBefore
      stockAfter
      movement
      createdAt
    }
  }
`;

// Query pour le Financial Report
export const GET_FINANCIAL_REPORT = gql`
  query GetFinancialReport {
    getFinancialReports {
      totalRevenue
      totalExpenses
      profitOrLoss
      createdAt
    }
  }
`;


// Mutation pour générer le rapport financier
export const GENERATE_FINANCIAL_REPORT = gql`
  mutation GenerateFinancialReport {
    generateFinancialReport {
      id
      totalRevenue
      totalExpenses
      profitOrLoss
      createdAt
    }
  }
`;

// Mutation pour générer le rapport des ventes
export const GENERATE_SALES_REPORT = gql`
  mutation GenerateSalesReport {
    generateSalesReport {
      productId
      quantitySold
      totalRevenue
      createdAt
    }
  }
`;

export const GENERATE_STOCK_REPORT = gql`
  mutation GenerateStockReport($productId: Float!) {
    generateStockReport(productId: $productId) {
      id
      stockBefore
      stockAfter
      movement
      createdAt
      product {
        name
      }
    }
  }
`;

// Requête pour récupérer la liste des produits
export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
    }
  }
`;