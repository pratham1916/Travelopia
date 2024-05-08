import React, { useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import '../styles/CreateTrip.css';

interface FormValues {
    fullName: string;
    email: string;
    phone_number: string;
    destination: string;
    interest: string;
    duration: string;
    travelDate: string;
    numberOfTravelers: string;
    comment?: string;
}

const CreateTrip = () => {
    const [formData, setFormData] = useState<FormValues>({
        fullName: '',
        email: '',
        phone_number: '',
        destination: '',
        interest: '',
        duration: '',
        travelDate: '',
        numberOfTravelers: '',
        comment: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('https://travelopia-1sw7.onrender.com/enquiry', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            notification.success({
                message: 'Success',
                description: response.data.message
            });
        } catch (error: any) {
            console.log(error);

            notification.error({
                message: 'Error',
                description: error.response?.data.message || 'Failed to submit enquiry.'
            });
        }
    };

    return (
        <section className="create-trip-section">
            <div className="create-trip-container">
                <h1 className="form-title">Create Your Trip</h1>
                <p className="form-description">
                    Fill out the form below to send us your trip enquiry. A representative will get back to you as soon as possible to confirm the details and organize your amazing journey.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input name="fullName" placeholder="Full Name" required type="text" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <input name="phone_number" placeholder="Phone Number (10 digits)" required type="tel" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <select name="destination" required onChange={handleChange}>
                            <option value="">Select a Destination</option>
                            <option value="paris">Paris</option>
                            <option value="new_york">New York</option>
                            <option value="tokyo">Tokyo</option>
                            <option value="london">London</option>
                            <option value="bangkok">Bangkok</option>
                            <option value="sydney">Sydney</option>
                            <option value="cape_town">Cape Town</option>
                            <option value="rome">Rome</option>
                            <option value="mount_fuji">Mount Fuji</option>
                            <option value="silicon_valley">Silicon Valley</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <select name="interest" required onChange={handleChange}>
                            <option value="">Select an Interest</option>
                            <option value="culture">Culture</option>
                            <option value="food">Food</option>
                            <option value="nature">Nature</option>
                            <option value="adventure">Adventure</option>
                            <option value="forest">Forests</option>
                            <option value="mountains">Mountains</option>
                            <option value="tech">High Tech Cities</option>
                            <option value="beaches">Beaches</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <select name="duration" required onChange={handleChange}>
                            <option value="">Select Duration (days)</option>
                            <option value="3">3 Days</option>
                            <option value="5">5 Days</option>
                            <option value="7">7 Days</option>
                            <option value="10">10 Days</option>
                            <option value="14">14 Days</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <input name="travelDate" type="date" required onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <select name="numberOfTravelers" required onChange={handleChange}>
                            <option value="">Number of Travelers</option>
                            <option value="1">1 Traveler</option>
                            <option value="2">2 Travelers</option>
                            <option value="3">3 Travelers</option>
                            <option value="4">4 Travelers</option>
                            <option value="5">5 Travelers</option>
                            <option value="6">6 Travelers</option>
                            <option value="7+">7+ Travelers</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <textarea name="comment" placeholder="Additional Comments" onChange={handleChange}></textarea>
                    </div>
                    <div className="input-group">
                        <button className='submit-btn btn' type="submit">Submit Enquiry</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default CreateTrip;
