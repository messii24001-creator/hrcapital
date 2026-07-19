import {
  db,
  collection,
  getDocs
} from "./firebase.js";

async function loadDashboard() {

  const snap = await getDocs(collection(db, "users"));

  let totalUsers = snap.size;
  let totalHR = 0;

snap.forEach(doc => {
    const data = doc.data();

    totalHR += Number(data.hrpoint);
});

  document.getElementById("totalUsers").textContent = totalUsers;
  document.getElementById("totalHR").textContent = totalHR;
}

loadDashboard();
document.getElementById("addCustomer").onclick = () => {
    window.location.href = "add-customer.html";
};

document.getElementById("addRecharge").onclick = () => {
    window.location.href = "add-recharge.html";
};
document.getElementById("rechargeHistory").onclick = () => {
    window.location.href = "recharge-history.html";
};
document.getElementById("customerDetails").onclick = () => {
    window.location.href = "customer-details.html";
};
document.getElementById("leaderboardBtn").onclick = () => {
    window.location.href = "leaderboard.html";
};
document.getElementById("giveScratchBtn").onclick = () => {
    window.location.href = "give-scratch.html";
};
