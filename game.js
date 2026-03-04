import { db } from "./firebase-config.js";
import {
collection, addDoc, getDocs, deleteDoc, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const questions = [
{question:"根管治療常使用哪種器械？",options:["牙鉗","根管銼針","超音波潔牙機","咬合紙"],answer:1},
{question:"洗牙主要使用？",options:["刮匙","超音波潔牙機","橡皮障夾","骨鋸"],answer:1},
{question:"拔牙時常使用？",options:["牙鉗","高速手機","根管銼針","齒雕刀"],answer:0},
{question:"放置橡皮障需要？",options:["骨鋸","橡皮障夾","刮匙","咬合紙"],answer:1},
{question:"補牙前清理蛀洞常用？",options:["刮匙","牙鉗","骨鑿","超音波潔牙機"],answer:0},
{question:"切割牙體常使用？",options:["高速手機","牙鉗","橡皮障夾","刮匙"],answer:0},
{question:"牙周刮治使用？",options:["牙周刮刀","骨鋸","齒雕刀","根管銼針"],answer:0},
{question:"檢查牙齒常用？",options:["探針","骨鑿","刮匙","橡皮障夾"],answer:0},
{question:"壓印材料時使用？",options:["印模托盤","牙鉗","骨鋸","刮匙"],answer:0},
{question:"Boss題：哪個不是牙科器械？",options:["牙鉗","超音波潔牙機","心電圖機","根管銼針"],answer:2}
];

let current = 0;
let correct = 0;
let startTime;
let timer;
let playerName = "";

window.joinGame = function(){
  playerName = document.getElementById("name").value;
  if(!playerName){ alert("請輸入名字"); return;}
  document.getElementById("startScreen").style.display="none";
  document.getElementById("gameScreen").style.display="block";
  startTime = Date.now();
  showQuestion();
}

function showQuestion(){
  let q = questions[current];
  document.getElementById("question").textContent = q.question;
  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML="";
  q.options.forEach((opt,i)=>{
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = ()=>checkAnswer(i);
    optionsDiv.appendChild(btn);
  });
  startTimer();
}

function startTimer(){
  let timeLeft = 8;
  document.getElementById("time").textContent=timeLeft;
  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById("time").textContent=timeLeft;
    if(timeLeft<=0){
      clearInterval(timer);
      nextQuestion();
    }
  },1000);
}

function checkAnswer(i){
  if(i===questions[current].answer){
    correct++;
  }
  clearInterval(timer);
  nextQuestion();
}

function nextQuestion(){
  current++;
  if(current<questions.length){
    showQuestion();
  } else {
    endGame();
  }
}

async function endGame(){
  let totalTime = Math.floor((Date.now()-startTime)/1000);
  let score = correct*1000 - totalTime;
  await addDoc(collection(db,"players"),{
    name:playerName,
    score:score,
    correct:correct,
    time:totalTime
  });
  showResult(score);
}

async function showResult(score){
  document.getElementById("gameScreen").style.display="none";
  document.getElementById("resultScreen").style.display="block";
  document.getElementById("score").textContent="你的分數："+score;
  let snapshot = await getDocs(collection(db,"players"));
  let players=[];
  snapshot.forEach(doc=>players.push(doc.data()));
  players.sort((a,b)=>b.score-a.score);
  let rank = players.findIndex(p=>p.name===playerName)+1;
  document.getElementById("ranking").textContent="你的名次："+rank;
}

