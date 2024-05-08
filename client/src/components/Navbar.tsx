import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => {
        setIsMenuOpen(false);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        setIsScrolled(window.pageYOffset > 0);
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
                <div className="navbar-profile-section">
                    <Link to="/login" className="navbar-login-button" onClick={closeMenu}>Login</Link>
                </div>
            </nav>
            <div className="navbar-profile">
                <Link to="/login" className="navbar-login-button" onClick={closeMenu}>Login</Link>
            </div>
            <i className="fa-solid fa-bars navbar-menu-icon" onClick={toggleMenu}></i>
        </header>
    );
};

export default Navbar;
