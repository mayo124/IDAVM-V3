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
    class: "",
    name: "",
    dob: "",
    contactDetails: {
      fatherMobile: "",
      motherMobile: "",
      fatherEmail: "",
      motherEmail: "",
    },
    medical: {
      allergies: {
        dust: false,
        penicillin: false,
      },
      blood: "",
      height: "",
      sex: "",
    },
    permissions: {
      artRoom: false,
      compLab: false,
      eLibrary: false,
    },
    cashBalance: "",
    lunchFacility: false,
  };

  const handleSubmit = async (values, { resetForm }) => {
    setErrorMessage(null);
    try {
      const qrCodeData = await QRCode.toDataURL(values.grNumber);
      const userData = { ...values, qr: qrCodeData };

      const response = await insertStudent(values.grNumber, userData);
      if (response && response.error) {
        window.scrollTo(0, 0);
        setErrorMessage(
          "GR number already exists. Please enter a unique GR number."
        );
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
          <h2 className="text-2xl font-bold mb-6 text-blue-700">
            User QR Code
          </h2>
          <div className="flex justify-center mb-6">
            <img src={qrCode} alt="QR Code" className="w-64 h-64" />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleDownloadQR}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors duration-300">
              Download QR Code
            </button>
            <button
              onClick={handleBackToHome}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="w-full max-w-2xl p-6 space-y-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
              Add User
            </h2>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="bg-red-200 text-red-600 p-2 rounded-md text-center mb-4">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">GR Number</label>
                <Field
                  type="text"
                  name="grNumber"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600">Class</label>
                <Field
                  type="text"
                  name="class"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600">Date of Birth</label>
                <Field
                  type="date"
                  name="dob"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600">Father's Mobile</label>
                <Field
                  type="text"
                  name="contactDetails.fatherMobile"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600">Mother's Mobile</label>
                <Field
                  type="text"
                  name="contactDetails.motherMobile"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600">Father's Email</label>
                <Field
                  type="email"
                  name="contactDetails.fatherEmail"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600">Mother's Email</label>
                <Field
                  type="email"
                  name="contactDetails.motherEmail"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600">Blood Type</label>
                <Field
                  type="text"
                  name="medical.blood"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600">Height (cm)</label>
                <Field
                  type="number"
                  name="medical.height"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600">Sex</label>
                <Field
                  as="select"
                  name="medical.sex"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
              </div>

              <div>
                <label className="block text-gray-600">
                  Canteen Cash Balance
                </label>
                <Field
                  type="number"
                  name="cashBalance"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-600">Allergies</label>
                <div className="flex space-x-4 mt-2">
                  <label>
                    <Field type="checkbox" name="medical.allergies.dust" />
                    <span className="ml-2">Dust</span>
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="medical.allergies.penicillin"
                    />
                    <span className="ml-2">Penicillin</span>
                  </label>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-gray-600">Permissions</label>
                <div className="flex space-x-4 mt-2">
                  <label>
                    <Field type="checkbox" name="permissions.artRoom" />
                    <span className="ml-2">Art Room</span>
                  </label>
                  <label>
                    <Field type="checkbox" name="permissions.compLab" />
                    <span className="ml-2">Computer Lab</span>
                  </label>
                  <label>
                    <Field type="checkbox" name="permissions.eLibrary" />
                    <span className="ml-2">E-Library</span>
                  </label>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-gray-600">Lunch Facility</label>
                <Field
                  type="checkbox"
                  name="lunchFacility"
                  className="w-6 h-6"
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default AddUser;
