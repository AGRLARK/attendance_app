import { Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Home = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showExit, setShowExit] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');


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
        alert("Marked Present Successfully");
        setShowExit(true);
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
        alert("Exit Successfully");
        setShowExit(false);
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
        }
    }, [navigate]);

    return (
        <>
            <div className="Time text-center">
                <button onClick={handleLogout}>Log Out </button>
                <h1 style={{ marginTop: "32px" }}>JFORCE SOLUTIONS</h1><br /><br />
                <h2>User: {username}</h2>
                <h4>
                    Today&apos;s Date: {currentTime.toLocaleDateString()}
                    <br /><br />
                    Current Time: {currentTime.toLocaleTimeString()}
                </h4>
            </div>
            <div>
                <>
                    <>
                        <div className="form-grp">
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
                        </div>
                    </>
                </>
            </div>
            <div className="h5 mt-3 text-center">
                <NavLink to={`/report/${username}`} className="btn btn-primary w-40" onSubmit={handleViewReport}>
                    View Report
                </NavLink>
            </div>
        </>
    )
}

export default Home