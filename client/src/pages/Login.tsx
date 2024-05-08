import React, { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import loginImage from "../images/login.jpg";
import "../styles/login-register.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await axios.post('https://travelopia-1sw7.onrender.com/login', {
        email: values.email,
        password: values.password
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        notification.success({
          message: 'Login Successful',
          description: 'You have successfully logged in!'
        });
        navigate('/');
      }
    } catch (error: any) {
      notification.error({
        message: 'Login Failed',
        description: error.response.data.message || 'An error occurred during login.'
      });
    }
    setLoading(false);
  };

  return (
    <div className='container'>
      <div className="left-container">
        <img src={loginImage} alt="login-img" />
      </div>
      <div className="right-container">
        <h1 className="title">Welcome to Global Adventures: Your Gateway to the World</h1>
        <p className="description">
          Sign in with your Email ID and password to access exclusive travel deals, book your trips, and explore new destinations. Your next adventure starts here.
        </p>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your Email ID!' }]}
          >
            <Input className="input" placeholder="Enter your Email ID" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password className="input" placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button className="form-button" loading={loading} htmlType="submit"> Login </Button>
          </Form.Item>

          <p className="signup-already-account">Don't have an account?</p>

          <Link className='login-form-btn' to="/register">Register now</Link>
          
        </Form>
      </div>
    </div>
  );
}

export default Login;
