import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "../styles/Navbar.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const isAuth = user !== null;
    const isAdmin = isAuth && user.role === 'admin';

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleScroll = () => {
        setIsScrolled(window.pageYOffset > 0);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        closeMenu();
        navigate("/");
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar-header ${isMenuOpen ? "navbar-open" : ""} ${isScrolled ? "navbar-sticky" : ""}`} id='nav-menu'>
            <Link to="/" className="navbar-logo" onClick={closeMenu}>Travelopia<span>...</span></Link>
            <nav className={`navbar ${isMenuOpen ? "navbar-expanded" : ""}`}>
                <Link to="/" className="navbar-link" onClick={closeMenu}>Home</Link>
                {isAdmin && <Link to="/enquiries" className="navbar-link" onClick={closeMenu}>View Enquiries</Link>}
                {isAuth ?
                    <>
                        
                        <button className="navbar-login-button" onClick={handleLogout}>Logout</button>
                        <UserOutlined className="profile-icon" onClick={showModal} style={{ fontSize: '18px', cursor: 'pointer', marginRight: '10px',backgroundColor:"white", padding:"8px 8px",borderRadius:"50%" }} />
                        <Modal title="Profile" open={isModalVisible} onCancel={handleCancel} footer={null}>
                            <p><strong>Name:</strong> {user.fullname}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </Modal>
                    </> :
                    <Link to="/login" className="navbar-login-button" onClick={closeMenu}>Login</Link>
                }
            </nav>
            <i className="fa-solid fa-bars navbar-menu-icon" onClick={toggleMenu}></i>
        </header>
    );
};

export default Navbar;
