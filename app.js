// ---------------------
// Telegram
// ---------------------

Telegram.WebApp.ready();
Telegram.WebApp.expand();

// ---------------------
// Пользователь
// ---------------------

let telegramUser;

if(
    Telegram.WebApp.initDataUnsafe &&
    Telegram.WebApp.initDataUnsafe.user
){

    telegramUser =
    Telegram.WebApp.initDataUnsafe.user;

}else{

    telegramUser = {

        id:"999999",

        first_name:"Developer"

    };

}

// ---------------------
// Регистрация
// ---------------------

async function registerUser(){

    try{

        const userRef =
        db.collection("users")
        .doc(
            telegramUser.id.toString()
        );

        const user =
        await userRef.get();

        if(!user.exists){

            await userRef.set({

                name:
                telegramUser.first_name,

                points:0,

                created_at:
                new Date()
                .toISOString()

            });

        }

    }catch(error){

        console.log(error);

    }

}

// ---------------------
// Матчи
// ---------------------

async function loadMatches(){

    try{

        let html = "";

        const snapshot =
        await db
        .collection("matches")
        .get();

        if(snapshot.empty){

            html = `

            <div class="card">

            Матчи пока не добавлены

            </div>

            `;

        }else{

            snapshot.forEach((doc)=>{

                const match =
                doc.data();

                html += `

                <div class="card">

                <h2>

                ${match.team1}

                -

                ${match.team2}

                </h2>

                <p>

                ${match.match_date}

                </p>

                <div class="score">

                <input
                id="s1_${doc.id}"
                type="number"
                min="0"
                value="0">

                :

                <input
                id="s2_${doc.id}"
                type="number"
                min="0"
                value="0">

                </div>

                <button
                onclick="savePrediction('${doc.id}')">

                Сохранить прогноз

                </button>

                </div>

                `;

            });

        }

        document
        .getElementById(
        "content"
        ).innerHTML = html;

    }catch(error){

        console.log(error);

    }

}

// ---------------------
// Сохранение прогноза
// ---------------------

async function savePrediction(matchId){

    try{

        let score1 =
        parseInt(
        document
        .getElementById(
        "s1_" + matchId
        ).value);

        let score2 =
        parseInt(
        document
        .getElementById(
        "s2_" + matchId
        ).value);

        if(
            isNaN(score1) ||
            isNaN(score2)
        ){

            alert(
            "Введите счет"
            );

            return;

        }

        await db
        .collection(
        "predictions"
        )
        .add({

            user_id:
            telegramUser.id.toString(),

            match_id:
            matchId,

            prediction1:
            score1,

            prediction2:
            score2,

            earned_points:
            0,

            created_at:
            new Date()
            .toISOString()

        });

        alert(
        "Прогноз сохранен"
        );

    }catch(error){

        console.log(error);

        alert(
        "Ошибка сохранения"
        );

    }

}

// ---------------------
// Таблица
// ---------------------

async function showLeaderboard(){

    try{

        let html =
        `<div class="card">
        <h2>🏆 Лидеры</h2>`;

        const snapshot =
        await db
        .collection("users")
        .orderBy(
        "points",
        "desc"
        )
        .get();

        let place = 1;

        snapshot.forEach((doc)=>{

            const user =
            doc.data();

            html += `

            <p>

            ${place}.
            ${user.name}
            -
            ${user.points}

            </p>

            `;

            place++;

        });

        html += "</div>";

        document
        .getElementById(
        "content"
        ).innerHTML =
        html;

    }catch(error){

        console.log(error);

    }

}

// ---------------------
// Профиль
// ---------------------

function showProfile(){

    document
    .getElementById(
    "content"
    ).innerHTML = `

    <div class="card">

    <h2>

    ${telegramUser.first_name}

    </h2>

    <p>

    Telegram ID:
    ${telegramUser.id}

    </p>

    </div>

    `;

}

// ---------------------
// Запуск
// ---------------------

async function startApp(){

    await registerUser();

    await loadMatches();

}

startApp();
