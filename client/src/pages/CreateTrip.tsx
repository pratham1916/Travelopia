import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, DatePicker, notification } from 'antd';
import '../styles/CreateTrip.css';
import moment from 'moment';

interface FormValues {
    fullName: string;
    email: string;
    phone_number: string;
    destination: string;
    interest: string;
    duration: string;
    travelDate: moment.Moment;
    numberOfTravelers: string;
    comment?: string;
}

const { Option } = Select;

const CreateTrip: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: FormValues) => {
        const token = localStorage.getItem('token');
        const formattedValues = {
            ...values,
            travelDate: values.travelDate.format('YYYY-MM-DD'),
        };

        try {
            setLoading(true);
            const response = await axios.post('https://travelopia-1sw7.onrender.com/enquiry', formattedValues, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            notification.success({
                message: 'Success',
                description: response.data.message,
            });
            form.resetFields();
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.response?.data.message || 'Failed to submit enquiry.',
            });
        }
        setLoading(false);
    };

    return (
        <section className="create-trip-section">
            <div className="create-trip-container">
                <h1 className="form-title">Create Your Trip</h1>
                <p className="form-description">
                    Submit your trip enquiry below, and we'll quickly coordinate your journey details.
                </p>
                <Form form={form} onFinish={handleSubmit}>
                    <div className="input-row">
                        <Form.Item name="fullName" rules={[{ required: true, message: 'Please input your full name!' }]}>
                            <Input placeholder="Full Name" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your E-mail!' }]}>
                            <Input type="email" placeholder="Email Address" />
                        </Form.Item>
                    </div>
                    <div className="input-row">
                        <Form.Item name="phone_number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                            <Input placeholder="Phone Number (10 digits)" />
                        </Form.Item>
                        <Form.Item name="destination" rules={[{ required: true, message: 'Please select your destination!' }]}>
                            <Select placeholder="Select a Destination">
                                <Option value="">Select a Destination</Option>
                                <Option value="Paris">Paris</Option>
                                <Option value="New York">New York</Option>
                                <Option value="Tokyo">Tokyo</Option>
                                <Option value="London">London</Option>
                                <Option value="Bangkok">Bangkok</Option>
                                <Option value="Sydney">Sydney</Option>
                                <Option value="Cape Town">Cape Town</Option>
                                <Option value="Rome">Rome</Option>
                                <Option value="Mount Fuji">Mount Fuji</Option>
                                <Option value="Japan">Japan</Option>
                                <Option value="North India">North India</Option>
                                <Option value="Bali">Bali</Option>
                                <Option value="South India">South India</Option>
                                <Option value="New York">New York</Option>
                                <Option value="France">France</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="input-row">
                        <Form.Item name="interest" rules={[{ required: true, message: 'Please select your interest!' }]}>
                            <Select placeholder="Select an Interest">
                            <Option value="">Select an Interest</Option>
                                <Option value="Advanture and Outdoor">Advanture and Outdoor</Option>
                                <Option value="Beaches">Beaches</Option>
                                <Option value="Heritage and Culture">Heritage and Culture</Option>
                                <Option value="Nature and Landscape">Nature and Landscape</Option>
                                <Option value="Wildlife and Safaris">Wildlife and Safaris</Option>
                                <Option value="Wine and Food">Wine and Food</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="duration" rules={[{ required: true, message: 'Please select duration!' }]}>
                            <Select placeholder="Select Duration (days)">
                            <Option value="">Select Duration (days)</Option>
                                <Option value="3">3 Days</Option>
                                <Option value="5">5 Days</Option>
                                <Option value="7">7 Days</Option>
                                <Option value="10">10 Days</Option>
                                <Option value="14">14 Days</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="input-row">
                        <Form.Item  name="travelDate" rules={[{ required: true, message: 'Please choose the travel date!' }]}>
                            <DatePicker style={{width:"100%"}} format="YYYY-MM-DD" />
                        </Form.Item>
                        <Form.Item name="numberOfTravelers" rules={[{ required: true, message: 'Please select the number of travelers!' }]}>
                            <Select placeholder="Number of Travelers">
                                <Option value="">Number of Travelers</Option>
                                <Option value="1">1 Traveler</Option>
                                <Option value="2">2 Travelers</Option>
                                <Option value="3">3 Travelers</Option>
                                <Option value="4">4 Travelers</Option>
                                <Option value="5">5 Travelers</Option>
                                <Option value="6">6 Travelers</Option>
                                <Option value="7+">7+ Travelers</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item name="comment">
                        <Input.TextArea rows={4} placeholder="Additional Comments" />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} htmlType="submit" className="submit-btn">
                            Submit Enquiry
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
};

export default CreateTrip;
