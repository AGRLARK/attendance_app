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
            <div className="register-section">
                <div className="container-register" >
                    <h1 style={{ textAlign: "center", marginTop: "32px" }}>JFORCE SOLUTIONS</h1>
                    <Form className=" p-4 " onSubmit={handleSubmit} action="">
                        <div className="h4 mb-2 text-center">ATTENDANCE APP</div>
                        <div className="h10 mb-2 text-center">REGISTER PAGE</div>

                        <div className="custome-input-box">
                            <div className="register-fields">
                                <Row className="justify-content-center">
                                    <Col sm={4} className="register-col">
                                        <Form.Group className="custome-form-g" controlId="username">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                className="form-control-input"
                                                type="text"
                                                value={inputUsername}
                                                placeholder="Enter Username"
                                                onChange={(e) => setInputUsername(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col sm={4} className="register-col">
                                        <Form.Group className="custome-form-g" controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                className="form-control-input"
                                                type="password"
                                                value={inputPassword}
                                                placeholder="Enter Password"
                                                onChange={(e) => setInputPassword(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col sm={4} className="register-col">
                                        <Form.Group className="custome-form-g" controlId="email">
                                            <Form.Label>EMAIL ID</Form.Label>
                                            <Form.Control
                                                className="form-control-input"
                                                type="email"
                                                value={inputEmail}
                                                placeholder="Enter Email Id"
                                                onChange={(e) => setInputEmail(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col sm={4} className="register-col">
                                        <Form.Group className="custome-form-g" controlId="phone">
                                            <Form.Label>PHONE NO</Form.Label>
                                            <Form.Control
                                                className="form-control-input"
                                                type='Phone'
                                                value={inputPhone}
                                                placeholder="Enter Phone No."
                                                onChange={(e) => setInputPhone(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>


                                <Row className="justify-content-center" >
                                    <Col sm={5}>
                                        <div className="register-reg-btn">
                                            <Button className="w-40 custome-btn" variant="primary" type="submit">
                                                Register
                                            </Button>
                                            <NavLink to="/" className="btn btn-primary w-40">
                                                Login
                                            </NavLink>
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                        </div>
                    </Form>
                </div>
            </div >
        </>
    );
};

export default Register;
