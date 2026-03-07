import { db } from "./firebase-config.js";
import {
collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const questions = [
{question:"根管治療常使用哪種器械？",options:["elevator","DG16","excavator","scaler"],answer:1},
{question:"洗牙主要使用？",options:["rubber dam","excavator","forceps","scaling tip"],answer:3},
{question:"拔牙時常使用？",options:["高速手機","拔牙鉗","根管銼針","牙周探針"],answer:1},
{question:"放置橡皮障需要？",options:["骨鋸","橡皮障夾","刮匙","咬合紙"],answer:1},
{question:"補牙前清理蛀洞常用？",options:["超音波潔牙機","牙鉗","骨鑿","刮匙"],answer:3},
{question:"拆冠常使用？",options:["高速手機","牙鉗","橡皮障夾","刮匙"],answer:0},
{question:"哪一個不是牙周治療常使用？",options:["牙周刮刀","根管探針","牙周探針","顯斑劑"],answer:1},
{question:"哪一個不是印模材料？",options:["Alginate","DMG Blue","putty","etchant"],answer:3},
{question:"哪個是左上第一大臼齒？",options:["16","17","26","27"],answer:2},
{question:"Boss題：申報哪一個項目不用塗顯斑劑衛教？",options:["91014","91004","91089","91090"],answer:1}
];

let current = 0;
let correct = 0;
let startTime;
let timer;
let playerName = "";

window.joinGame = function(){
  playerName = document.getElementById("name").value;

  if(!playerName){
    alert("請輸入名字");
    return;
  }

  document.getElementById("startScreen").style.display="none";
  document.getElementById("gameScreen").style.display="block";

  startTime = Date.now();
  showQuestion();
}

function showQuestion(){
  clearInterval(timer);

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

  if(current >= questions.length){
    endGame();
    return;
  }

  showQuestion();
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

  document.getElementById("ranking").style.display="none";
}







