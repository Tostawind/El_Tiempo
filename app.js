// ================================================================================
// === D O M ===

// BUTTONS
const btn_ajustes = document.getElementById('btn-ajustes');
const btn_cerrar = document.getElementById('btn-cerrar');
const ajustes = document.getElementById('ajustes');
const btn_buscar = document.getElementById('btn-buscar');

// INPUT
const buscador = document.getElementById('buscador');

// OUTPUT
const ciudad = document.getElementById('ciudad');
const temperatura = document.getElementById('temperatura');
const icono = document.getElementById('simbolo-wrapper');
const temp_ajustes = document.getElementById('temp-ajustes');
const descripcion_ajustes = document.getElementById('descripcion-ajustes');

const sol = document.getElementById('sol');
const nube = document.getElementById('nube');
const lluvia = document.getElementById('lluvia');


// ================================================================================
// === E V E N T S ===

btn_ajustes.addEventListener('click', () => {
    ajustes.style.display = 'flex';
})

btn_cerrar.addEventListener('click', () => {
    ajustes.style.display = 'none';
})

btn_buscar.addEventListener('click', () => {
    buscar(buscador.value);
})



// ================================================================================
// A P I

const api = {
    key: '85f9a2e735aaae8a61210e47ed7781d7',
    url: `https://api.openweathermap.org/data/2.5/weather`
  }


// Opciones de datos (en ingles, si se cambia API a español hay que cambiarlo...)
const sol_opciones = ["Clear"];
const nube_opciones = ["Clouds"];
const lluvia_opciones = ["Thunderstorm", "Drizzle", "Rain", "Snow"];


// FUNCIÓN: Buscar ciudad y traer datos
async function buscar(city) {
  try {
    const response = await fetch(`${api.url}?q=${city}&appid=${api.key}&lang=en`); // English
    const data = await response.json();

    // Ciudad (Ajustes)
    ciudad.innerHTML = `${data.name}, ${data.sys.country}`;
    
    // Temperatura
    temperatura.innerHTML = `${cambiarCentigrados(data.main.temp)} Cº`;

    // Obtener descripción para icono
    let descripcion = data.weather[0].main;
    let descripcion_especifica = data.weather[0].description;

    descripcion_ajustes.innerHTML = `Descripción: ${descripcion_especifica}`;
    temp_ajustes.innerHTML = `Temperatura: ${cambiarCentigrados(data.main.temp)} Cº`;

    if(nube_opciones.includes(descripcion)) {
      //NUBES
      sol.style.display = "none";
      lluvia.style.display = "none";
      nube.style.display = "flex";

    } else if (lluvia_opciones.includes(descripcion)) {
      // LLUVIA
      sol.style.display = "none";
      lluvia.style.display = "flex";
      nube.style.display = "none";
    } else if (sol_opciones.includes(descripcion)) {
      // SOL
      sol.style.display = "flex";
      lluvia.style.display = "none";
      nube.style.display = "none";
    } else {
        // NADA
        sol.style.display = "none";
        lluvia.style.display = "none";
        nube.style.display = "none";
    }
 } catch (err) { 
    console.log(err);
    buscador.value = "Error...";
  }
}

// FUNCIÓN: Conversión KELVIN a CENTIGRADOS
function cambiarCentigrados(kelvin) {
  return Math.round(kelvin - 273.15);
}


// == DEFAULT ==
buscar('Palma');

// ================================================================================
// H O R A
let reloj = () => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let period = "AM";
    /* if (hrs == 0) {
      hrs = 12;
    } else if (hrs >= 12) {
      hrs = hrs - 12;
      period = "PM";
    } */
    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
  
    /* let time = `${hrs}:${mins}:${secs}:${period}`; */
    let time = `${hrs}:${mins}`;
    document.getElementById("hora").innerText = time;
    setTimeout(reloj, 1000);
  };
  
  reloj();