"use client";

import { useEffect, useState } from "react";
import { DriverInfo } from "../Models/DriverInfo";
import { deleteDriverInfo, editDriverInfo, getAllDriverInfo, saveDriverInfo } from "../Services/DriverService";

export default function FetchDriverInfoData() {
    const [lstDriverInfo, setLstDriverInfo] = useState<DriverInfo[]>([]);
    const [message, setMessage] = useState("");
    const [driverID, setDriverID] = useState(0);
    const [driverName, setDriverName] = useState("");
    const [dob, setDOB] = useState<Date | null>(null);
    const [experience, setExperience] = useState("");
    const [haveLicence, setHaveLicence] = useState("");
    const [expectedSalary, setExpectedSalary] = useState("");
    const [writtenTestPassed, setWrittenTestPassed] = useState("");
    const [oralTestPassed, setOralTestPassed] = useState("");
    const [drivingTestPassed, setDrivingTestPassed] = useState("");
    const [enableEdit, setEnableEdit] = useState(false);

    useEffect(() => {
        const response = getAllDriverInfo();
        response.then(res => res.json()).then(data => {
            setLstDriverInfo(data.lstDriverInfo[0]);
        });
    }, []);

    function saveDriver() {

        if (!driverName || !dob || !experience || !haveLicence || !expectedSalary || !writtenTestPassed || !oralTestPassed || !drivingTestPassed) {
            setMessage("Failed! Please fill in all fields");
            return;
        }

        const objDriverInfo = new DriverInfo();
        objDriverInfo.DriverID = driverID;
        objDriverInfo.DriverName = driverName;
        objDriverInfo.DOB = new Date(dob);
        objDriverInfo.Experience = experience;
        objDriverInfo.HaveLicence = haveLicence === "true";
        objDriverInfo.ExpectedSalary = parseInt(expectedSalary);
        objDriverInfo.WrittenTestPassed = writtenTestPassed === "true";
        objDriverInfo.OralTestPassed = oralTestPassed === "true";
        objDriverInfo.DrivingTestPassed = drivingTestPassed === "true";

        if (enableEdit) {
            const response = editDriverInfo(objDriverInfo);
            response.then(res => res.json()).then(data => {
                if (data.statusCode === 200) {
                    setMessage("Driver Info edited successfully");
                    setDriverID(0);
                    setDriverName("");
                    setDOB(null);
                    setExperience("");
                    setHaveLicence("");
                    setExpectedSalary("");
                    setWrittenTestPassed("");
                    setOralTestPassed("");
                    setDrivingTestPassed("");
                    setLstDriverInfo(lstDriverInfo.map(driver => driver.DriverID === objDriverInfo.DriverID ? objDriverInfo : driver));

                    setEnableEdit(false);
                } else {
                    setMessage("Failed to edit Driver Info");
                }
            });
        }
        else {
            const response = saveDriverInfo(objDriverInfo);
            response.then(res => res.json()).then(data => {
                if (data.statusCode === 200) {
                    setMessage("Driver Info added successfully");
                    setDriverName("");
                    setDOB(null);
                    setExperience("");
                    setHaveLicence("");
                    setExpectedSalary("");
                    setWrittenTestPassed("");
                    setOralTestPassed("");
                    setDrivingTestPassed("");
                    setLstDriverInfo([...lstDriverInfo, objDriverInfo]);
                } else {
                    setMessage("Failed to add Driver Info");
                }
            });
        }
    }

    function editDriver(driverInfo: DriverInfo) {
        setEnableEdit(true);
        setDriverID(driverInfo.DriverID);
        setDriverName(driverInfo.DriverName);
        setDOB(new Date(driverInfo.DOB));
        setExperience(driverInfo.Experience);
        setHaveLicence(driverInfo.HaveLicence ? "true" : "false");
        setExpectedSalary(driverInfo.ExpectedSalary.toString());
        setWrittenTestPassed(driverInfo.WrittenTestPassed ? "true" : "false");
        setOralTestPassed(driverInfo.OralTestPassed ? "true" : "false");
        setDrivingTestPassed(driverInfo.DrivingTestPassed ? "true" : "false");
    }

    function deleteDriver(driverInfo: DriverInfo) {
        const response = deleteDriverInfo(driverInfo);
        response.then(res => res.json()).then(data => {
            if (data.statusCode === 200) {
                setMessage("Driver Info deleted successfully");
                setLstDriverInfo(lstDriverInfo.filter(driver => driver.DriverID !== driverInfo.DriverID));
            } else {
                setMessage("Failed to delete Driver Info");
            }
        });
    }

    return (
        <div>
            <div className="center">
                <h3>Driver Info</h3>
            </div>
            <div className="center">
                <div style={{ display: "flex", justifyContent: "space-between", gap: "25px" }}>

                    <label><b>Driver Name: </b></label>
                    <input type="text" placeholder="Enter name" value={driverName} onChange={(e) => setDriverName(e.target.value)} />

                    <label><b>DOB: </b></label>
                    <input type="date" value={dob ? dob.toISOString().split('T')[0] : ''} onChange={(e) => setDOB(new Date(e.target.value))} />

                    <label><b>Experience: </b></label>
                    <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                        <option value="">Select years</option>
                        <option value="1+">1+ years</option>
                        <option value="3+">3+ years</option>
                        <option value="5+">5+ years</option>
                        <option value="10+">10+ years</option>
                    </select>

                </div>
            </div>
            <div className="center">
                <div style={{ display: "flex", justifyContent: "space-between", gap: "25px" }}>

                    <div>
                        <label><b>Have Licence: </b></label>
                        <input type="checkbox" checked={haveLicence === "true"} onChange={(e) => setHaveLicence(e.target.checked ? "true" : "false")} />
                        <span style={{ color: "green", cursor: "pointer" }} onClick={() => setHaveLicence("true")}>Yes</span>
                        <input type="checkbox" checked={haveLicence === "false"} onChange={(e) => setHaveLicence(e.target.checked ? "false" : "true")} />
                        <span style={{ color: "red", cursor: "pointer" }} onClick={() => setHaveLicence("false")}>No</span>
                    </div>

                    <label><b>Expected Salary: </b></label>
                    <input type="number" placeholder="Enter salary" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} />

                    <div>
                        <label><b>Written Passed: </b></label>
                        <input type="checkbox" checked={writtenTestPassed === "true"} onChange={(e) => setWrittenTestPassed(e.target.checked ? "true" : "false")} />
                        <span style={{ color: "green", cursor: "pointer" }} onClick={() => setWrittenTestPassed("true")}>Yes</span>
                        <input type="checkbox" checked={writtenTestPassed === "false"} onChange={(e) => setWrittenTestPassed(e.target.checked ? "false" : "true")} />
                        <span style={{ color: "red", cursor: "pointer" }} onClick={() => setWrittenTestPassed("false")}>No</span>
                    </div>

                </div>
            </div>
            <div className="center">
                <div style={{ display: "flex", justifyContent: "space-between", gap: "25px" }}>

                    <div>
                        <label><b>Oral Passed: </b></label>
                        <input type="checkbox" checked={oralTestPassed === "true"} onChange={(e) => setOralTestPassed(e.target.checked ? "true" : "false")} />
                        <span style={{ color: "green", cursor: "pointer" }} onClick={() => setOralTestPassed("true")}>Yes</span>
                        <input type="checkbox" checked={oralTestPassed === "false"} onChange={(e) => setOralTestPassed(e.target.checked ? "false" : "true")} />
                        <span style={{ color: "red", cursor: "pointer" }} onClick={() => setOralTestPassed("false")}>No</span>
                    </div>

                    <div>
                        <label><b>Driving Passed: </b></label>
                        <input type="checkbox" checked={drivingTestPassed === "true"} onChange={(e) => setDrivingTestPassed(e.target.checked ? "true" : "false")} />
                        <span style={{ color: "green", cursor: "pointer" }} onClick={() => setDrivingTestPassed("true")}>Yes</span>

                        <input type="checkbox" checked={drivingTestPassed === "false"} onChange={(e) => setDrivingTestPassed(e.target.checked ? "false" : "true")} />
                        <span style={{ color: "red", cursor: "pointer" }} onClick={() => setDrivingTestPassed("false")}>No</span>
                    </div>
                </div>
            </div>
            <div className="center">
                <div>
                    <button style={{ width: "100px", height: "30px", border: "1px solid black", borderRadius: "5px", backgroundColor: "lightgreen" }}
                        type="submit" onClick={saveDriver}>
                        <b>Add Driver</b>
                    </button>
                </div>
            </div>
            <div className="center">
                <h3 style={{ color: message.includes("Failed") ? "red" : "black" }}>{message}</h3>
            </div>
            <div>
                <h2>List of Drivers: </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Driver ID</th>
                            <th>Driver Name</th>
                            <th>DOB</th>
                            <th>Experience (Year)</th>
                            <th>Have Licence</th>
                            <th>Expected Salary</th>
                            <th>Written Test Passed</th>
                            <th>Oral Test Passed</th>
                            <th>Driving Test Passed</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lstDriverInfo.map((driverInfo: DriverInfo, index: number) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{driverInfo.DriverName}</td>
                                <td>{new Date(driverInfo.DOB).toLocaleDateString()}</td>
                                <td>{driverInfo.Experience}</td>
                                <td>{(driverInfo.HaveLicence == true) ? "Yes" : "No"}</td>
                                <td>{driverInfo.ExpectedSalary}</td>
                                <td>{(driverInfo.WrittenTestPassed == true) ? "Yes" : "No"}</td>
                                <td>{(driverInfo.OralTestPassed == true) ? "Yes" : "No"}</td>
                                <td>{(driverInfo.DrivingTestPassed == true) ? "Yes" : "No"}</td>
                                <td>
                                    <button type="button" style={{ marginRight: "5px" }}
                                        className="btn btn-light mr-1"
                                        onClick={() => editDriver(driverInfo)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" fill="rgba(0, 124, 255, 1)" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => deleteDriver(driverInfo)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" fill="#dc3545" viewBox="0 0 24 24">
                                            <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                                            <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}