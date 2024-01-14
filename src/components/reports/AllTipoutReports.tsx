import React, { useEffect, useState } from 'react'
import api from "../../API/axiosConfig";
import { useAuth } from '../../hooks/useAuth';
import { Table } from 'react-bootstrap';
import { format } from 'fecha';
import { useNavigate } from 'react-router-dom';

type Report = {
    id: string;
    dateTime: string;
    shift: string;
}


const AllTipoutReports = () => {
    const { user, logout } = useAuth()
    const [reports, setReports] = useState<Report[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        try {
            api
                .get("/reports/all", {
                    headers: {
                        Authorization: "Bearer " + user.accessToken,
                    }
                }).then((res) => {
                    setReports(res.data)
                }

                )
        } catch (e) { }
    }, [])

    const showReport = async (id: string) => {
        try {
            const response = await api.get(
                `/reports/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + user.accessToken,
                    },
                }
            );
            navigate("/calculate/report", { state: response.data });
        } catch (error: any) {
            console.log(error.response.request.status)
            if (error.response.request.status == 401) {
                alert("Your session has expired. Please log in again.");
                logout();
            }
            else if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert("No tips were declared.");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser
                // and an instance of http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
        }
    }

    return (<>
        <div>All Tipout Reports</div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Report Date</th>
                    <th>Report Shift</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report: Report) => {
                    try {
                        return (
                            <tr key={report.id} onClick={() => { showReport(report.id) }}>
                                <td>{format((new Date(report.dateTime + 'Z')), 'dddd MMMM Do, YYYY hh:mm A')}</td>
                                <td>{report.shift}</td>
                            </tr>);
                    } catch (e) { console.log(report) }
                })}
            </tbody>
        </Table>
    </>
    )
}

export default AllTipoutReports;