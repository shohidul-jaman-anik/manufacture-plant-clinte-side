import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken')
    };
    const menuItems = <>
        <li className='ml-24'><Link to="/" >Home</Link></li>
        <li><Link to="/" >Appointment</Link></li>
        <li><Link to="/" >Review</Link></li>
        <li><Link to="/whyUs" >About Us</Link></li>

        <li>{user ?
            <button onClick={logout} className="btn btn-ghost">Log Out</button>
            : <Link to="/login" >Login</Link>}
        </li>
    </>
    return (
        <Navbar className='navStyle' collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'  >
            <Container>
                <Navbar.Brand as={Link} to='/' href="#home">
                    <img className='header-logo' src="" alt="" />  <span className='header-title'>Manufacture Plant</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ">
                        <Nav.Link as={Link} to='/' href="" className='' >Schedule</Nav.Link>
                        <Nav.Link href="/review">Review</Nav.Link>
                        <Nav.Link as={Link} to='/blog' >Blog</Nav.Link>
                        <Nav.Link as={Link} to='/' >Contact</Nav.Link>
                        <Nav.Link as={Link} to='/' >Particle</Nav.Link>
                        <NavDropdown title="About Us"  id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to='/whyUs'>Why Choose Us</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>

                        {user ? (
                            <button
                                className="btn btn-link text-white text-decoration-none"
                                onClick={logout}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Nav.Link as={Link} to="/signUp">
                                Sign In
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;