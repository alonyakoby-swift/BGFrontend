import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Form, Input, Button, Checkbox, message } from "antd";
import LeftContent from "../leftContent";
import Footer from "../footer";
import { useAuth } from "../../../../network/authContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, authLoading, history]);

  const handleLogin = async (values) => {
    setLoading(true);
    const { username, password } = values;

    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      message.success('Login successful');
      history.push('/dashboard');
    } else {
      message.error(result.message);
    }
  };

  return (
      <Row gutter={[32, 0]} className="hp-authentication-page">
        <LeftContent />
        <Col lg={12} span={24} className="hp-py-sm-0 hp-py-md-64">
          <Row className="hp-h-100" align="middle" justify="center">
            <Col
                xxl={11}
                xl={15}
                lg={20}
                md={20}
                sm={24}
                className="hp-px-sm-8 hp-pt-24 hp-pb-48"
            >
              <h1 className="hp-mb-sm-0">Login</h1>
              <p className="hp-mt-sm-0 hp-mt-8 hp-text-color-black-60">
                Willkommen zurück, bitte melden Sie sich bei Ihrem Konto an.
              </p>

              <Form
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={handleLogin}
                  className="hp-mt-sm-16 hp-mt-32"
              >
                <Form.Item
                    label="Username :"
                    name="username"
                    rules={[{ required: true, message: 'Bitte geben Sie Ihre Email ein' }]}
                    className="hp-mb-16"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                    label="Password :"
                    name="password"
                    rules={[{ required: true, message: 'Bitte geben Sie Ihre Passwort ein' }]}
                    className="hp-mb-8"
                >
                  <Input.Password />
                </Form.Item>

                <Row align="middle" justify="space-between">
                  <Form.Item name="remember" valuePropName="checked" className="hp-mb-0">
                    <Checkbox>Eingeloggt bleiben</Checkbox>
                  </Form.Item>

                  <Link
                      className="hp-button hp-text-color-black-80 hp-text-color-dark-40"
                      to="/pages/authentication/recover-password"
                  >
                    Passwort Vergessen?
                  </Link>
                </Row>

                <Form.Item className="hp-mt-16 hp-mb-8">
                  <Button block type="primary" htmlType="submit" loading={loading}>
                    Eingloggen
                  </Button>
                </Form.Item>
              </Form>
              <Footer />
            </Col>
          </Row>
        </Col>
      </Row>
  );
};

export default Login;
