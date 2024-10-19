import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Select, DatePicker, Button, Typography } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_STOCK_REPORT } from '../../graphql/reportQueries';
import { GET_PRODUCTS } from '../../graphql/productQueries';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const StockReport = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [dateRange, setDateRange] = useState(null);

  const { loading, error, data } = useQuery(GET_STOCK_REPORT);
  const { data: productsData, loading: productsLoading, error: productsError } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    if (data && data.getStockReports) {
      applyFilters();
    }
  }, [data, selectedProduct, dateRange]);

  const applyFilters = () => {
    let reports = data.getStockReports || [];

    // Filtrer par produit
    if (selectedProduct !== 'all') {
      reports = reports.filter(report => report.product && report.product.id === parseInt(selectedProduct));
    }

    // Filtrer par plage de dates
    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      console.log("🚀 ~ applyFilters ~ dateRange:", dateRange)
      console.log("🚀 ~ applyFilters ~ endDate:", endDate)
      console.log("🚀 ~ applyFilters ~ startDate:", startDate)
      reports = reports.filter(report => moment(report.createdAt).isBetween(startDate, endDate, null, '[]'));
    }

    setFilteredData(reports);
  };

  const handleProductChange = (value) => {
    setSelectedProduct(value);
  };

  const handleDateChange = (dates, dateString) => {
 
    setDateRange(dateString);
  };

  if (loading || productsLoading) return <p>Chargement des données...</p>;
  if (error || productsError) return <p>Erreur lors de la récupération des données</p>;

  const columns = [
    { title: 'Produit', dataIndex: ['product', 'name'], key: 'name' },
    { title: 'Stock Avant', dataIndex: 'stockBefore', key: 'stockBefore' },
    { title: 'Stock Après', dataIndex: 'stockAfter', key: 'stockAfter' },
    { title: 'Mouvement', dataIndex: 'movement', key: 'movement' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: date => moment(date).format('MM/DD/YYYY') },
  ];

  return (
    <div>
      <Title level={3}>Rapport de Stock</Title> {/* Ajout du titre ici */}
      
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={8}>
          <Select style={{ width: '100%' }} placeholder="Sélectionnez un produit" onChange={handleProductChange}>
            <Option value="all">Tous les produits</Option>
            {productsData?.products.map(product => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <RangePicker onChange={handleDateChange} format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Button type="primary" block onClick={applyFilters}>
            Filtrer les rapports
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={filteredData} rowKey="id" />
    </div>
  );
};

export default StockReport;
