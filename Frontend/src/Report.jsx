import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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

    const mergeRecords = (signInRecords, signOutRecords) => {
        const mergedRecords = [];
        const maxCount = Math.max(signInRecords.length, signOutRecords.length);
        for (let i = 0; i < maxCount; i++) {
            const signInRecord = signInRecords[i] || { date: "Absent" };
            const signOutRecord = signOutRecords[i] || { date: "Absent" };
            mergedRecords.push({
                date: new Date(signInRecord.date).toLocaleDateString(),
                signIn: signInRecord.date !== "Absent" ? new Date(signInRecord.date).toLocaleTimeString() : "Absent",
                signOut: signOutRecord.date !== "Absent" ? new Date(signOutRecord.date).toLocaleTimeString() : "Absent"
            });
        }
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
        <div className="container text-center ">
            <h2>Attendance Report for {username}</h2>
            {reportData.map((record, index) => (
                <div key={index} className="attendance-box">
                    <p>{record.date}</p>
                    <p>Sign in - {record.signIn}</p>
                    <p>Sign out - {record.signOut}</p>
                </div>
            ))}
            <button className="btn btn-primary w-40 mb-4" onClick={handleBack}>
                Back
            </button>
        </div>
    );
};

export default Report;
