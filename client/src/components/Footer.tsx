import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3><span>Travelopia</span></h3>
          <p>Explore the world with Travelopia.. From serene mountains to bustling cities, we're your go-to guide for unforgettable journeys.</p>
          <div className="socials">
            <Link to="#"><i className="fab fa-facebook"></i></Link>
            <Link to="#"><i className="fab fa-instagram"></i></Link>
            <Link to="#"><i className="fab fa-twitter"></i></Link>
            <Link to="#"><i className="fab fa-youtube"></i></Link>
          </div>
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="#">Home</Link></li>
            <li><Link to="#">Destinations</Link></li>
            <li><Link to="#">Services</Link></li>
            <li><Link to="#">FAQs</Link></li>
            <li><Link to="#">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-section contact-form">
          <h4>Contact Us</h4>
          <form>
            <input type="email" name="email" placeholder="Your email address" required />
            <textarea name="message" placeholder="Your message" required></textarea>
            <button className='btn' type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Travelopia | Designed by <span>Pratham Nemade</span></p>
      </div>
    </footer>
  );
};

export default Footer;
