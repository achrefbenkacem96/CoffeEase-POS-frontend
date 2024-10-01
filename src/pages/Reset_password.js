import React, { useState } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
} from "antd";
import { useMutation, gql } from "@apollo/client";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

// Mutation GraphQL pour demander la réinitialisation du mot de passe
const REQUEST_RESET_MUTATION = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export default function ResetPassword() {
  const [requestReset, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION);
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false); // Nouveau state pour gérer l'état de soumission

  const onFinish = (values) => {
    requestReset({
      variables: { email: values.email },
    }).then((result) => {
      if (result.data?.requestPasswordReset) {
        setIsSubmitted(true); // Afficher un message de succès après une soumission réussie
      }
    });
  };

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-brand">
            <h5>Muse Dashboard</h5>
          </div>
        </Header>

        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title className="site-layout-background text-shadow">Reset password</Title>
              <p className="text-lg">
                Enter your email to receive a password reset link.
              </p>
            </div>
          </div>

          <Card className="card-signup header-solid h-full ant-card pt-0" title={<h5>Reset password</h5>} bordered="false">
            {!isSubmitted ? (
              <Form form={form} onFinish={onFinish} className="row-col">
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item>
                  <Button style={{ width: "100%" }} type="primary" htmlType="submit" loading={loading}>
                    RESET
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <p style={{ color: 'green' }}>A reset link has been sent to your email.</p>
            )}
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
          </Card>
        </Content>
        <Footer>
          <p className="copyright">
            Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.
          </p>
        </Footer>
      </div>
    </>
  );
}
