import React, { useEffect, useState } from "react";
import { getStudentByGrNumber } from "../utils/getDataFromGr";

const ContactDetails = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (grNumber) => {
    const data = await getStudentByGrNumber(grNumber);
    setStudentData(data);
  };

  useEffect(() => {
    const grNumber = localStorage.getItem("grNumber");
    if (grNumber) {
      fetchData(grNumber);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!studentData) {
    return <p className="text-center">No student found with this GR number.</p>;
  }
  console.log(studentData, "contect");
  const { contactDetails } = studentData;
  const { fatherMobile, motherMobile, fatherEmail, motherEmail } =
    contactDetails;

  const cleanEmail = (email) =>
    email ? email.replace("mailto:", "") : "Not avalable";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-lg shadow-lg p-4 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Contact Details
        </h2>
        <div className="flex items-center bg-[#618eb8] rounded-[15px] p-4 mb-4">
          <div className="text-white">
            <p className="text-lg font-medium">
              Father Mobile: {fatherMobile || "Not avalable"}
            </p>
            <p className="text-lg font-medium">
              Mother Mobile: {motherMobile || "Not avalable"}
            </p>
            <p className="text-lg font-medium">
              Father Email: {cleanEmail(fatherEmail)}
            </p>
            <p className="text-lg font-medium">
              Mother Email: {cleanEmail(motherEmail)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
