import React, { useEffect, useState } from 'react'
import api from "../../API/axiosConfig";
import { useAuth } from '../../hooks/useAuth';
import { Table } from 'react-bootstrap';

type Report = {
    id: string;
    dateTime: string;
    shift: string;
}

const AllTipoutReports = () => {
    const { user } = useAuth()
    const [reports, setReports] = useState<Report[]>([])

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
                            <tr key={report.id}>
                                <td>{report.dateTime}</td>
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