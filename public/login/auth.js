/*---------------LOGIN-------------*/
var signinForm = document.getElementById('login-form');

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    console.log(email, password);

    auth.signInWithEmailAndPassword(email, password).then(userCredential => {
        console.log(email, password);
        signinForm.reset();
        location.href = "../miembro/";
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
        location.href = "../miembro/"
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


/*---------------------LOGOUT------------

function cerrar() {
    auth.signOut().then(function () {
        location.href = "../index.html";
    }).catch(function (error) {
        swal("ERROR", "No se pudo cerrar sesión", "error");
    })
}*/