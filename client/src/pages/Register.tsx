import { Button, Form, Input, notification } from 'antd';
import registerImage from "../images/register.jpg";
import "../styles/login-register.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

interface RegisterFormValues {
  fullname: string;
  email: string;
  phone_number: string;
  password: string;
}

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const response = await axios.post('https://travelopia-1sw7.onrender.com/register', {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        phone_number: values.phone_number,
      });
      if (response.status === 201) {
        notification.success({
          message: 'Registration Successful',
          description: 'You have successfully registered!',
        });
        navigate('/login');
      }
    } catch (error: any) {
      notification.error({
        message: 'Registration Failed',
        description: error.response?.data?.message || 'An error occurred during registration.'
      });
    }
    setLoading(false);
  };

  return (
    <div className='container'>
      <div className="left-container">
        <img src={registerImage} alt="registration image" />
      </div>
      <div className="right-container">
        <h3 className="title">Join Global Adventures: Discover Your Next Destination</h3>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name='fullname'
            rules={[{ required: true, message: 'Please enter your full name!' }]}
          >
            <Input className="input" placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name='email'
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input className="input" placeholder='Email Address' />
          </Form.Item>

          <Form.Item
            name='phone_number'
            rules={[{ required: true, message: 'Please enter your phone number!', len: 10 }]}
          >
            <Input className="input" placeholder='Phone Number' maxLength={10} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please create a password!' }]}
          >
            <Input.Password className="input" placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Button className="form-button" loading={loading} htmlType="submit">
              Register
            </Button>
          </Form.Item>

          <p className="signup-already-account">Already have an account ? </p>

          <Link to="/login" className='login-form-btn'> Log In</Link>
          
        </Form>
      </div>
    </div>
  );
}

export default Register;
