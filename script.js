//Función que me aplica el estilo a la opciòn seleccionada y quita la previamente seleccionada
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links  a');
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].className = "";
    opciones[3].className = "";
    opciones[4].className = "";
    opciones[5].className = "";
    opciones[6].className = "";
    link.className = "seleccionado";

    //Hacemos desaparecer el menu una vez que se ha seleccionado una opcion
    //en modo responsive
    var x = document.getElementById("nav");
    x.className = "";
}

//función que muestra el menu responsive
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

//detecto el scrolling para aplicar la animación del la barra de habilidades
window.onscroll = function() { efectoHabilidades() };

//funcion que aplica la animación de la barra de habilidades
function efectoHabilidades() {
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distancia_skills >= 300) {
        document.getElementById("html").classList.add("barra-progreso1");
        document.getElementById("js").classList.add("barra-progreso2");
        document.getElementById("bd").classList.add("barra-progreso3");
        document.getElementById("git").classList.add("barra-progreso4");
        document.getElementById("c").classList.add("barra-progreso5");
        document.getElementById("b").classList.add("barra-progreso6");
    }

}

// function limpiar(){
// formulario.reset();
// }
const data = [];
document.getElementById("btnSubmit").addEventListener("click", function () {
    // event.preventDefault();
    // var question = document.getElementById("questionNumberBelow").innerText;
    const Nombre = document.getElementById("nombre").value;
    const Email = document.getElementById("email").value;
    const Mensaje = document.getElementById("mensaje").value;
    var emailField = document.getElementById("email");
    
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (Email.trim() === "" || Nombre.trim() === "" || Mensaje.trim() === "") {
        alert("Por favor, complete ambos campos");
        return false;
    }
    if (validEmail.test(emailField.value)) {
        const preg = {
            id: 1,
            nombre: Nombre,
            email:Email,
            mensaje:Mensaje
        };
            data.push(preg);
            sendEmail();
            const cadenaJSON = JSON.stringify(data);
            console.log(cadenaJSON);
    } else {
        alert("El correo electrónico no es válido");
        return false;
    }
});


    const sendEmail = () => {
        const jsonString = JSON.stringify(data);
        const requestpos = new XMLHttpRequest();
        requestpos.open("POST", "send_email.php", true);
        requestpos.setRequestHeader(
            "Content-Type",
            "application/json;charset=UTF-8"
        );
        requestpos.onreadystatechange = function () {
            if (requestpos.readyState === 4) {
                if (requestpos.status === 200) {
                    alert("Correo enviado con éxito.");
                } else {
                    alert("Error al enviar el correo.");
                }
            }
        };
        requestpos.send(jsonString);
    };
