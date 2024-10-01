import React, { useState } from "react";
import { Layout, Button, Typography, Card, Form, Input, Checkbox, message } from "antd";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

// Mutation GraphQL pour enregistrer un utilisateur
const SIGNUP_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $role: String!) {
    register(email: $email, password: $password, role: $role) {
      id
      email
      role
    }
  }
`;

export default function SignUp() {
  const [register, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    register({
      variables: {
        email: values.email,
        password: values.password,
        role: 'Serveur' // Par défaut, tu peux changer le rôle si nécessaire
      },
    }).then(() => {
      message.success('Inscription réussie, vous pouvez maintenant vous connecter.');
      form.resetFields(); // Réinitialiser le formulaire après succès
    }).catch((err) => {
      console.error(err);
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
              <Title className="site-layout-background text-shadow">Sign Up</Title>
              <p className="text-lg">
                Use these awesome forms to create a new account in your project for free.
              </p>
            </div>
          </div>

          <Card className="card-signup header-solid h-full ant-card pt-0" title={<h5>Register With</h5>} bordered="false">
            <Form
              form={form}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className="row-col"
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  I agree to the{" "}
                  <a href="#pablo" className="font-bold text-dark">Terms and Conditions</a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button style={{ width: "100%" }} type="primary" htmlType="submit" loading={loading}>
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            <p className="font-semibold text-muted text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Sign In
              </Link>
            </p>
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
