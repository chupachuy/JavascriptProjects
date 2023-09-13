/// Cotizador constructor para seguro

class Seguro{

    constructor(marca, anio, tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }

    cotizarSeguro(){
        /*
    
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    
        */
    
        let cantidad; 
        const base = 2000;
    
        switch(this.marca){
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
    
        }
    
        // Leer el año
        const diferencia = new Date().getFullYear() - this.anio;
    
        // cada año de diferencia hayq ue reducir 3%  el calor de el seguro
    
        cantidad -= ((diferencia * 3) * cantidad) / 100;
        /**
         * Si el seguro es basico se multiplica por 30%
         * Si es completo se multiplica por 50%
         */
    
        if( this.tipo === 'basico'){
            cantidad *= 1.30;
        } else{
            cantidad *= 1.50;
        }
    
        return cantidad;
    
    }

    

}

// Todo lo que se muestra en la interfaz
class Interfaz{
    mostrarMensaje(mensaje, tipo){
        const div = document.createElement('div');
    
        if(tipo === 'error'){
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
    
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));
    }

    mostrarResultado(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca;
    
        switch(seguro.marca){
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break; 
        }
    
        // crear div
    
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="header">Tu resumen:<br>
            <p>Marca = ${marca}</p>
            <p>Año = ${seguro.anio}</p>
            <p>Tipo seguro: ${seguro.tipo}</p>
            <p>Total: ${total}</p>
        `;
    
        const spinner = document.querySelector('#cargando img');
    
        spinner.style.display = 'block';
    
        setTimeout((e) => {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 3000);
    
    
    }
}


// Event Listenner

const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e){
    e.preventDefault();

    // Leer la marca seleccionada
    const marca= document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // leer el año Seleccionado de el formulario

    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // lee el valor de los Radio Buttons

    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //Crear instancia de interfaz

    const interfaz = new Interfaz();

    // revisamos que los campos no esten vacios

    if(marcaSeleccionada === "" || anioSeleccionado === "" || tipo === ""){

        // interfaz imprimendo un error 
        interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba de nuevo', 'error');
        setTimeout(function(){
            document.querySelector('.mensaje').remove();
        }, 3000);
    } else {

        // limpiar resultados anteriores

        const resultados = document.querySelector('#resultado div');

        if( resultados != null){
            resultados.remove();
        }


        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);

        //cotizar el seguro

        const cantidad = seguro.cotizarSeguro();

        // mostrar el resultado 

        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...', 'correcto');

    
    }


})

const max = new Date().getFullYear();
const min = max - 20;
const selectAnios = document.getElementById("anio");

for(let i = max; i > min; i-- ){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}

