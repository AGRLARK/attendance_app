import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Report = () => {
    const { username } = useParams();
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const signInRecordsData = JSON.parse(localStorage.getItem('signInRecords')) || [];
        const signOutRecordsData = JSON.parse(localStorage.getItem('signOutRecords')) || [];

        const groupedSignInRecords = groupRecordsByDate(signInRecordsData);
        const groupedSignOutRecords = groupRecordsByDate(signOutRecordsData);

        const mergedRecords = mergeRecords(groupedSignInRecords, groupedSignOutRecords);

        const formattedReportData = formatReportData(mergedRecords);

        setReportData(formattedReportData);
    }, []);

    const groupRecordsByDate = (records) => {
        return records.reduce((acc, record) => {
            const dateKey = new Date(record.date).toISOString().slice(0, 10);
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(record);
            return acc;
        }, {});
    };

    const mergeRecords = (signInRecords, signOutRecords) => {
        const mergedRecords = {};
        for (const dateKey in signInRecords) {
            const signInRecord = signInRecords[dateKey][1] || { signIn: "Absent" };
            const signOutRecord = signOutRecords[dateKey][1] || { signOut: "Absent" };
            mergedRecords[dateKey] = { date: dateKey, ...signInRecord, ...signOutRecord };
        }
        return mergedRecords;
    };

    const formatReportData = (records) => {
        return Object.values(records);
    };

    return (
        <div className="container">
            <h2>Attendance Report for {username}</h2>
            {reportData.map((record, index) => (
                <div key={index}>
                    <p>{record.date}</p>
                    <p>Sign In - {record.signIn}</p>
                    <p>Sign Out - {record.signOut}</p>
                </div>
            ))}
        </div>
    );
};

export default Report;
