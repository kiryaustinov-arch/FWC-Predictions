import { db } from "./firebase.js";

import {

doc,

getDoc,

setDoc

}

from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
Telegram.WebApp.ready();
Telegram.WebApp.expand();

let telegramUser = null;

if (
    Telegram.WebApp.initDataUnsafe &&
    Telegram.WebApp.initDataUnsafe.user
){

    telegramUser =
    Telegram.WebApp.initDataUnsafe.user;

}

const matches = [

{
    team1:"Аргентина",
    team2:"Германия"
},

{
    team1:"Бразилия",
    team2:"Франция"
}

];

function showPage(page){

    let content = document.getElementById("content");

    if(page==="matches"){

        let html="";

        matches.forEach(match=>{

            html+=`
            <div class="card">

            <h2>
            ${match.team1}
            -
            ${match.team2}
            </h2>

            <div class="score">

            <input type="number">

            <span>:</span>

            <input type="number">

            </div>

            <br>

            <button>
            Сохранить прогноз
            </button>

            </div>
            `;

        });

        content.innerHTML=html;

    }

    if(page==="leaderboard"){

        content.innerHTML=`

        <div class="card">

        <h2>🏆 Таблица</h2>

        <p>1. Иван — 15</p>

        <p>2. Алексей — 12</p>

        <p>3. Сергей — 9</p>

        </div>

        `;

    }

    if(page==="profile"){

        let user="Друг";

        if(Telegram.WebApp.initDataUnsafe.user){

            user=Telegram.WebApp.initDataUnsafe.user.first_name;

        }

        content.innerHTML=`

        <div class="card">

        <h2>${user}</h2>

        <p>Баллы: 0</p>

        <p>Прогнозов: 0</p>

        </div>

        `;

    }

}

showPage("matches");
Telegram.WebApp.ready();
Telegram.WebApp.expand();
async function registerUser(){

    if(!telegramUser){

        console.log("Нет данных Telegram");

        return;

    }

    const userRef = doc(
        db,
        "users",
        telegramUser.id.toString()
    );

    const userSnap =
    await getDoc(userRef);

    if(userSnap.exists()){

        console.log(
            "Пользователь уже существует"
        );

    }else{

        await setDoc(userRef,{

            name:
            telegramUser.first_name,

            points:0,

            created_at:
            new Date().toISOString()

        });

        console.log(
            "Пользователь создан"
        );

    }

}
registerUser();
