import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from 'react-bootstrap';


const Register = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: inputUsername,
                password: inputPassword,
                email: inputEmail,
                phone: inputPhone,
            }),
        });

        if (response.ok) {
            alert("Registered Successfully");
            navigate('/');
        } else {
            alert("Register Failure");
        }

    };


    return (
        <>
            <div style={{ height: "60vh", marginTop: "20vh" }}>
                <h1 style={{ textAlign: "center", marginTop: "32px" }}>JFORCE SOLUTIONS</h1>
                {/* Form */}
                <Form className=" p-4 " onSubmit={handleSubmit} action="">
                    {/* Header */}
                    <div className="h4 mb-2 text-center">ATTENDANCE APP</div>
                    <div className="h10 mb-2 text-center">REGISTER PAGE</div>

                    <Row className="justify-content-center">
                        <Col sm={3}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={inputUsername}
                                placeholder="Enter Username"
                                onChange={(e) => setInputUsername(e.target.value)}
                                required
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col sm={3}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={inputPassword}
                                placeholder="Enter Password"
                                onChange={(e) => setInputPassword(e.target.value)}
                                required
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col sm={3}>
                            <Form.Label>EMAIL ID</Form.Label>
                            <Form.Control
                                type="email"
                                value={inputEmail}
                                placeholder="Enter Email Id"
                                onChange={(e) => setInputEmail(e.target.value)}
                                required
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col sm={3}>
                            <Form.Label>PHONE NO</Form.Label>
                            <Form.Control
                                type='Phone'
                                value={inputPhone}
                                placeholder="Enter Phone No."
                                onChange={(e) => setInputPhone(e.target.value)}
                                required
                            />
                        </Col>
                    </Row>


                    <Row className="justify-content-center" style={{ marginTop: "10vh" }}>
                        <Col sm={5}>
                            <div className="login-reg-btn">
                                <Button className="w-40" variant="primary" type="submit">
                                    Register
                                </Button>
                                <NavLink to="/" className="btn btn-primary w-40">
                                    Login
                                </NavLink>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>

        </>
    );
};

export default Register;
