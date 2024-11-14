import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import QRCode from "qrcode";
import { useNavigate } from "react-router-dom";
import { insertStudent } from "../../utils/getDataFromGr";

const AddUser = () => {
  const [qrCode, setQrCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    grNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    grade: "",
    class: "",
    contactDetails: {
      motherEmail: "",
      motherMobile: "",
      fatherEmail: "",
      fatherMobile: "",
    },
    medical: {
      bloodGroup: "",
      height: "",
      allergies: "",
      medicalConsent: false,
    },
    lunchPreferences: {
      lunchRequired: false,
      dietaryPreference: "Non-Jain",
    },
    permissions: {
      artRoom: false,
      compLab: false,
      eLibrary: false,
    },
    hipProgram: {
      dayOfParticipation: "Monday",
      duration: "",
    },
  };

  const handleSubmit = async (values, { resetForm }) => {
    setErrorMessage(null);
    try {
      const qrCodeData = await QRCode.toDataURL(values.grNumber);
      const userData = { ...values, qr: qrCodeData };

      const response = await insertStudent(values.grNumber, userData);
      if (response && response.error) {
        window.scrollTo(0, 0);
        setErrorMessage("GR number already exists. Please enter a unique GR number.");
      } else {
        setQrCode(qrCodeData);
        resetForm();
      }
    } catch (error) {
      console.error("Error generating QR code or saving user data:", error);
      window.scrollTo(0, 0);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleBackToHome = () => {
    navigate("/admin/users");
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {qrCode ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">User QR Code</h2>
          <div className="flex justify-center mb-6">
            <img src={qrCode} alt="QR Code" className="w-64 h-64" />
          </div>
          <div className="flex space-x-4">
            <button onClick={handleDownloadQR} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors duration-300">
              Download QR Code
            </button>
            <button onClick={handleBackToHome} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="w-full max-w-2xl p-6 space-y-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Add User</h2>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="bg-red-200 text-red-600 p-2 rounded-md text-center mb-4">
                {errorMessage}
              </div>
            )}

            {/* GR Number */}
            <div>
              <label className="block text-gray-600">GR Number</label>
              <Field type="text" name="grNumber" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
            </div>

            {/* Personal Details */}
            <h3 className="text-xl font-semibold text-gray-700">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">First Name *</label>
                <Field type="text" name="firstName" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-600">Middle Name</label>
                <Field type="text" name="middleName" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-600">Last Name *</label>
                <Field type="text" name="lastName" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-600">Grade *</label>
                <Field as="select" name="grade" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none">
                  <option value="">Select Grade</option>
                  {/* Add Grade Options Here */}
                </Field>
              </div>
              <div>
                <label className="block text-gray-600">Class *</label>
                <Field as="select" name="class" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none">
                  <option value="">Select Class</option>
                  {/* Add Class Options Here */}
                </Field>
              </div>
            </div>

            {/* Contact Details */}
            <h3 className="text-xl font-semibold text-gray-700">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Mother's Email *</label>
                <Field type="email" name="contactDetails.motherEmail" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-600">Mother's Contact Number *</label>
                <Field type="text" name="contactDetails.motherMobile" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-600">Father's Email *</label>
                <Field type="email" name="contactDetails.fatherEmail" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-600">Father's Contact Number *</label>
                <Field type="text" name="contactDetails.fatherMobile" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
              </div>
            </div>

            {/* Medical Information */}
            <h3 className="text-xl font-semibold text-gray-700">Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Blood Group</label>
                <Field as="select" name="medical.bloodGroup" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none">
                  <option value="">Select Blood Group</option>
                  {/* Add Blood Group Options */}
                </Field>
              </div>
              <div>
                <label className="block text-gray-600">Height</label>
                <Field as="select" name="medical.height" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none">
                  <option value="">Select Height</option>
                  {/* Add Height Options */}
                </Field>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-600">Allergies</label>
                <Field type="text" name="medical.allergies" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-600">Medical Consent</label>
                <Field type="checkbox" name="medical.medicalConsent" className="w-6 h-6" />
              </div>
            </div>

            {/* Lunch Preferences */}
            <h3 className="text-xl font-semibold text-gray-700">Lunch Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Lunch Required</label>
                <Field type="checkbox" name="lunchPreferences.lunchRequired" className="w-6 h-6" />
              </div>
              <div>
                <label className="block text-gray-600">Dietary Preference</label>
                <Field as="select" name="lunchPreferences.dietaryPreference" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none">
                  <option value="Non-Jain">Non-Jain</option>
                  <option value="Jain">Jain</option>
                </Field>
              </div>
            </div>

            {/* Permissions & Extracurricular Activities */}
            <h3 className="text-xl font-semibold text-gray-700">Permissions & Extracurricular Activities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Day of Participation (HIP Program)</label>
                <Field as="select" name="hipProgram.dayOfParticipation" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none">
                  <option value="Monday">Mon</option>
                  {/* Add more days if needed */}
                </Field>
              </div>
              <div>
                <label className="block text-gray-600">Date & Time Duration</label>
                <Field type="text" name="hipProgram.duration" className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-6 hover:bg-blue-700 transition-colors duration-300">
              Submit
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default AddUser;
