let iconos = [];
let selecciones = [];

let tarjetas = [];
const tablero = document.getElementById('tablero');

let tiempoInicio;
let tiempoTranscurrido = 0;
let juegoActivo = true;

let movimientos = 0;
let aciertos = 0;
let totalParejas = 12;
let intervaloTiempo;




function listaIconos() 
{
    iconos = [
        '<i class="fa-regular fa-star"></i>',
        '<i class="fa-solid fa-star"></i>',
        '<i class="fas fa-star-of-life"></i>',
        '<i class="fas fa-star-and-crescent"></i>',
        '<i class="fab fa-old-republic"></i>',
        '<i class="fab fa-galactic-republic"></i>',
        '<i class="fas fa-sun"></i>',
        '<i class="fas fa-stroopwafel"></i>',
        '<i class="fas fa-dice"></i>',
        '<i class="fas fa-chess-knight"></i>',
        '<i class="fas fa-chess"></i>',
        '<i class="fas fa-dice-d20"></i>',
    ];
}

function generarTablero() 
{
    listaIconos();

    for (let i = 0; i < 24; i++) 
    {
        tarjetas.push(`
            <div class="area_tarjeta" onclick="seleccionarTarjeta(${i})">
                <div class="tarjeta" id="tarjeta${i}">
                    <div class="cara trasera" id="trasera${i}">
                        ${iconos[0]}
                    </div>
                    <div class="cara superior">
                        <i class="fa-solid fa-question"></i>
                    </div>
                </div>
            </div> 
        `);
        if (i % 2 == 1) 
        {
            iconos.splice(0, 1);
        }
    }

    tarjetas.sort(() => Math.random() - 0.5);
    tablero.innerHTML = tarjetas.join("");

    tiempoInicio = new Date();
    movimientos = 0;
    aciertos = 0;
    totalParejas = 12;tiempoInicio = new Date();
    tiempoTranscurrido = 0;

    actualizarInfoPartida();
}

function seleccionarTarjeta(i) 
{
    let tarjeta = document.getElementById("tarjeta" + i);

    if (tarjeta.style.transform !== "rotateY(180deg)") 
    {
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);

        movimientos++;

        if (selecciones.length === 2) 
        {
            deseleccionar(selecciones);
            selecciones = [];
        }

        actualizarInfoPartida();
    }
}

function deseleccionar(selecciones) 
{
    setTimeout(() => 
    {
        let trasera1 = document.getElementById("trasera" + selecciones[0]).innerHTML;
        let trasera2 = document.getElementById("trasera" + selecciones[1]).innerHTML;
        if (trasera1 !== trasera2) 
        {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
            tarjeta1.style.transform = "rotateY(0deg)";
            tarjeta2.style.transform = "rotateY(0deg)";
        } 
        else 
        {
            document.getElementById("trasera" + selecciones[0]).style.background = "plum";
            document.getElementById("trasera" + selecciones[1]).style.background = "plum";
            aciertos++;

            // Verifica si todas las parejas han sido encontradas
            if (aciertos === totalParejas) 
            {
                mostrarModal();
                juegoActivo = false;
                // Puedes agregar aquí cualquier lógica adicional al completar el juego
            }
        }
    }, 1000);
}


function actualizarInfoPartida() 
{
    const minutos = Math.floor(tiempoTranscurrido / 60);
    const segundos = tiempoTranscurrido % 60;
    
    const infoPartida = `Tiempo: ${minutos}m ${segundos}s | Movimientos: ${movimientos} | Aciertos: ${aciertos} 
    / 12`;
    
    const infoPartidaElement = document.getElementById('info_partida');
    

    if (infoPartidaElement) 
    {
        infoPartidaElement.textContent = infoPartida;
    }

    if (juegoActivo) { // Solo se actualiza el tiempo si el juego está en curso
        setTimeout(() => 
        {
            const tiempoActual = new Date();
            tiempoTranscurrido = Math.floor((tiempoActual - tiempoInicio) / 1000);
            actualizarInfoPartida();
        });
    }
}



function nuevaPartida() 
{
    tarjetas = [];
    selecciones = [];
    tablero.innerHTML = "";

    generarTablero();

    tiempoInicio = new Date();
    movimientos = 0;
    aciertos = 0;
    totalParejas = 12;
    
    actualizarInfoPartida(); 
}


function mostrarModal() 
{
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}
  
function cerrarModal() 
{
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}
  
function reiniciarPartida() 
{
    juegoActivo = true;
    cerrarModal();
    nuevaPartida();
}

let juego = document.getElementById("juego");
let inicio = document.getElementById("inicio");
let btn_iniciar = document.getElementById("btn_iniciar");

function mostrarJuego() 
{
    juego.style.display = "block";
    inicio.style.display = "none";
    generarTablero();
}

btn_iniciar.addEventListener('click', mostrarJuego);
