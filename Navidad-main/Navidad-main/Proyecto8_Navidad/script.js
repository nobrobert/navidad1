let audioElement = new Audio('sound/MusicaNavideña.mp3');

function reproducirCancion() {
    audioElement.play();
}

function pausarCancion() {
    audioElement.pause();
}

function obtenerTiempoFaltante(fechaLimite) {
    let ahora = new Date();
    tiempoFaltante = (new Date(fechaLimite) - ahora + 1000) / 1000;
    segundosFaltantes = ('0' + Math.floor(tiempoFaltante % 60)).slice(-2);
    minutosFaltantes = ('0' + Math.floor(tiempoFaltante / 60 % 60)).slice(-2);
    horasFaltantes = ('0' + Math.floor(tiempoFaltante / 3600 % 24)).slice(-2);
    diasFaltantes = ('0' + Math.floor(tiempoFaltante / (3600 * 24))).slice(-2);

    return {
        segundosFaltantes,
        minutosFaltantes,
        horasFaltantes,
        diasFaltantes,
        tiempoFaltante,
    }
}

function cuentaRegresiva(tiempoFaltante, dias, horas, minutos, segundos, FelizNavidad, mensaje) {
    const d = document.getElementById(dias);
    const h = document.getElementById(horas);
    const m = document.getElementById(minutos);
    const s = document.getElementById(segundos);
    const e = document.getElementById(FelizNavidad);

    const tiempoActual = setInterval(() => {
        let t = obtenerTiempoFaltante(tiempoFaltante);

        if (t.tiempoFaltante > 0) {
            e.innerHTML = "Faltan para navidad";
            playButton.disabled = true;
            pauseButton.disabled = true;
            d.querySelector('.tiempo .valor').innerHTML = `${t.diasFaltantes}`;
            h.querySelector('.tiempo .valor').innerHTML = `${t.horasFaltantes}`;
            m.querySelector('.tiempo .valor').innerHTML = `${t.minutosFaltantes}`;
            s.querySelector('.tiempo .valor').innerHTML = `${t.segundosFaltantes}`;    
            
        } else {
            playButton.disabled = false;
            pauseButton.disabled = false;
            e.innerHTML = mensaje;
            playButton.classList.add('playing');
            pauseButton.classList.add('playing');
            papanoelQuieto.classList.add("on");
            d.querySelector('.tiempo .valor').innerHTML = `00`;
            h.querySelector('.tiempo .valor').innerHTML = `00`;
            m.querySelector('.tiempo .valor').innerHTML = `00`;
            s.querySelector('.tiempo .valor').innerHTML = `00`;
        }

        if (t.tiempoFaltante < 0) {
            clearInterval(tiempoActual);
        }
    }, 1000);
}

cuentaRegresiva('Nov 17 2023 10:28:00 GMT-0500', 'dia', 'hora', 'minuto', 'segundo', 'felizNavidad', '¡Feliz Navidad!');

document.getElementById('playButton').addEventListener('click', function () {
    if (!this.disabled) {
        reproducirCancion();
    }
});

document.getElementById('pauseButton').addEventListener('click', function () {
    if (!this.disabled) {
        pausarCancion();
    }
});