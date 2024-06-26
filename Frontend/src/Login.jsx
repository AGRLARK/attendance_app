import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from 'react-bootstrap';

const Login = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [message, setMessage] = useState(" ");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Redirect to admin page
        if (inputUsername === "admin" && inputPassword === "admin") {
            localStorage.setItem('isAdmin', true);
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
            const { username, token, email, phone } = data;
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('phone', phone);
            localStorage.setItem('token', token);
            setMessage('Login Successfully');
            navigate('/home');
        } else {
            setMessage('Invalid Credentials');
        }
    }

    return (
        <>
            <div className="login-section">
                <div className="container1">
                    {message && <div style={{ color: "red", textAlign: "center" }}> {message}</div >}
                    <h1 style={{ textAlign: "center", marginTop: "32px" }}>LOGIN PAGE</h1>
                    {/* Form */}
                    <Form className="custome-form " onSubmit={handleSubmit}>
                        <div className="custome-input-box">
                            <Row className="justify-content-center">
                                <Col className="custome-col">
                                    <Form.Group className="custome-form-g" controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            className="form-control-input"
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
                                <Col sm={4} className="custome-col">
                                    <Form.Group className="custome-form-g" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            className="form-control-input"
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
                        </div>

                        <Row className="justify-content-center" style={{}}>
                            <Col sm={5}>
                                <div className="login-reg-btn">
                                    <Button className="w-40 custome-btn" variant="primary" type="submit">
                                        Log In
                                    </Button>{" "}
                                    <NavLink to="/register" className="btn btn-primary w-40">
                                        Register
                                    </NavLink>
                                </div>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </div>
        </>
    );
};

export default Login;
