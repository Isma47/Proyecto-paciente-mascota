const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

//CLASS

class Citas {
    constructor(){
        this.citas= [];
    }


    agregarCita(cita){
        this.citas = [...this.citas, cita];

        console.log(this.citas)
    }


    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        //crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')

        //Agregar clase en base al tipo
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }

        //mensaje de error
        divMensaje.textContent = mensaje;

        //agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
           divMensaje.remove(); 
        }, 5000);
    }



    imprimirCitas({citas}) { //los {} hacen que se haga destucturar, entonces 
        this.limpiarHTML()
        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('DIV');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;


            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propetario: </span> ${propietario}
            `

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Citas: </span> ${sintomas}
            `

            //Boton para eliminarv esta cita.
            const btnElimjnar = document.createElement('button');
            btnElimjnar.classList.add('btn', 'btn-danger', 'mr-2');
            btnElimjnar.innerHTML = 'Eliminar'

            btnElimjnar.onclick = () => eliminarCita(id);

            //agregar parrafos a devCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnElimjnar);


            //agregra al html
            contenedorCitas.appendChild(divCita);
        });
    }

    //aqui nos quedamos

    limpiarHTML(){
        while(contenedorCitas.firstElementChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();


document.addEventListener('DOMContentLoaded', ()=>{
    eventListeners();
})
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita)
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas:''
}


//Agreg datos al objeto de cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

//Valida y agrega una nueva cita

function nuevaCita(e){
    e.preventDefault();
    //Extraer la info del objeto de cita

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //validar
    if(mascota === ""|| propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === "") {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    //creando un id unico
    citaObj.id = Date.now();
    //Creando una nueva cita
    administrarCitas.agregarCita({...citaObj}); //pasamos una copio del objeto con {}

    reiniciarObjeto();
    //Reiniciar el formulario.
    formulario.reset();


    //Mostrar al html
    ui.imprimirCitas(administrarCitas);
    console.log(administrarCitas);
}

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id) {
    //eliminar cita
    administrarCitas.eliminarCita(id);

    //mensaje
    ui.imprimirAlerta('La cita se elimino correctamente')

    //refresca imprimir citas

    ui.imprimirCitas(administrarCitas)
}