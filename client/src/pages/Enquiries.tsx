import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin, Card, Row, Col, Pagination } from 'antd';
import '../styles/Enquiries.css';

interface Enquiry {
  _id: string;
  comment: string;
  createdAt: string;
  destination: string;
  duration: number;
  email: string;
  fullName: string;
  interest: string;
  numberOfTravelers: number;
  phone_number: string;
  travelDate: string;
  updatedAt: string;
  userId: string;
}
const Enquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [enquiriesPerPage] = useState(8);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get('https://travelopia-1sw7.onrender.com/enquiry', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
        setEnquiries(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = enquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);

  const paginate = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className='enquiries-section'>
      <div className='enquiry-banner'></div>
      {loading ? (
        <Spin size="large" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} />
      ) : (
        <>

          <Row gutter={[16, 16]} className='enquiries-row'>
            {currentEnquiries.map((enquiry) => (
              <Col key={enquiry._id} xs={24} sm={12} lg={6}>
                <Card className='enquiry-card' title={`Trip to ${enquiry.destination}`} extra={<a href={`mailto:${enquiry.email}`}>Email</a>}>
                  <p><strong>Name:</strong> {enquiry.fullName}</p>
                  <p><strong>Interest:</strong> {enquiry.interest}</p>
                  <p><strong>Duration:</strong> {enquiry.duration} days</p>
                  <p><strong>Travelers:</strong> {enquiry.numberOfTravelers}</p>
                  <p><strong>Travel Date:</strong> {new Date(enquiry.travelDate).toLocaleDateString()}</p>
                  <p><strong>Phone:</strong> {enquiry.phone_number}</p>
                  <p><strong>Comments:</strong> {enquiry.comment}</p>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            onChange={paginate}
            total={enquiries.length}
            pageSize={enquiriesPerPage}
            style={{ textAlign: 'center', marginTop: '20px' }}
          />
        </>
      )}
    </section>
  );
}


export default Enquiries;
