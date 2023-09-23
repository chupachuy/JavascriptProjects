// Variables

const presupuestoUsuario = prompt('Cual es tu presupuesto Semanal?');
const formulario = document.getElementById('agregar-gasto')
let cantidadPresupuesto;

//console.log(presupuestoUsuario);

// Clases

// clase presupuesto

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto)
    }

    // Metodo para ir restanbdo delpresupuesto actual

    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }


}

// Clase Interfaz

class Interfaz{
    insertarPresupuesto(cantidad) {
        console.log(cantidad);
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        // insertar al HTML

        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success')
        }

        divMensaje.appendChild(document.createTextNode(mensaje));

        // instertar en el DOOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // quitar el alert despues de 3 segudnos

        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000)

    }

    // INserta los gastos en la lista

    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        // Insertar el gasto

        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `;
        // instertar al HTML

        gastosListado.appendChild(li);
    }

    /// cmprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        // Leemos el presupuesto restante

        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        //console.log(presupuestoRestanteUsuario);

        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }
    // cambia de color el presupuesto restante

    comprobarPresupuesto(){
        //console.log(cantidadPresupuesto);
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // comprobar el 25% del gasto

        if((presupuestoTotal / 4) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        }else if((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }



    }
}

// Event Listeners

document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    } else {
        // Instanciar presupuesto agregado correctamente
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

        //instanciar la clase de Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
})


formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    /// Leer de el formulario de gastos

    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // instanciar la interfaz

    const ui = new Interfaz();

    if(nombreGasto === '' || cantidadGasto === ''){
        // 2 parametros Mensaje y tipo
        ui.imprimirMensaje('hubo un error', 'error');
    } else {

        // insertar en el HTML
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }

} )