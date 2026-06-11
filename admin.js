async function addMatch(){

    let team1 =
    document
    .getElementById(
    "team1"
    ).value;

    let team2 =
    document
    .getElementById(
    "team2"
    ).value;

    let date =
    document
    .getElementById(
    "date"
    ).value;

    if(
        team1==="" ||
        team2==="" ||
        date===""
    ){

        alert(
        "Заполните поля"
        );

        return;

    }

    await db
    .collection(
    "matches"
    )
    .add({

        team1:team1,

        team2:team2,

        match_date:date,

        score1:0,

        score2:0,

        finished:false

    });

    alert(
    "Матч добавлен"
    );

    loadAdminMatches();

}

async function loadAdminMatches(){

    let html="";

    const snapshot =
    await db
    .collection(
    "matches"
    )
    .get();

    snapshot.forEach((doc)=>{

        const match =
        doc.data();

        html += `

        <div class="card">

        <h3>

        ${match.team1}

        -

        ${match.team2}

        </h3>

        <p>

        ${match.match_date}

        </p>

        </div>

        `;

    });

    document
    .getElementById(
    "matches"
    ).innerHTML =
    html;

}

loadAdminMatches();
