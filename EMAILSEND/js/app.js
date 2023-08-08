// Variables

const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("enviar");

const formularioEnviar = document.getElementById("enviar-mail");

const btnReset = document.getElementById("resetBtn");




// Listenner

eventListeners();

function eventListeners (){
    // Inicio de la aplicacion y desabilitar submit

    document.addEventListener("DOMContentLoaded", inicioApp);
    email.addEventListener("blur", validarCampo);
    asunto.addEventListener("blur", validarCampo);
    mensaje.addEventListener("blur", validarCampo);
    formularioEnviar.addEventListener("submit", enviarEmail);

    btnReset.addEventListener("click", resetFormulario);

}


// Funciones+}

function inicioApp(){
    // desabilitar el envio
    btnEnviar.disabled = true;
}

// valida que el campo tenga algo escrito

function validarCampo(){
    //console.log("dentro del Input");

    // sevalida la longitud de el texto 
    validarLongitud(this);
    // validar email

    if(this.type === 'email'){
        validarEmail(this);
    }

    let errores = document.querySelectorAll(".error");

    if(email.value !== '' && asunto.value !== '' && mensaje.value != ''){
        if(errores.length === 0){
            btnEnviar.disabled = false;
        }
        
    }
}



function validarLongitud(campo){
    //console.log(campo.value.length);

    if(campo.value.length > 0){
        campo.style.borderBottomColor = "green";
        campo.classList.remove("error");
    } else {
        campo.style.borderBottomColor = "red";
        campo.classList.add("error");
    }
}

function validarEmail(campo){
    const mensaje = campo.value;
    if(mensaje.indexOf('@') !== -1){
        campo.style.borderBottomColor = "green";
        campo.classList.remove("error");
    } else {
        campo.style.borderBottomColor = "red";
        campo.classList.add("error");
    }
}

// cuando se envia el correo

function enviarEmail(e){
    e.preventDefault();
    //console.log("mailenviado");

    const spinnerGif = document.querySelector("#spinner");
    spinnerGif.style.display = "block";

    // GIF ENVIA EMAIL

    const enviado = document.createElement("img");
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    setTimeout(function(){
        spinnerGif.style.display= 'none';
        document.querySelector("#loaders").appendChild(enviado);

        setTimeout(function() {
            enviado.remove();
            formularioEnviar.reset();
        }, 5000);
    }, 3000)


}

function resetFormulario(e){
    e.preventDefault();
    formularioEnviar.reset();
}