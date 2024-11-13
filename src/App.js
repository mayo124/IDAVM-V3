import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import StudentDetail from "./pages/Student/StudentDetail";
import Student from "./pages/Student/Student";
import ContactPage from "./pages/contactDetails";
import Medicals from "./pages/medicle";
import Consents from "./pages/consents";
import Miscellaneous from "./pages/miscellaneous";
import Remarks from "./pages/remarks";
import Canteen from "./pages/canteen";
import Permissions from "./pages/permission";
import AddUser from "./pages/admin/AddUser";
import AllUsers from "./pages/admin/Users";
import UpdateUser from "./pages/admin/UpdateUser";
import LoginPage from "./pages/Login";

function App() {
  const PrivateRoute = () => {
    const token = localStorage.getItem("isAdmin");
    return token ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentDetail />} />
          <Route path="/student" element={<Student />} />
          <Route path="/canteen" element={<Canteen />} />
          <Route path="/contact-details" element={<ContactPage />} />
          <Route path="/medicle" element={<Medicals />} />
          <Route path="/consents" element={<Consents />} />
          <Route path="/remarks" element={<Remarks />} />
          <Route path="/permission" element={<Permissions />} />
          <Route path="/miscellaneous" element={<Miscellaneous />} />
          <Route path="/canteen" element={<Canteen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/users" element={<AllUsers />} />
            <Route path="/admin/adduser" element={<AddUser />} />
            <Route
              path="/admin/updateUser/:grNumber"
              element={<UpdateUser />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
