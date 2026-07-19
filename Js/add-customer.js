import {
  db,
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from "./firebase.js";

function generatePassword() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateCustomerId(totalUsers) {
  return "HR" + String(totalUsers + 1).padStart(6, "0");
}

document.getElementById("addCustomerBtn").onclick = async () => {

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();

  if (name === "" || mobile === "") {
    alert("Please fill all details.");
    return;
  }

  if (mobile.length !== 10) {
    alert("Enter a valid 10-digit mobile number.");
    return;
  }

  const snap = await getDocs(collection(db, "users"));

  let exists = false;

  snap.forEach(user => {
    const data = user.data();

    if (data.mobile === mobile) {
      exists = true;
    }
  });

  if (exists) {
    alert("Customer already exists.");
    return;
  }

  const customerId = generateCustomerId(snap.size);
  const password = generatePassword();

  await addDoc(collection(db, "users"), {
    customerId: customerId,
    name: name,
    mobile: mobile,
    password: password,
    hrpoint: 0,
    rank: 1,
    status: "active",
    createdAt: serverTimestamp()
  });

  alert(
`✅ Customer Added Successfully

Customer ID: ${customerId}

Password: ${password}`
  );

  document.getElementById("name").value = "";
  document.getElementById("mobile").value = "";
};
