/*SINUSUIDAL
    let colors = {
        a1: "#cececf",
        a2: "#42dc8e",
        a3: "#2e43eb",
        a4: "#ffe359",
        b1: "#96bfed",
        b2: "#f5ead6",
        b3: "#f1f3f7",
        b4: "#e2e6ef"
    };

    let start = 0,
        inc = 0.01;
    let canvasWidth = 300,
        canvasHeight = canvasWidth;
    let pointDiameter = 10,
        lineInterval = 24;

    function setup() {
        createCanvas(canvasWidth, canvasHeight);
    }

    function draw() {
        background(34);
        let xoff = start;
        for (let x = Math.floor(pointDiameter / 3); x < width; x++) {
            let y = sin(xoff) * height / 2 + height / 2;
            if (x % lineInterval == 0) {
                stroke(colors.a1);
                line(x, y, x, height / 2);
                noStroke();
                ellipse(x, y, pointDiameter, pointDiameter);
            }
            xoff += inc;
        }
        start += inc;
    }

*/
window.onload = function () {
    $('#preloader').fadeOut;
    document.getElementById('preloader').style.display = "none";
}



function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
includeHTML();

AOS.init();
AOS.init({
    disable: false,
    offset: 240,
    delay: 0,
    duration: 800,
    easing: 'ease',
});

$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 50) {
        $('.fixed-top').css('background', 'rgba(0, 0, 0, 1)');
    } else {
        $('.fixed-top').css('background', 'transparent');
    }

});

$(window).resize(function () {
    if ($(window).width() < 480) {
        $('.display-3').removeClass('display-3')
    } else {
        $('h1').addClass('display-3')
    }
});

/*SMOOTSCROLL*/
$('a').on('click', function (e) {
    if (this.hash !== '') {
        e.preventDefault();

        var hash = this.hash;
        $('html,body').animate({
            scrollTop: $(hash).offset().top
        }, 3000);
    }

});

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
firebase.analytics();
var db = firebase.firestore();
var auth = firebase.auth();
var sto = firebase.storage();
/*-----------------STORAGE-----------------*/

//Get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('image');
/*Listen for file selection
fileButton.addEventListener('change', function (e) {
    //Traer archivo 
    var file = e.target.files[0];
    //Crear referencia en el storage
    var storageRef = sto.ref('fotos-perfil/' + file.name);
    //Subir archivo 
    var task = storageRef.put(file);
    //Actualizar barra de prgreso
    task.on('state_changed',
        function progress(snapshot) {
            var porciento = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            uploader.value = porciento;
        },
        function error(err) {
            swal("Error", "Ocurrio un error al subir el archivo", "error");
        },
        function complete() {
            task.snapshot.ref.getDownloadURL().then(function(url){
                
               
            });
            console.log(url);
            swal("Agregado", "correctamente", "success");
        }
    );
});*/

/*----------------DB MIEMBROS---------------*/
var formulario_member = document.getElementById('form-member');
var save = (nombre, email, telefono, carrera, estado,url) => db.collection("miembros").doc(nombre).set({
    nombre,
    email,
    telefono,
    carrera,
    estado,
    url
});
formulario_member.addEventListener('submit', async (f) => {
    f.preventDefault();
    var nombre = formulario_member['nombre'];
    var email = formulario_member['email'];
    var telefono = formulario_member['phone'];
    var carrera = formulario_member['carrera'];
    var estado = formulario_member['estado'];
    //const uid = uuid.v4();
    var ref = firebase.storage().ref('fotos-perfil');
    
    var file = document.querySelector("#image").files[0];
    var name = nombre.value;
    var metadata ={
        contentType: file.type
    }
    var ImgUrl;
    var task = ref.child(name).put(file,metadata);
    
    task.then(snapshot => snapshot.ref.getDownloadURL()).then(url =>{
        
        enlaceImg(url);
    });
    function enlaceImg(url){
        console.log(url);
        save(nombre.value, email.value, telefono.value, carrera.value, estado.value, url);

    }
    
    
    //await save1(titulo.value, //categoria.value, fecha.value, //autor.value, descripcion.value, uid);

    //formulario_member.reset();
    swal("Agregado", "correctamente", "success");


});
/*---------------------LOGOUT------------*/

function cerrar() {
    auth.signOut().then(function () {
        location.href = "../index.html";
    }).catch(function (error) {
        swal("ERROR", "No se pudo cerrar sesión", "error");
    })
}
