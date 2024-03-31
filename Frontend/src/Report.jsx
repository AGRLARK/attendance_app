import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Report = () => {
    const { username } = useParams();
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const signInRecordsData = JSON.parse(localStorage.getItem('signInRecords')) || [];
        const signOutRecordsData = JSON.parse(localStorage.getItem('signOutRecords')) || [];

        if (!signInRecordsData || !signOutRecordsData) {
            console.error("Error: signInRecords or signOutRecords not found in localStorage");
            return;
        }

        const groupedSignInRecords = groupRecordsByDate(signInRecordsData);
        const groupedSignOutRecords = groupRecordsByDate(signOutRecordsData);

        const mergedRecords = mergeRecords(groupedSignInRecords, groupedSignOutRecords);

        const formattedReportData = formatReportData(mergedRecords);

        setReportData(formattedReportData);
    }, []);

    const groupRecordsByDate = (records) => {
        return records.reduce((acc, record) => {
            const dateKey = new Date(record.date).toLocaleDateString();
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(record);
            return acc;
        }, {});
    };

    const mergeRecords = (signInRecords, signOutRecords) => {
        const mergedRecords = {};
        for (const dateKey in signInRecords) {
            const signInRecord = signInRecords[dateKey][0];
            const signOutRecord = signOutRecords[dateKey] ? signOutRecords[dateKey][0] : { signOut: "Absent" };
            mergedRecords[dateKey] = { date: dateKey, signIn: signInRecord, signOut: signOutRecord };
        }
        return mergedRecords;
    };

    const formatReportData = (records) => {
        return Object.values(records);
    };

    return (
        <div className="container mt-4">
            <h2>Attendance Report for {username}</h2>
            {reportData.map((record, index) => (
                <div className="report-disp mt-4" key={index}>
                    <p >{record.date}</p>
                    <p >Sign In - {record.signIn ? new Date(record.signIn.date).toLocaleTimeString() : "Absent"}</p>
                    <p >Sign Out - {record.signOut ? new Date(record.signOut.date).toLocaleTimeString() : "Absent"}</p>
                </div>
            ))}
        </div>
    );
};

export default Report;
