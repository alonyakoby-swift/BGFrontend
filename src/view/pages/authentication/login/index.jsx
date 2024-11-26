// Login.js
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Checkbox, message } from 'antd';
import LeftContent from '../leftContent';
import Footer from '../footer';
import { useAuth } from '../../../../network/authContext';

/**
 * Login component for user authentication.
 * @returns {JSX.Element} - The Login component.
 */
const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      history.push('/dashboard');
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
                Welcome, login with your Administrator assigned password.
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
                    rules={[{ required: true, message: 'Please enter your Email Address.' }]}
                    className="hp-mb-16"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                    label="Password :"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your Password.' }]}
                    className="hp-mb-8"
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item className="hp-mt-16 hp-mb-8">
                  <Button block type="primary" htmlType="submit" loading={loading}>
                    Log In
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
