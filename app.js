import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://lfcfkmhstqyldzttfpqk.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_dJMJ0SpmOXFprT6O9U5w2w_8eCxobTN";

const supabase = createClient(supabaseUrl, supabaseKey);

// 🔹 Student Login
window.login = async function () {
  let id = document.getElementById("student_id").value;
  let pass = document.getElementById("password").value;

  let { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", id)
    .eq("password", pass);

  if (data.length > 0) {
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("name").innerText = "Name: " + data[0].name;
    document.getElementById("attendance").innerText =
      "Attendance: " + data[0].attendance;
  } else {
    alert("Invalid Login");
  }
};

// 🔹 Add Student (Admin)
window.addStudent = async function () {
  let name = document.getElementById("name").value;
  let sid = document.getElementById("sid").value;
  let pass = document.getElementById("pass").value;
  let att = document.getElementById("att").value;

  let { error } = await supabase.from("students").insert([
    {
      name: name,
      student_id: sid,
      password: pass,
      attendance: att,
    },
  ]);

  if (!error) {
    document.getElementById("msg").innerText = "Student Added ✅";
  } else {
    document.getElementById("msg").innerText = "Error ❌";
  }
};
