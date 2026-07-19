import {
  db,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "./firebase.js";

let currentCustomer = null;

document.getElementById("searchBtn").onclick = async () => {

  const mobile = document.getElementById("searchMobile").value.trim();

  if (mobile === "") {
    alert("Enter Mobile Number");
    return;
  }

  const snap = await getDocs(collection(db, "users"));

  let users = [];

  snap.forEach(userDoc => {

    users.push({
      id: userDoc.id,
      ...userDoc.data()
    });

  });

  users.sort((a,b)=>Number(b.hrpoint)-Number(a.hrpoint));

  currentCustomer = null;

  for(let i=0;i<users.length;i++){

    const data=users[i];

    if(data.mobile==mobile){

      currentCustomer=data;

      let level="🥉 Bronze";

      if(Number(data.hrpoint)>=1000){
        level="💎 Platinum";
      }else if(Number(data.hrpoint)>=500){
        level="🥇 Gold";
      }else if(Number(data.hrpoint)>=200){
        level="🥈 Silver";
      }

      document.getElementById("name").textContent=data.name;
      document.getElementById("mobile").textContent=data.mobile;
      document.getElementById("hrpoint").textContent=data.hrpoint;
      document.getElementById("rank").textContent="#" + (i+1);
      document.getElementById("status").textContent=data.status+" | "+level;

      break;

    }

  }

  if(currentCustomer==null){

    alert("Customer Not Found");

    return;

  }

  document.getElementById("editBtn").onclick=async()=>{

    const newHR=prompt(
      "Enter New HR Points",
      currentCustomer.hrpoint
    );

    if(newHR==null) return;

    await updateDoc(
      doc(db,"users",currentCustomer.id),
      {
        hrpoint:Number(newHR)
      }
    );

    alert("HR Updated Successfully");

    document.getElementById("searchBtn").click();

  };
    // Delete Customer
  document.getElementById("deleteBtn").onclick = async () => {

    const ok = confirm(
      `⚠️ WARNING!\n\nDo you really want to permanently delete:\n\n${currentCustomer.name}\n${currentCustomer.mobile}\n\nThis action cannot be undone.`
    );

    if (!ok) return;

    try {

      // Delete User
      await deleteDoc(doc(db, "users", currentCustomer.id));

      // Delete Recharge History
      const rechargeSnap = await getDocs(collection(db, "recharges"));

      for (const rechargeDoc of rechargeSnap.docs) {

        const recharge = rechargeDoc.data();

        if (
          recharge.customerMobile == currentCustomer.mobile ||
          recharge.rechargeNumber == currentCustomer.mobile
        ) {

          await deleteDoc(
            doc(db, "recharges", rechargeDoc.id)
          );

        }

      }

      // Delete Scratch Cards
      const scratchSnap = await getDocs(collection(db, "scratchCards"));

      for (const scratchDoc of scratchSnap.docs) {

        const scratch = scratchDoc.data();

        if (
          scratch.customerMobile == currentCustomer.mobile
        ) {

          await deleteDoc(
            doc(db, "scratchCards", scratchDoc.id)
          );

        }

      }

      alert("✅ Customer and all related data deleted successfully.");

      // Clear Screen
      document.getElementById("name").textContent = "-";
      document.getElementById("mobile").textContent = "-";
      document.getElementById("hrpoint").textContent = "-";
      document.getElementById("rank").textContent = "-";
      document.getElementById("status").textContent = "-";
      document.getElementById("searchMobile").value = "";

      currentCustomer = null;

    } catch (err) {

      console.error(err);
      alert("❌ Delete failed.");

    }

  };

};
