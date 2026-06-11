// ==========================
// Telegram
// ==========================

Telegram.WebApp.ready();
Telegram.WebApp.expand();

// ==========================
// Пользователь
// ==========================

let telegramUser;

if (
    Telegram.WebApp.initDataUnsafe &&
    Telegram.WebApp.initDataUnsafe.user
) {

    telegramUser =
        Telegram.WebApp.initDataUnsafe.user;

} else {

    // Тестовый пользователь для браузера

    telegramUser = {

        id: 999999,

        first_name: "Developer"

    };

}

// ==========================
// Регистрация пользователя
// ==========================

async function registerUser() {

    try {

        const userRef = db
            .collection("users")
            .doc(
                telegramUser.id.toString()
            );

        const userDoc =
            await userRef.get();

        if (userDoc.exists) {

            console.log(
                "Пользователь уже существует"
            );

        } else {

            await userRef.set({

                name:
                    telegramUser.first_name,

                points: 0,

                created_at:
                    new Date().toISOString()

            });

            console.log(
                "Пользователь создан"
            );

        }

    } catch (error) {

        console.log(error);

    }

}

// ==========================
// Загрузка матчей
// ==========================

async function loadMatches() {

    try {

        let html = "";

        const snapshot =
            await db
                .collection("matches")
                .get();

        snapshot.forEach((document) => {

            const match =
                document.data();

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
                        id="score1_${document.id}"
                        type="number"
                        value="0"
                    >

                    :

                    <input
                        id="score2_${document.id}"
                        type="number"
                        value="0"
                    >

                </div>

                <br>

                <button
                    onclick="savePrediction('${document.id}')"
                >

                    Сохранить прогноз

                </button>

            </div>

            `;

        });

        document
            .getElementById(
                "content"
            )
            .innerHTML = html;

    } catch (error) {

        console.log(error);

    }

}

// ==========================
// Сохранение прогноза
// ==========================

async function savePrediction(matchId) {

    try {

        let score1 =
            parseInt(
                document.getElementById(
                    "score1_" + matchId
                ).value
            );

        let score2 =
            parseInt(
                document.getElementById(
                    "score2_" + matchId
                ).value
            );

        if (
            isNaN(score1) ||
            isNaN(score2)
        ) {

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
                    new Date().toISOString()

            });

        alert(
            "Прогноз сохранен"
        );

    } catch (error) {

        console.log(error);

        alert(
            "Ошибка сохранения"
        );

    }

}

// ==========================
// Запуск приложения
// ==========================

async function startApp() {

    await registerUser();

    await loadMatches();

}

startApp();
