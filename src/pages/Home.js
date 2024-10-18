import { Row, Col, Card, Typography, Button, message, Select } from "antd";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import SalesReport from "../components/reports/salesReport";
import StockReport from "../components/reports/stockReport";
import FinancialReport from "../components/reports/financialReport";
import SummaryCards from "../components/reports/summaryCards";
import { GENERATE_FINANCIAL_REPORT, GENERATE_SALES_REPORT, GENERATE_STOCK_REPORT } from "../graphql/reportQueries";
import { GET_PRODUCTS } from "../graphql/productQueries"; // Requête pour récupérer les produits

const { Option } = Select;
const { Title } = Typography;

function Home() {
  // State pour stocker le produit sélectionné
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [stockReportSuccess, setStockReportSuccess] = useState(false); // Pour recharger le rapport après génération
  const [salesReportSuccess, setSalesReportSuccess] = useState(false); // Pour recharger les données de ventes après génération

  // Requête pour récupérer la liste des produits
  const { data: productsData, loading: productsLoading, error: productsError } = useQuery(GET_PRODUCTS);

  // Mutations pour générer les rapports
  const [generateFinancialReport] = useMutation(GENERATE_FINANCIAL_REPORT, {
    onCompleted: () => message.success('Rapport financier généré avec succès'),
    onError: (error) => message.error(`Erreur: ${error.message}`)
  });

  const [generateSalesReport] = useMutation(GENERATE_SALES_REPORT, {
    onCompleted: () => {
      message.success('Rapport des ventes généré avec succès');
      setSalesReportSuccess(true); // Indique que le rapport de vente a été généré avec succès
    },
    onError: (error) => message.error(`Erreur: ${error.message}`)
  });

  const [generateStockReport] = useMutation(GENERATE_STOCK_REPORT, {
    variables: { productId: selectedProductId },
    onCompleted: (data) => {
      console.log('Rapport de stock généré:', data); // Log des données reçues
      message.success('Rapport de stock généré avec succès');
      setStockReportSuccess(true); // Indique que le rapport de stock a été généré avec succès
    },
    onError: (error) => {
      console.error('Erreur lors de la génération du rapport:', error);
      message.error(`Erreur: ${error.message}`);
    }
  });
  
  // Toujours appeler le useEffect, même si le contenu est conditionnel
  useEffect(() => {
    if (stockReportSuccess) {
      console.log("Rapport de stock généré, rechargez les données si nécessaire");
      setStockReportSuccess(false);
    }
  }, [stockReportSuccess]);

  useEffect(() => {
    if (salesReportSuccess) {
      console.log("Rapport des ventes généré, rechargez les données si nécessaire");
      setSalesReportSuccess(false);
    }
  }, [salesReportSuccess]);

  // Vérifier si la liste des produits est en train de charger ou s'il y a une erreur
  if (productsLoading) {
    return <p>Chargement des produits...</p>;
  }

  if (productsError) {
    return <p>Erreur lors de la récupération des produits : {productsError.message}</p>;
  }

  // Vérification si les produits sont présents dans la réponse de l'API
  if (!productsData || !productsData.products || productsData.products.length === 0) {
    return <p>Aucun produit disponible</p>;
  }

  return (
    <div className="layout-content">
      {/* Section des cartes de résumé */}
      <Row gutter={[24, 0]}>
        <Col xs={24}>
          <Title level={3}>Tableau de bord - Résumé des performances</Title>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <SummaryCards />
        </Col>
      </Row>

      {/* Section des boutons pour générer les rapports */}
      <Row gutter={[24, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={24} md={8}>
          <Button type="primary" block onClick={() => generateFinancialReport()}>
            Générer Rapport Financier
          </Button>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Button type="primary" block onClick={() => generateSalesReport()}>
            Générer Rapport des Ventes
          </Button>
        </Col>
        <Col xs={24} sm={24} md={8}>
          {/* Sélecteur pour choisir un produit avant de générer le rapport de stock */}
          <Select
            style={{ width: '100%' }}
            placeholder="Sélectionnez un produit"
            onChange={(value) => setSelectedProductId(value)}
          >
            {productsData.products.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Row gutter={[24, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={24} md={8}>
          <Button
            type="primary"
            block
            onClick={() => {
              if (selectedProductId) {
                generateStockReport();
              } else {
                message.error('Veuillez sélectionner un produit.');
              }
            }}
          >
            Générer Rapport de Stock
          </Button>
        </Col>
      </Row>

      {/* Section des rapports */}
      <Row gutter={[24, 0]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={24} md={12} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <SalesReport />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <StockReport />
          </Card>
        </Col>
        <Col xs={24} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <FinancialReport />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
