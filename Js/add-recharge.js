import {
  db,
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp
} from "./firebase.js";

let currentUserDoc = null;
let currentUserData = null;

document.getElementById("searchBtn").onclick = async () => {

  const mobile = document.getElementById("searchMobile").value.trim();

  const snap = await getDocs(collection(db, "users"));

  let found = false;

  snap.forEach(userDoc => {

    const data = userDoc.data();

    if (data.mobile == mobile) {

      found = true;
      currentUserDoc = userDoc;
      currentUserData = data;

      document.getElementById("name").textContent = data.name;
      document.getElementById("mobile").textContent = data.mobile;
      document.getElementById("currentHR").textContent = data.hrpoint;
    }

  });

  if (!found) {
    alert("Customer Not Found");
  }

};

document.getElementById("saveRecharge").onclick = async () => {

  if (!currentUserDoc) {
    alert("Pehle customer search karo.");
    return;
  }

  const rechargeNumber = document.getElementById("rechargeNumber").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const hrEarned = Number(document.getElementById("hrEarned").value);
  const paymentMode = document.getElementById("paymentMode").value;

  if (!rechargeNumber || !amount || !hrEarned) {
    alert("Sabhi details bharo.");
    return;
  }

  await addDoc(collection(db, "recharges"), {
    customerName: currentUserData.name,
    customerMobile: currentUserData.mobile,
    rechargeNumber: rechargeNumber,
    amount: amount,
    hrEarned: hrEarned,
    paymentMode: paymentMode,
    date: serverTimestamp()
  });

  const newHR = Number(currentUserData.hrpoint) + hrEarned;

  await updateDoc(doc(db, "users", currentUserDoc.id), {
    hrpoint: newHR
  });

  document.getElementById("currentHR").textContent = newHR;
  currentUserData.hrpoint = newHR;

  alert("✅ Recharge Saved Successfully!");

  document.getElementById("rechargeNumber").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("hrEarned").value = "";
};
