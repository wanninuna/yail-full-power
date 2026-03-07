import { db } from "./firebase-config.js";

import {
collection,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


window.loadRanking = async function(){

  let snapshot = await getDocs(collection(db,"players"));
  let players=[];

  snapshot.forEach(doc=>{
    players.push(doc.data());
  });

  players.sort((a,b)=>b.score-a.score);

  let html="";

  players.forEach((p,i)=>{
    html += (i+1)+" . "+p.name+" - "+p.score+"<br>";
  });

  document.getElementById("ranking").innerHTML=html;

}


window.resetRanking = async function(){

  let snapshot = await getDocs(collection(db,"players"));

  snapshot.forEach(async (player)=>{
    await deleteDoc(doc(db,"players",player.id));
  });

  alert("排行榜已清空");

}
