import {
  db,
  collection,
  getDocs,
  query,
  where
} from "./firebase.js";

const mobile = localStorage.getItem("userMobile");

if (!mobile) {
  location.href = "index.html";
}

const historyList = document.getElementById("historyList");
const totalRecharge = document.getElementById("totalRecharge");
const totalHR = document.getElementById("totalHR");

async function loadHistory() {

  const q = query(
    collection(db, "recharges"),
    where("customerMobile", "==", mobile)
  );

  const snap = await getDocs(q);

  historyList.innerHTML = "";

  let rechargeCount = 0;
  let hrTotal = 0;

  if (snap.empty) {
    historyList.innerHTML = `
      <div class="historyCard">
        <h3>📭 No Recharge History</h3>
      </div>
    `;
    return;
  }

  snap.forEach(doc => {

    const data = doc.data();

    rechargeCount++;
    hrTotal += Number(data.hrEarned || 0);

    const rechargeDate = data.date
      ? data.date.toDate().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : "-";

    historyList.innerHTML += `

    <div class="historyCard">

      <h3>📱 ${data.rechargeNumber}</h3>

      <p>💰 ₹${data.amount} Recharge</p>

      <p>⭐ +${data.hrEarned} HR</p>

      <p>🗓️ ${rechargeDate}</p>

      <span class="status">
      ✅ ${data.status || "Success"}
      </span>

    </div>

    `;

  });

  totalRecharge.textContent = rechargeCount;
  totalHR.textContent = hrTotal + " HR";

}

loadHistory();