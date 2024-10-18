import React from 'react';
import { Bar } from '@ant-design/charts';
import { useQuery } from '@apollo/client';
import { GET_SALES_REPORT } from '../../graphql/reportQueries';
import { GET_PRODUCTS } from '../../graphql/productQueries';

const SalesReport = () => {
  // Récupération des rapports de vente
  const { loading: salesLoading, error: salesError, data: salesData } = useQuery(GET_SALES_REPORT);
  
  // Récupération des données des produits
  const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_PRODUCTS);

  if (salesLoading || productsLoading) return <p>Chargement des rapports de vente...</p>;
  if (salesError || productsError) return <p>Erreur: {salesError?.message || productsError?.message}</p>;

  // Traitement des données pour le graphique
  const chartData = salesData?.getSalesReports?.map((report) => {
    const product = productsData?.products?.find(product => product.id === report.productId);
    return {
      productName: product ? product.name : `Produit ${report.productId}`,
      quantitySold: report.quantitySold,
      totalRevenue: report.totalRevenue,
    };
  }) || [];

  if (chartData.length === 0) {
    return <p>Aucun rapport de vente disponible pour l'instant.</p>;
  }

  // Configuration du graphique
  const config = {
    data: chartData,
    xField: 'productName',
    yField: 'quantitySold',
    seriesField: 'productName',
    legend: { position: 'top-left' },
    barWidthRatio: 0.5, // Réduction de la largeur de la barre pour plus de visibilité
    colorField: 'productName',
    xAxis: {
      label: {
        autoRotate: true, // Rotation des labels pour une meilleure lisibilité
      },
    },
    yAxis: {
      title: {
        text: 'Quantité Vendue', // Ajout d'un titre pour l'axe des Y
      },
    },
    tooltip: {
      fields: ['productName', 'quantitySold', 'totalRevenue'],
      formatter: (datum) => ({
        name: datum.productName,
        value: `${datum.quantitySold} unités, ${datum.totalRevenue} € de revenu`,
      }),
    },
  };

  return (
    <div>
      <h3>Rapport des Ventes</h3>
      <Bar {...config} />
    </div>
  );
};

export default SalesReport;
