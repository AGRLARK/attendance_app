import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
        <div className="container" style={{ marginTop: "10vh" }}>
            <Button onClick={handleLogout}>Log Out </Button>
            <h1>Admin Page</h1>
            <h2>Usernames:</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {users.map((user, index) => (
                    <Link key={index} to={`/report/${user.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <div>{user.username}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Admin;
