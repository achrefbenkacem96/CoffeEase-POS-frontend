import React from 'react';
import { Table, Typography } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_FINANCIAL_REPORT } from '../../graphql/reportQueries';
import moment from 'moment';

const { Title } = Typography;

const FinancialReport = () => {
  const { loading, error, data } = useQuery(GET_FINANCIAL_REPORT);

  if (loading) return <p>Chargement des données financières...</p>;
  if (error) return <p>Erreur lors de la récupération des données financières: {error.message}</p>;

  const columns = [
    { title: 'Total Revenue', dataIndex: 'totalRevenue', key: 'totalRevenue' },
    { title: 'Total Expenses', dataIndex: 'totalExpenses', key: 'totalExpenses' },
    { title: 'Profit or Loss', dataIndex: 'profitOrLoss', key: 'profitOrLoss' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: date => moment(date).format('MM/DD/YYYY') },
  ];

  return (
    <div>
      <Title level={3}>Rapport Financier</Title> {/* Titre ajouté */}
      
      <Table
        columns={columns}
        dataSource={data?.getFinancialReports || []}
        rowKey="createdAt"
      />
    </div>
  );
};

export default FinancialReport;
