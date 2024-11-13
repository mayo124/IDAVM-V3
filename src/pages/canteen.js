import React, { useEffect, useState } from "react";
import { getStudentByGrNumber } from "../utils/getDataFromGr";

const Canteen = () => {
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

  // Default fallback values if the data is undefined
  const { canteen, lunch, lunchFacility } = studentData;
  const canteenCashBalance = canteen?.cashBalance || "Not Available";
  const lunchStatus = lunchFacility ? "Available" : "Not Available";
  const lunchAvailability =
    lunch && Object.keys(lunch).length > 0
      ? Object.entries(lunch).map(([id, status]) => (
          <div key={id} className="mb-2">
            <p className="text-lg">
              Lunch ID: {id} - {status ? "Available" : "Not Available"}
            </p>
          </div>
        ))
      : "No lunch information available.";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-lg shadow-lg p-4 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Canteen Details
        </h2>

        {/* Cash Balance */}
        <div className="bg-[#618eb8] rounded-[15px] p-4 mb-4 text-white">
          <h4 className="text-xl font-medium mb-2">Canteen Cash Balance</h4>
          <p className="text-lg">{`₹${canteenCashBalance}`}</p>
        </div>

        {/* Lunch Facility */}
        <div className="bg-[#618eb8] rounded-[15px] p-4 mb-4 text-white">
          <h4 className="text-xl font-medium mb-2">Lunch Facility Status</h4>
          <p className="text-lg">{lunchStatus}</p>
        </div>

        {/* Lunch Availability */}
        <div className="bg-[#618eb8] rounded-[15px] p-4 text-white">
          <h4 className="text-xl font-medium mb-2">Lunch Availability</h4>
          <div>{lunchAvailability}</div>
        </div>
      </div>
    </div>
  );
};

export default Canteen;
