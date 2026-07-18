import {
  db,
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from "./firebase.js";

let selectedCustomer = null;

// Search Customer
document.getElementById("searchBtn").onclick = async () => {

  const mobile = document.getElementById("searchMobile").value.trim();

  if (mobile === "") {
    alert("Enter Mobile Number");
    return;
  }

  const snap = await getDocs(collection(db, "users"));

  selectedCustomer = null;

  snap.forEach(docSnap => {

    const data = docSnap.data();

    if (data.mobile == mobile) {

      selectedCustomer = data;

      document.getElementById("name").textContent = data.name;
      document.getElementById("customerId").textContent = data.customerId;
      document.getElementById("hrpoint").textContent = data.hrpoint;

    }

  });

  if (!selectedCustomer) {
    alert("Customer Not Found");
  }

};


// Give Scratch Card
document.getElementById("saveBtn").onclick = async () => {

  try {

    if (!selectedCustomer) {
      alert("Search Customer First");
      return;
    }

    const rewardType = document.getElementById("rewardType").value;
    const rewardValue = Number(document.getElementById("rewardValue").value);
    const theme = document.getElementById("theme").value;

    if (rewardValue <= 0) {
      alert("Enter Reward Value");
      return;
    }

    await addDoc(collection(db, "scratchCards"), {
      customerId: selectedCustomer.customerId || "",
      customerName: selectedCustomer.name,
      customerMobile: selectedCustomer.mobile,
      rewardType,
      rewardValue,
      theme,
      status: "ready",
      createdAt: serverTimestamp()
    });

    alert("✅ Scratch Card Created Successfully");

  } catch (err) {
    alert("Error: " + err.message);
    console.log(err);
  }

};