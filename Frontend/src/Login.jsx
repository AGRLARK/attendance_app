import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from 'react-bootstrap';

const Login = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Redirect to admin page
        if (inputUsername === "admin" && inputPassword === "admin") {
            navigate("/admin");
            return;
        }

        const response = await fetch('http://localhost:4000/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: inputUsername,
                password: inputPassword
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login Response Data:", data);
            const { username, token, signInRecords, signOutRecords } = data;
            localStorage.setItem('username', username);
            localStorage.setItem('token', token);
            localStorage.setItem('signInRecords', JSON.stringify(signInRecords));
            localStorage.setItem('signOutRecords', JSON.stringify(signOutRecords));
            alert('Login Successfully');
            navigate('/home');
        } else {
            alert('Invalid Credentials');
        }
    }

    return (
        <>
            <div style={{ height: "60vh", marginTop: "20vh" }}>
                <h1 style={{ textAlign: "center", marginTop: "32px" }}>JFORCE SOLUTIONS</h1>
                {/* Form */}
                <Form className=" p-4 " onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="h4 mb-2 text-center">ATTENDANCE APP</div>
                    <div className="h10 mb-2 text-center">LOGIN PAGE</div>

                    <Row className="justify-content-center">
                        <Col sm={3}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={inputUsername}
                                    placeholder="Username"
                                    onChange={(e) => setInputUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col sm={3}>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={inputPassword}
                                    placeholder="Password"
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-center" style={{ marginTop: "10vh" }}>
                        <Col sm={5}>
                            <div className="login-reg-btn">
                                <Button className="w-40" variant="primary" type="submit">
                                    Log In
                                </Button>
                                <NavLink to="/register" className="btn btn-primary w-40">
                                    Register
                                </NavLink>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div >
        </>
    );
};

export default Login;
