import { db } from "./firebase-config.js";

import {
collection,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// 讀取排行榜
window.loadRanking = async function(){

  let snapshot = await getDocs(collection(db,"players"));

  let players=[];

  snapshot.forEach(p=>{
    players.push({
      id:p.id,
      ...p.data()
    });
  });

  players.sort((a,b)=>b.score-a.score);

  let html="";

  players.forEach((p,i)=>{
    html += (i+1)+" . "+p.name+" - "+p.score+"<br>";
  });

  document.getElementById("ranking").innerHTML = html;

}


// 清空排行榜
window.resetRanking = async function(){

  let snapshot = await getDocs(collection(db,"players"));

  for (const p of snapshot.docs){
    await deleteDoc(doc(db,"players",p.id));
  }

  document.getElementById("ranking").innerHTML="";

  alert("排行榜已清空");
}
window.resetRanking = async function(){

  let snapshot = await getDocs(collection(db,"players"));

  snapshot.forEach(async (player)=>{
    await deleteDoc(doc(db,"players",player.id));
  });

  alert("排行榜已清空");

}
