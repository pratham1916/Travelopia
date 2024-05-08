import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate(); 

    // Deserialize user data from local storage
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const isAuth = user !== null;  // true if user is logged in
    const isAdmin = isAuth && user.role === 'admin';  // true if user is admin

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
                    <button className="navbar-login-button" onClick={handleLogout}>Logout</button> :
                    <Link to="/login" className="navbar-login-button" onClick={closeMenu}>Login</Link>
                }
            </nav>
            <i className="fa-solid fa-bars navbar-menu-icon" onClick={toggleMenu}></i>
        </header>
    );
};

export default Navbar;
