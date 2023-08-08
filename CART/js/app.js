// VARIABLES

const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");


// LISTENERS

cargarEventListener();

function cargarEventListener (){
    // Dspara cuando se preciona agregar carrito
    cursos.addEventListener("click", comprarCurso);

    // Cuando se elimina el curso de el carrito
    carrito.addEventListener("click", eliminarCurso);

    vaciarCarritoBtn.addEventListener("click", vaciarCarrito)

    // Cargar documento carga localstorage

    document.addEventListener("DOMContentLoaded", leerLocalStorage);

}
    
// FUNCIONES

// funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();

    // delagacion para cargar carrito
    if(e.target.classList.contains("agregar-carrito")){
        //console.log("carrito");

        const curso = e.target.parentElement.parentElement;
        //console.log(curso)

        leerDatosCurso(curso);
        
    }
}

// lee los datos de el curso

function leerDatosCurso (curso){

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso .querySelector("h4").textContent,
        precio: curso .querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id")
    }

    insertarCarrito(infoCurso);
    //console.log(infoCurso)
}

// Muestra el curso seleccionado en el carrito

function insertarCarrito(curso){
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><img src="${curso.imagen}" alt="${curso.title}" width="100"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;

    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();
    //console.log("eliminando");

    let curso;
    let cursoId;

    if(e.target.classList.contains("borrar-curso")){
       // console.log()
       e.target.parentElement.parentElement.remove();
       curso = e.target.parentElement.parentElement;

       cursoId = curso.querySelector('a').getAttribute("data-id");

    }

   // eliminarCursoLocalStorage(cursoId);
   eliminarCursoLocalStorage(cursoId);
}

// Funcion vaciar carrito

function vaciarCarrito(e){
    e.preventDefault();
    console.log("vaciar carrito");

    //listaCursos.innerHTML = "";

    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild)
    }

    //return false;

    // Vaciar Local Storage

    vaciarLocalStorage();

    return false;

}

/// Almacena curso de el carrito en local Storage


function guardarCursoLocalStorage(curso){
    //console.log(curso)
    let cursos;

    // Toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();

    //console.log(cursos);

    // CURSO SELECCIONADO SE AGREGA AL ARREGLOs
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));

}

// Comprueba uqe hay aelementos enlocal Storage
function obtenerCursosLocalStorage () {
    let cursosLS;
    // comprobar si hay cursos en Local Storage

    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem("cursos"));
    }

    return cursosLS;
} 

// imprime los cursos de local Storage en el carrito
function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function (curso){
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${curso.imagen}" alt="${curso.title}" width="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;

        listaCursos.appendChild(row);
    });
}

// ELIMINAR CURSO DE LOCAL STORAGE
 function eliminarCursoLocalStorage(curso){
    //console.log(curso);
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(cursoLS, index){
        //console.log(curso.id);
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1)
        }
    })

    //console.log(cursosLS);

    localStorage.setItem("cursos", JSON.stringify(cursosLS));


 }

 // elimina todos los cursos de local Storage

 function vaciarLocalStorage(){
    localStorage.clear();
 }