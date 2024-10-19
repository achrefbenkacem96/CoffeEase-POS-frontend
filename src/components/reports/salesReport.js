import React from 'react';
import { Bar } from '@ant-design/charts';
import { useQuery } from '@apollo/client';
import { GET_SALES_REPORT } from '../../graphql/reportQueries';
import { GET_PRODUCTS } from '../../graphql/productQueries';

const SalesReport = () => {
  // Fetch sales report
  const { loading: salesLoading, error: salesError, data: salesData } = useQuery(GET_SALES_REPORT);
  
  // Fetch product data
  const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_PRODUCTS);
  console.log("🚀 ~ SalesReport ~ productsData:", productsData)

  // Loading state
  if (salesLoading || productsLoading) return <p>Chargement des rapports de vente...</p>;
  
  // Error handling
  if (salesError || productsError) return <p>Erreur: {salesError?.message || productsError?.message}</p>;

  // Log sales data for debugging
  console.log('Sales Data:', salesData?.getSalesReports);
  
  // Processing data for the chart
  const chartData = salesData?.getSalesReports?.map((report) => {
    const product = productsData?.products?.find(product => product.id === report.productId);
    
    // Log product data for debugging
    console.log('Product Data:', product);
    
    return {
      productName: product ? product.name : `Produit ${report.productId}`,
      value: `${report.quantitySold ?? 0} unités, ${ report.totalRevenue ?? 0} € de revenu`,  // Default to 0 if quantitySold is null
     };
  }) || [];

  // Check if chart data is empty
  if (chartData.length === 0) {
    return <p>Aucun rapport de vente disponible pour l'instant.</p>;
  }
  console.log("🚀 ~ SalesReport ~ chartData:", chartData)

  // Configuration for the chart
  const config = {
    data: chartData,
    xField: 'productName',         // Name of the product on the X-axis
    yField: 'value',        // Quantities sold on the Y-axis
    colorField: 'productName',
 
    interaction: {
      elementSelect: true,
    },
    // axis: {
    //   y: {
    //     labelFormatter: '0',
    //   },
    // },

     
  };

  return (
    <div>
      <h3>Rapport des Ventes</h3>
      <Bar {...config} />
    </div>
  );
};

export default SalesReport;
