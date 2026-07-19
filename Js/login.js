import {
  db,
  collection,
  query,
  where,
  getDocs
} from "./firebase.js";

// Auto Login
const savedUser = localStorage.getItem("userMobile");

if (savedUser) {
  window.location.href = "dashboard.html";
}

// Buttons
const loginBtn = document.getElementById("loginBtn");
const adminOpen = document.getElementById("adminOpen");

// Double Tap → Admin Login
let tap = 0;

adminOpen.addEventListener("click", () => {
  tap++;

  if (tap === 2) {
    window.location.href = "admin.html";
  }

  setTimeout(() => {
    tap = 0;
  }, 500);
});

// Customer Login
loginBtn.addEventListener("click", async () => {

  const mobile = document.getElementById("mobile").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!mobile || !password) {
    alert("Please fill all details");
    return;
  }

  try {

    const q = query(
      collection(db, "users"),
      where("mobile", "==", mobile),
      where("password", "==", password)
    );

    const snap = await getDocs(q);

    if (snap.empty) {

      alert("Invalid Mobile Number or Password");

    } else {

      localStorage.setItem("userMobile", mobile);

      window.location.href = "dashboard.html";

    }

  } catch (error) {

    console.error(error);
    alert("Login failed. Please try again.");

  }

});
