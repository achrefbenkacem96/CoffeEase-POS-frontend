import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useLocation, useHistory } from "react-router-dom";
import { Layout, Button, Typography, Card, Form, Input } from "antd";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

// Mutation GraphQL pour réinitialiser le mot de passe
const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export default function NewPassword() {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD_MUTATION);

  // Récupérer le token depuis l'URL
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const onFinish = (values) => {
    resetPassword({
      variables: {
        token: token, // Utiliser le token récupéré depuis l'URL
        newPassword: values.password,
      },
    }).then(() => {
      history.push("/sign-in"); // Rediriger vers la page de connexion après succès
    });
  };

  return (
    <div className="layout-default ant-layout layout-sign-up">
      <Header>
        <div className="header-col header-brand">
          <h5>Muse Dashboard</h5>
        </div>
      </Header>

      <Content className="p-0">
        <div className="sign-up-header">
          <div className="content">
            <Title className="site-layout-background text-shadow">New password</Title>
            <p className="text-lg">Enter your new password below.</p>
          </div>
        </div>

        <Card className="card-signup header-solid h-full ant-card pt-0" title={<h5>New password</h5>} bordered="false">
          <Form form={form} onFinish={onFinish} className="row-col">
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your new password!" }]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>

            <Form.Item>
              <Button style={{ width: "100%" }} type="primary" htmlType="submit" loading={loading}>
                RESET PASSWORD
              </Button>
            </Form.Item>
          </Form>
          {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </Card>
      </Content>

      <Footer>
        <p className="copyright">
          Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.
        </p>
      </Footer>
    </div>
  );
}
