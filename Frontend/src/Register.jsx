import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from 'react-bootstrap';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const errors = {};
        if (!formData.username.trim()) {
            errors.username = "Username is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (formData.phone.length < 10) {
            errors.phone = "Phone number must be at least 10 digits";
        }
        if (!formData.password.trim()) {
            errors.password = "Password is required";
        }

        if (Object.keys(errors).length === 0) {
            const response = await fetch("http://localhost:4000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("Registered Successfully");
                navigate('/');
            } else {
                setMessage("User Already  Exist");
            }
        } else {
            setErrors(errors);
        }
    };

    return (
        <>
            <div className="register-section">
                <div className="container-register" >
                    {message && <div style={{ color: "red", textAlign: "center" }}> {message} </div>}
                    <h1 style={{ textAlign: "center", marginTop: "32px" }}>REGISTER PAGE</h1>
                    <Form className=" p-4 " onSubmit={handleSubmit} action="">

                        <div className="custome-input-box">
                            <div className="register-fields">
                                <Row className="justify-content-center">
                                    <Col sm={4} className="register-col">
                                        <Form.Group className="custome-form-g" controlId="username">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                className="form-control-input"
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                placeholder="Enter Username"
                                                onChange={handleInputChange}
                                            />
                                            {errors.username && <p style={{ color: "red", textAlign: "center", fontSize: '14px' }}>{errors.username}</p>}
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
                                                name="email"
                                                value={formData.email}
                                                placeholder="Enter Email Id"
                                                onChange={handleInputChange}
                                            />
                                            {errors.email && <p style={{ color: "red", textAlign: "center", fontSize: '14px' }}>{errors.email}</p>}
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
                                                name="phone"
                                                value={formData.phone}
                                                placeholder="Enter Phone No."
                                                onChange={handleInputChange}
                                            />
                                            {errors.phone && <p style={{ color: "red", textAlign: "center", fontSize: '14px' }}>{errors.phone}</p>}
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
                                                name="password"
                                                value={formData.password}
                                                placeholder="Enter Password"
                                                onChange={handleInputChange}
                                            />
                                            {errors.password && <p style={{ color: "red", textAlign: "center", fontSize: '14px' }}>{errors.password}</p>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center" >
                                    <Col sm={5}>
                                        <div className="register-reg-btn">
                                            <Button className="w-40 custome-btn" variant="primary" type="submit" >
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
