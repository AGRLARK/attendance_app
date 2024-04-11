// import { Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Home = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showExit, setShowExit] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    setInterval(() => {
        setCurrentTime(new Date());
    }, 1000)

    // Handle view report
    const handleViewReport = () => {
        navigate("/report");
    };

    const presentSuccess = async () => {
        // Call the backend route to record sign-in time
        await fetch('http://localhost:4000/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username
            }),
        });
        setShowExit(true);
        localStorage.setItem('showExit', true);
        setMessage("Signed in successfully.");
    }

    const exit = async () => {
        await fetch('http://localhost:4000/signout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username
            }),
        });
        setShowExit(false);
        localStorage.removeItem('showExit');
        setMessage("Sign Out Successfully.");
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (!storedUsername) { //if not login redirect to login page
            navigate('/');
        } else {
            setUsername(storedUsername);
            const storedShowExit = localStorage.getItem('showExit');
            setShowExit(storedShowExit === 'true');
        }
    }, [navigate]);

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand style={{ paddingLeft: "10px" }}>ATTENDANCE APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title={username} id="basic-nav-dropdown" style={{ paddingRight: "10px" }}>
                            {showExit ? (
                                <NavDropdown.Item variant="danger" onClick={exit}>Sign Out</NavDropdown.Item>
                            ) : (
                                <NavDropdown.Item className="w-40" variant="primary" type="submit" onClick={presentSuccess}>
                                    Sign In
                                </NavDropdown.Item>
                            )}
                            <NavDropdown.Item className='log-out' onClick={handleLogout} style={{ backgroundColor: "red", color: "white" }} >Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container-home Time text-center">
                {/* <button onClick={handleLogout}>Log Out </button> */}
                {message && <div style={{ color: "red" }}>{message}</div>}
                <h1 style={{ marginTop: "32px" }}>JFORCE SOLUTIONS</h1><br /><br />
                <h2>User: {username}</h2>
                <h4>
                    Today&apos;s Date: {currentTime.toLocaleDateString()}
                    <br /><br />
                    Current Time: {currentTime.toLocaleTimeString()}
                </h4>
                <div>
                </div>
                <>
                    <>
                        {/* <div className="form-grp">
                            <div className="login-reg-btn">
                                {showExit ? (
                                    <Button className="w-40" variant="danger" type="submit" onClick={exit}>
                                        Sign Out
                                    </Button>
                                ) : (
                                    <div className="login-reg-btn">
                                        <Button className="w-40" variant="primary" type="submit" onClick={presentSuccess}>
                                            Sign In
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div> */}
                    </>
                </>
                <div className="h5 mt-3 text-center">
                    <NavLink to={`/report/${username}`} className="btn btn-primary w-40" onSubmit={handleViewReport}>
                        View Report
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Home