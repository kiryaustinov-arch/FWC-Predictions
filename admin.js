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
