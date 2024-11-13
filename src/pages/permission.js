import React, { useEffect, useState } from "react";
import { getStudentByGrNumber } from "../utils/getDataFromGr";

const Permissions = () => {
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

  const { permissions } = studentData;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-lg shadow-lg p-4 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Permissions Details
        </h2>

        <div className="mb-4">
          <div className="bg-[#618eb8] rounded-[15px] p-4 text-white">
            <h4 className="text-xl font-medium mb-2">Art Room</h4>
            <p className="text-lg">
              {permissions?.artRoom ? permissions.artRoom : "No access granted"}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-[#618eb8] rounded-[15px] p-4 text-white">
            <h4 className="text-xl font-medium mb-2">Computer Lab</h4>
            <p className="text-lg">
              {permissions?.compLab ? permissions.compLab : "No access granted"}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-[#618eb8] rounded-[15px] p-4 text-white">
            <h4 className="text-xl font-medium mb-2">E-Library</h4>
            <p className="text-lg">
              {permissions?.elibrary
                ? permissions.elibrary
                : "No access granted"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
