import { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:4000/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand style={{ paddingLeft: "10px" }}>ATTENDANCE APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title="Admin" id="basic-nav-dropdown" style={{ paddingRight: "10px" }}>
                            <NavDropdown.Item className='myprofile' style={{ backgroundColor: "green", color: "white" }} >My Profile</NavDropdown.Item>
                            <NavDropdown.Item className='log-out' onClick={handleLogout} style={{ backgroundColor: "red", color: "white" }} >Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container" id="container-admin" style={{ marginTop: "10vh" }}>
                {/* <Button className="admin-btn" onClick={handleLogout}>Log Out </Button> */}
                <h1>Admin Page</h1>
                <h4>Usernames:</h4>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {users.map((user, index) => (
                        <Link key={index} to={`/report/${user.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="admin-section" >{user.username}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Admin;
