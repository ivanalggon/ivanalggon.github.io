// boton de volver que redirige a la pagina principal y para el contador
function volver(){
    window.location.href = "../index.html";
    clearInterval(intervalo);
}

// Almacenar las operaciones generadas para evitar duplicados
let operacionesGeneradas = [];

// Función para generar un número aleatorio par entre 2 y 20
function generarNumeroImpar() {
    return Math.floor(Math.random() * 10) * 2 + 1;
}

// Verificar si la combinación de números ya ha sido generada
function esOperacionUnica(primerNumero, segundoNumero) {
    return !operacionesGeneradas.some(op => op.primerNumero === primerNumero && op.segundoNumero === segundoNumero);
}

// Modificación en la función para generar una operación y asegurar que sea única
function generarOperacion(divOperacion) {
    let primerNumero, segundoNumero, resultado;

    do {
        primerNumero = generarNumeroImpar();
        segundoNumero = generarNumeroImparMenor(primerNumero);
        resultado = primerNumero - segundoNumero;
    } while (!esOperacionUnica(primerNumero, segundoNumero));

    // Agregar la operación a la lista de operaciones generadas
    operacionesGeneradas.push({ primerNumero, segundoNumero });

    // Mostrar la operación en el div correspondiente
    divOperacion.innerHTML = `${primerNumero} - ${segundoNumero} = <input type="number" class="respuesta" min="0" max="100">`;
    divOperacion.dataset.respuesta = resultado;
}

// Función para generar un número aleatorio par menor que el número dado
function generarNumeroImparMenor(numero) {
    return Math.floor(Math.random() * (numero / 2)) * 2 + 1;
}

// Función para validar las respuestas al hacer clic en "Corregir"
function validarRespuestas(event) {
    // Detener el contador
    clearInterval(intervalo);

    // Evitar que el formulario se envíe y recargue la página
    event.preventDefault();

    // Obtener todos los divs de operación
    const divsOperacion = document.querySelectorAll('.operacion');

    // Contador de respuestas correctas
    let respuestasCorrectas = 0;

    // Iterar sobre los divs de operación para validar las respuestas
    divsOperacion.forEach(divOperacion => {
        let respuestaUsuario = parseInt(divOperacion.querySelector('.respuesta').value);
        let respuestaCorrecta = parseInt(divOperacion.dataset.respuesta);

        // Verificar si la respuesta del usuario es correcta
        if (respuestaUsuario === respuestaCorrecta) {
            respuestasCorrectas++;
        }
    });

    // Mostrar el puntaje
    document.getElementById('puntaje').textContent = `Puntuación: ${respuestasCorrectas} / 10`;

    // Desactivar el botón "Corregir"
    document.getElementById('corregir').disabled = true;

    // Desactivar los inputs
    const inputsRespuesta = document.querySelectorAll('.respuesta');
    inputsRespuesta.forEach(input => {
        input.disabled = true;
        });
}

// Generar operaciones al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const divsOperacion = document.querySelectorAll('.operacion');
    divsOperacion.forEach(generarOperacion);
});

// Llamar a la función de validarRespuestas al hacer clic en "Corregir"
document.getElementById('corregir').addEventListener('click', validarRespuestas);

// Botón "Intentar de nuevo"
document.getElementById('intentarDeNuevo').addEventListener('click', function() {
    // Reiniciar el contador
    segundos = 0;
    contadorElement.textContent = 'Tiempo: 00:00';

    // Limpiar el registro de operaciones generadas para empezar de nuevo
    operacionesGeneradas = [];

    // Reiniciar las operaciones
    const divsOperacion = document.querySelectorAll('.operacion');
    divsOperacion.forEach(generarOperacion);

    // Reiniciar el intervalo
    clearInterval(intervalo);
    intervalo = setInterval(actualizarContador, 1000);

    // Ocultar el puntaje
    document.getElementById('puntaje').textContent = '';

    // Activar los inputs
    const inputsRespuesta = document.querySelectorAll('.respuesta');
    inputsRespuesta.forEach(input => {
        input.disabled = false;
        input.value = ''; // Limpiar el valor
    });

    // Activar el botón "Corregir"
    document.getElementById('corregir').disabled = false;
});

// Iniciar el contador
const contadorElement = document.getElementById('contador');
let segundos = 0;
let intervalo = setInterval(actualizarContador, 1000);

// Actualizar el contador cada segundo
function actualizarContador() {
    segundos++;
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    const minutosFormateados = String(minutos).padStart(2, '0');
    const segundosFormateados = String(segundosRestantes).padStart(2, '0');
    contadorElement.textContent = `Tiempo: ${minutosFormateados}:${segundosFormateados}`;
}