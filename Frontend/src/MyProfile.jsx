import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MyProfile = () => {
    // Assuming you have retrieved username, email, and phone from local storage
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/home');
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand style={{ paddingLeft: "10px" }}>My Pofile Page</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title={username} id="basic-nav-dropdown" style={{ paddingRight: "10px" }}>
                            <NavDropdown.Item className='log-out' onClick={handleLogout} style={{ backgroundColor: "red", color: "white" }} >Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container className='myprofile-header'>
                <Row>
                    <Col>
                        <div>
                            <h4><strong>Username:</strong> {username}</h4>
                            <h4><strong>Email:</strong> {email}</h4>
                            <h4><strong>Phone Number:</strong> {phone}</h4>
                            <Button className="mt-4" onClick={navigateToHome}>Back</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MyProfile;
