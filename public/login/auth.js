// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDJsXC1Qt8WLGG_IcWXLHn8vt5zMTlVuBI",
    authDomain: "copetera-web.firebaseapp.com",
    projectId: "copetera-web",
    storageBucket: "copetera-web.appspot.com",
    messagingSenderId: "993682462076",
    appId: "1:993682462076:web:d3183c93b79e7b41a680f9",
    measurementId: "G-Q3MBR3V28X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const signinForm = document.getElementById('login-form');

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    console.log(email, password);

    auth.signInWithEmailAndPassword(email, password).then(userCredential => {
        console.log(email, password);
        signinForm.reset();
        location.href = "../miembro/dashboard.html";
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        swal(errorCode, errorMessage, "error");
    });
});
auth.onAuthStateChanged(function (user) {
    if (user) {
        swal("Ingresando", "Sesión Activa", "info");
        location.href = "../miembro/dashboard.html"
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
    } else {
        // User is signed out.
        // ...
        //swal("Lo siento", "No estas logueado", "info");
        

    }
});




function cerrar() {
    auth.signOut().then(function () {
        location.href = "../index.html";
    }).catch(function (error) {
        swal("ERROR", "No se pudo cerrar sesión", "error");
    })
}