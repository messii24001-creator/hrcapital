import {
  db,
  collection,
  getDocs
} from "./firebase.js";

const mobile = localStorage.getItem("userMobile");

// Login Check
if (!mobile) {
  window.location.href = "index.html";
}

// Dashboard Data
async function loadDashboard() {

  try {

    const snap = await getDocs(collection(db, "users"));

    let users = [];

    snap.forEach(doc => {
      users.push(doc.data());
    });

    users.sort((a, b) => Number(b.hrpoint) - Number(a.hrpoint));

    for (let i = 0; i < users.length; i++) {

      const customer = users[i];

      if (customer.mobile == mobile) {

        document.getElementById("customerName").textContent =
          customer.name;

        document.getElementById("hrPoints").textContent =
          customer.hrpoint + " HR";

        document.getElementById("hrValue").textContent =
          Math.floor(Number(customer.hrpoint) / 10);

        document.getElementById("rank").textContent =
          "#" + (i + 1);

        let member = "🥉 Bronze";

        if (Number(customer.hrpoint) >= 1000)
          member = "💎 Platinum";
        else if (Number(customer.hrpoint) >= 500)
          member = "🥇 Gold";
        else if (Number(customer.hrpoint) >= 200)
          member = "🥈 Silver";

        document.getElementById("member").textContent = member;

        break;
      }

    }

  } catch (e) {

    console.error(e);
    alert("Dashboard load failed.");

  }

}

loadDashboard();

// Buttons
document.getElementById("scratchBtn").onclick = () => {
  window.location.href = "scratch.html";
};

document.getElementById("historyBtn").onclick = () => {
  window.location.href = "recharge-history.html";
};

document.getElementById("leaderboardBtn").onclick = () => {
  window.location.href = "leaderboard.html";
};

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", () => {

    if (confirm("Are you sure you want to logout?")) {

      localStorage.removeItem("userMobile");
      window.location.href = "index.html";

    }

  });

}
