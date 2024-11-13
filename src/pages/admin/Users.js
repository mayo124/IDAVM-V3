"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudents, deleteStudent } from "../../utils/getDataFromGr";

const AllUsers = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const users = await getAllStudents();
      setStudents(Object.values(users));
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const handleDownloadQR = (qrCode) => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    link.click();
  };

  const handleDeleteClick = (grNumber) => {
    setShowConfirmModal(true);
    setStudentToDelete(grNumber);
  };

  const handleConfirmDelete = async () => {
    const result = await deleteStudent(studentToDelete);

    if (result.success) {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.grNumber !== studentToDelete)
      );
    }
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setStudentToDelete(null);
  };

  const handleEdit = (grNumber) => {
    navigate(`/admin/updateUser/${grNumber}`);
  };

  const handleAddUser = () => {
    navigate("/admin/adduser");
  };

  const redirectHome = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          All Students
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out">
            Add User
          </button>
          <button
            onClick={redirectHome}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out">
            Go To Home
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="px-4 py-2 border text-center">QR Code</th>
                <th className="px-4 py-2 border text-center">GR Number</th>
                <th className="px-4 py-2 border text-center">Name</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.grNumber}
                  className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?data=${student.grNumber}&size=100x100`}
                      alt={`QR code for ${student.grNumber}`}
                      className="mx-auto rounded-md shadow-md"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-center">
                    {student.grNumber}
                  </td>
                  <td className="px-4 py-2 text-sm text-center">
                    {student.name}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDownloadQR(student.qr)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600 transition-all duration-300 ease-in-out">
                        Download QR
                      </button>
                      <button
                        onClick={() => handleEdit(student.grNumber)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600 transition-all duration-300 ease-in-out">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(student.grNumber)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Are you sure you want to delete this student?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all duration-300 ease-in-out">
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
