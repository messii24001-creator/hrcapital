import { db } from "./firebase.js";

import {
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const btn = document.getElementById("adminLoginBtn");

btn.addEventListener("click", async()=>{

const mobile=document.getElementById("adminMobile").value.trim();
const password=document.getElementById("adminPassword").value.trim();

if(mobile==""||password==""){

alert("Fill all details");
return;

}

const q=query(
collection(db,"admins"),
where("mobile","==",mobile),
where("password","==",password)
);

const snap=await getDocs(q);

if(snap.empty){

alert("Wrong Admin Details");

}else{

localStorage.setItem("admin","true");

window.location.href="admin-dashboard.html";

}

});