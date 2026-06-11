// Подключение Firebase

const firebaseConfig = {
  apiKey: "AIzaSyB7zwscFRdQl8Izk522LLesgbAG_8YqNlQ",
  authDomain: "worldcuppredictor2026-c9339.firebaseapp.com",
  projectId: "worldcuppredictor2026-c9339",
  storageBucket: "worldcuppredictor2026-c9339.firebasestorage.app",
  messagingSenderId: "265647409165",
  appId: "1:265647409165:web:0bc0e7ed72ffa81e6fed44"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
