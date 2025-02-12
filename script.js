let countdownInterval = null;

function iniciarCuentaRegresiva() {
    if (countdownInterval !== null) {
        clearInterval(countdownInterval);
    }

    document.getElementById("message").textContent = "";
    document.getElementById("countdownDisplay").textContent = "";

    const timeInput = document.getElementById("targetTime").value;
    if (!timeInput) {
        alert("Por favor, ingrese una hora válida.");
        return;
    }

    document.getElementById("instructionText").style.display = "none";

    const partes = timeInput.split(":");
    const horaObjetivo = parseInt(partes[0], 10);
    const minutoObjetivo = parseInt(partes[1], 10);

    const ahora = new Date();
    const objetivo = new Date();
    objetivo.setHours(horaObjetivo, minutoObjetivo, 0, 0);

    if (objetivo <= ahora) {
        objetivo.setDate(objetivo.getDate() + 1);
    }

    countdownInterval = setInterval(function () {
        const ahora = new Date();
        const diferencia = objetivo - ahora;

        if (diferencia <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdownDisplay").textContent = "00:00:00";
            document.getElementById("message").textContent = "¡Tiempo terminado!";
            reproducirBeep();
        } else {
            let totalSegundos = Math.floor(diferencia / 1000);
            const horas = Math.floor(totalSegundos / 3600);
            totalSegundos %= 3600;
            const minutos = Math.floor(totalSegundos / 60);
            const segundos = totalSegundos % 60;

            const formato =
                String(horas).padStart(2, '0') + ":" +
                String(minutos).padStart(2, '0') + ":" +
                String(segundos).padStart(2, '0');

            document.getElementById("countdownDisplay").textContent = formato;
        }
    }, 1000);
}

document.getElementById("startBtn").addEventListener("click", iniciarCuentaRegresiva);

document.getElementById("targetTime").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        iniciarCuentaRegresiva();
    }
});

function reproducirBeep() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
    oscillator.stop(ctx.currentTime + 1);
}
