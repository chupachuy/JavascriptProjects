// Variables 
const listaTweets = document.getElementById("lista-tweets");

// EventListenners

eventlListeners();

function eventlListeners(){
    // Cuando se envia el formulario
    document.querySelector("#formulario").addEventListener("submit", agregarTweet);

    // BORRRAR TWEETS
    listaTweets.addEventListener("click", borrarTweet);

    // Contenido cargado 

    document.addEventListener("DOMContentLoaded", localStoragelisto);
    
}

// Funciones 

// añadir Twwt de el formualario

function agregarTweet(e){
    e.preventDefault();
    //console.log("Envviado");
    ///  leer el valor de text Area

    const tweet = document.getElementById('tweet').value;

    // Crear boto de eliminiar
    const btnDelete = document.createElement("a");
    btnDelete.classList = "borrar-tweet";
    btnDelete.innerHTML = "X";


    const li = document.createElement("li");
    li.innerText = tweet;
    // Añade el boto de borrar al boton
    li.appendChild(btnDelete);
    // Añade el Tweet
    listaTweets.appendChild(li);

    // Crear elemento y añadir elemento a la lista

    //console.log(tweet);

    // Agregar tweet al local Storage
    agregarTweetLocalStorage(tweet);
}

function borrarTweet(e){
    e.preventDefault();

    if(e.target.className === "borrar-tweet"){
        //console.log("borrando tweet");
        //console.log();

        if(confirm("deseas eliminar el Tweet") === true){
            e.target.parentElement.remove();
            borrarTweetLocalStorage(e.target.parentElement.textContent);


            console.log();

        }
        
    }

}

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo Twwet
    tweets.push(tweet);
    // convertir a arreglo a string de local Staorage
    localStorage.setItem("tweets", JSON.stringify(tweets));
}


// comprueba que haya elementos en local storage retorna un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;

    // valores de local storage

    if(localStorage.getItem("tweets") === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem("tweets"));
    }
    return tweets;
}

// Mostrar datos de local storage en la lista
function localStoragelisto (){
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    console.log(tweets);

    tweets.forEach( function (tweet) {
         // Crear boto de eliminiar
        const btnDelete = document.createElement("a");
        btnDelete.classList = "borrar-tweet";
        btnDelete.innerHTML = "X";


        const li = document.createElement("li");
        li.innerText = tweet;
        // Añade el boto de borrar al boton
        li.appendChild(btnDelete);
        // Añade el Tweet
        listaTweets.appendChild(li);
    });
}



// eliminar tweet de local Storage

function borrarTweetLocalStorage(tweet){

    let tweets;
    // elimina la X de el weet
    let tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet, index){
        console.log(tweet);
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });




    localStorage.setItem("tweets", JSON.stringify(tweets));
}
