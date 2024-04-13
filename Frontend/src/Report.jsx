import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Table, Button } from 'react-bootstrap';

const Report = () => {
    const [reportData, setReportData] = useState([]);
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/attendance-report?username=${username}`);
                const { signInRecords, signOutRecords } = response.data;
                const formattedReportData = mergeRecords(signInRecords, signOutRecords);
                setReportData(formattedReportData);
            } catch (error) {
                console.error("Error fetching report data:", error);
            }
        };

        fetchData();
    }, [username]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const mergeRecords = (signInRecords, signOutRecords) => {
        const mergedRecords = [];
        const signInsByDate = {};
        const signOutsByDate = {};

        // Reversed the arrays to get the last sign-in and sign-out records
        signInRecords.reverse();
        signOutRecords.reverse();

        const today = new Date().toLocaleDateString();
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString();
        const currentTime = new Date();

        signInRecords.forEach(record => {
            const date = new Date(record.date).toLocaleDateString();
            if (!signInsByDate[date]) {
                signInsByDate[date] = record;
            }
        });

        signOutRecords.forEach(record => {
            const date = new Date(record.date).toLocaleDateString();
            if (!signOutsByDate[date]) {
                signOutsByDate[date] = record;
            }
        });

        // Check if there are any sign-in records for today
        if (!signInsByDate[today]) {
            mergedRecords.push({
                date: today,
                signIn: "Pending",
                signOut: "Pending"
            });
        }


        Object.keys(signInsByDate).forEach(date => {
            const signInRecord = signInsByDate[date];
            const signOutRecord = signOutsByDate[date];

            const signInTime = new Date(signInRecord.date);
            const signOutTime = signOutRecord ? new Date(signOutRecord.date) : null;

            // Check if sign-in time is in the future
            if (signInTime > currentTime) {
                mergedRecords.push({
                    date,
                    signIn: new Date(signInRecord.date).toLocaleTimeString(),
                    signOut: "Pending"
                });
            } else if (date === today && !signOutRecord) {
                // For today with no sign-out record, mark as pending
                mergedRecords.push({
                    date,
                    signIn: new Date(signInRecord.date).toLocaleTimeString(),
                    signOut: "Pending"
                });
            } else if (date === yesterday && !signOutRecord) {
                // For yesterday with no sign-out record, mark as absent
                mergedRecords.push({
                    date,
                    signIn: new Date(signInRecord.date).toLocaleTimeString(),
                    signOut: "Absent"
                });
            } else if (signOutTime && signInTime > signOutTime) {
                // If sign-in time is after sign-out time, mark as pending
                mergedRecords.push({
                    date,
                    signIn: new Date(signInRecord.date).toLocaleTimeString(),
                    signOut: "Pending"
                });
            } else {
                mergedRecords.push({
                    date,
                    signIn: new Date(signInRecord.date).toLocaleTimeString(),
                    signOut: signOutRecord ? new Date(signOutRecord.date).toLocaleTimeString() : "Absent"
                });
            }
        });

        return mergedRecords;
    };


    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const handleBack = () => {
        if (isAdmin) {
            navigate("/admin");
        } else {
            navigate("/home");
        }
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" >
                <Navbar.Brand style={{ paddingLeft: "10px" }}>ATTENDANCE APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title={username} id="basic-nav-dropdown" style={{ paddingRight: "70px" }}>
                            <NavDropdown.Item className='myprofile' href="/myprofile" style={{ backgroundColor: "green", color: "white" }} >My Profile</NavDropdown.Item>
                            <NavDropdown.Item className='log-out' onClick={handleLogout} style={{ backgroundColor: "red", color: "white" }} >Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="p-4">
                <h2 className="mb-4">Attendance Report for {username}</h2>
                <Table bordered hover>
                    <thead className="bg-primary report-section-table-head">
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Sign In</th>
                            <th>Sign Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((record, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{record.date}</td>
                                <td>{record.signIn}</td>
                                <td>{record.signOut}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant="primary" className="w-16 mt-4" style={{ marginLeft: "80%" }} onClick={handleBack}>
                    Back
                </Button>
            </div>
        </>
    );
};

export default Report;
