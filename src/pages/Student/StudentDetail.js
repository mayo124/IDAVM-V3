import React, { useState, useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";
import QrScanner from "react-qr-barcode-scanner"; // Make sure this is the right package you're using
import { getStudentByGrNumber } from "../../utils/getDataFromGr";

const StudentDetail = () => {
  const [grNumber, setGrNumber] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [isInvalidQR, setIsInvalidQR] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const storedGrNumber = localStorage.getItem("grNumber");
    if (storedGrNumber) {
      setGrNumber(storedGrNumber);
      fetchStudentData(storedGrNumber);
    }
  }, []);

  const fetchStudentData = async (grNumber) => {
    const studentData = await getStudentByGrNumber(grNumber);
    if (studentData) {
      setIsInvalidQR(false);
      setStudentInfo(studentData);
    } else {
      setIsInvalidQR(true);
      setStudentInfo(null);
    }
  };

  const handleScan = (qr) => {
    console.log("Scanned QR Code Details:", qr);
    const data = qr?.text;

    if (data) {
      console.log("Extracted GR Number:", data);

      localStorage.setItem("grNumber", data);

      setIsInvalidQR(false);
      setGrNumber(data);

      fetchStudentData(data);

      setIsScanning(false);
    } else {
      console.error("QR code did not contain valid data.");
      setIsInvalidQR(true);
    }
  };

  const handleError = (err) => {
    console.error("Error scanning QR code", err);
  };

  const handleLogout = () => {
    localStorage.removeItem("grNumber");
    setGrNumber(null);
    setStudentInfo(null);
  };

  console.log(studentInfo, "studentInfo");

  if (redirect) {
    return <Navigate to="/" />;
  }

  const buttonRoutes = [
    { label: "Contact Details", path: "/contact-details" },
    { label: "Medicals", path: "/medicle" },
    { label: "Remarks", path: "/remarks" },
    { label: "Canteen", path: "/canteen" },
    { label: "Consents", path: "/consents" },
    { label: "Permission", path: "/permission" },
    { label: "Miscellaneous", path: "/miscellaneous" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-lg shadow-lg p-6 bg-white">
        <div className="flex flex-col">
          {isInvalidQR ? (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-red-500 mb-4">
                Invalid QR Code
              </h2>
              <p className="text-gray-600 mb-4">
                The QR code scanned is invalid.
              </p>
              <button
                onClick={() => {
                  setIsInvalidQR(false);
                  setIsScanning(true);
                }}
                className="bg-[#4f83c0] rounded-lg text-white text-lg font-medium py-2 px-4 transition duration-200 hover:bg-[#3f6a9c]">
                Scan Again
              </button>
            </div>
          ) : studentInfo ? (
            <div className="flex items-center bg-[#4f83c0] rounded-lg p-4 gap-4 shadow-md">
              <div className="flex-shrink-0">
                <img
                  src="https://img.freepik.com/premium-photo/school-student-white-background_1237858-1224.jpg?w=120"
                  alt="Student"
                  className="w-[120px] h-[120px] rounded-lg"
                />
              </div>
              <div className="text-white">
                <h4 className="text-2xl font-semibold">{studentInfo.name}</h4>
                <p className="text-lg">GR: {studentInfo.grNumber}</p>
                <p className="text-lg">Class: {studentInfo.class}</p>
                <p className="text-lg">DOB: {studentInfo.dob}</p>
                <p className="text-lg">Blood Group: {studentInfo.blood}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold mb-4">Welcome!</h2>
              <p className="text-gray-600 mb-4">
                Please scan your QR code to continue.
              </p>
              <button
                onClick={() => setIsScanning(true)}
                className="bg-[#4f83c0] rounded-lg text-white text-lg font-medium py-2 px-4 transition duration-200 hover:bg-[#3f6a9c]">
                Scan QR Code
              </button>
            </div>
          )}

          {isScanning && (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-xl font-semibold mb-4">
                Scanning QR Code...
              </h3>
              <QrScanner
                delay={300}
                onError={handleError}
                onUpdate={(err, qr) => qr && handleScan(qr)}
                style={{
                  width: "100%",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                }}
              />
            </div>
          )}

          {studentInfo && (
            <div className="flex flex-col gap-4 mt-6">
              {buttonRoutes.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className="block bg-[#4f83c0] rounded-lg text-white text-lg font-medium text-center py-2 transition duration-200 hover:bg-[#3f6a9c]">
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="bg-red-500 rounded-lg text-white text-lg font-medium text-center py-2 mt-4 transition duration-200 hover:bg-red-600 w-full">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
