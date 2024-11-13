import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, update, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBwi5o_yMx8nG_sGkRjaVHZskeXzCIgQRA",
  authDomain: "avm-card.firebaseapp.com",
  databaseURL:
    "https://avm-card-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "avm-card",
  storageBucket: "avm-card.firebasestorage.app",
  messagingSenderId: "479202556710",
  appId: "1:479202556710:web:622426234f396066badfe7",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const getStudentByGrNumber = async (grNumber) => {
  const studentRef = ref(database, `students/${grNumber}`);

  try {
    const snapshot = await get(studentRef);

    if (!snapshot.exists()) {
      console.log("No data found for this GR number.");
      return null;
    }

    const student = snapshot.val();
    console.log("Student Data:", student);

    return {
      grNumber,
      ...(student || {}),
    };
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
};

export const getAllStudents = async () => {
  const studentsRef = ref(database, "students/");
  console.log(studentsRef, "studentsRef");
  try {
    const snapshot = await get(studentsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No students found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
};

export const insertStudent = async (grNumber, studentData) => {
  const studentRef = ref(database, `students/${grNumber}`);

  try {
    const snapshot = await get(studentRef);
    if (snapshot.exists()) {
      return { error: "GR number already exists" };
    }

    await set(studentRef, studentData);
    return { success: true };
  } catch (error) {
    console.error("Error inserting student data:", error);
    return { error: "Error inserting student data" };
  }
};

export const updateStudent = async (grNumber, updatedData) => {
  const studentRef = ref(database, `students/${grNumber}`);

  try {
    await update(studentRef, updatedData);
    console.log("Student data has been successfully updated.");
    return { success: true, message: "Student data updated successfully." };
  } catch (error) {
    console.error("Error updating student data:", error);
    return {
      success: false,
      error: error.message || "An error occurred while updating student data.",
    };
  }
};

export const deleteStudent = async (grNumber) => {
  const studentRef = ref(database, `students/${grNumber}`);
  try {
    await remove(studentRef);
    console.log(`Student with GR Number ${grNumber} has been deleted.`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting student data:", error);
    return { success: false, error: error.message };
  }
};
