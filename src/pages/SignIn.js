import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  message, // Importer le message d'Ant Design pour afficher les notifications
} from "antd";
import { useMutation, gql } from "@apollo/client";
import signinbg from "../assets/images/img-signin2.jpg";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

// Mutation GraphQL pour l'authentification
const SIGNIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`;

export default function SignIn() {
  const [login, { data, loading, error }] = useMutation(SIGNIN_MUTATION);
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    login({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then((result) => {
        if (result.data?.login?.access_token) {
          localStorage.setItem("token", result.data.login.access_token);
          message.success("Login successful! Redirecting to the dashboard..."); // Message de succès
          history.push("/dashboard"); // Redirection vers le tableau de bord
        }
      })
      .catch((err) => {
        message.error("Login failed. Please check your credentials."); // Message d'erreur en cas d'échec
      });
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>Muse Dashboard</h5>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 12 }}>
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Switch defaultChecked /> Remember me
                </Form.Item>
                <p className="font-semibold text-muted">
                  <Link to="/reset_password" className="text-dark font-bold">
                    Forgot password?
                  </Link>
                </p>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    loading={loading}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
              </Form>
              {error && <p style={{ color: "red" }}>{error.message}</p>}
              <p className="font-semibold text-muted">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-dark font-bold">
                  Sign Up
                </Link>
              </p>
            </Col>
            <Col className="sign-img" style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          <p className="copyright">
            Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.
          </p>
        </Footer>
      </Layout>
    </>
  );
}
