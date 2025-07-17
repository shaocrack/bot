document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('surpriseBtn');
  const input = document.getElementById('nameInput');
  const messageDiv = document.getElementById('personalMessage');
  const song = document.getElementById('birthdaySong');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');
  const balloons = document.querySelector('.balloons');
  const scanText = document.getElementById('scanText');
  const cardsContainer = document.getElementById('cardsContainer');

  // Mensajes para las cartas
  // Mensajes para las cartas
// Mensajes para las cartas
// Mensajes para las cartas
const cardsTexts = [
  'Hola, MB ',
  'En este día tan especial quiero dedicarte unas palabras de la manera que se me da mejor PROGRAMANDO XD:',
  '¡Feliz cumpleaños! ',
  'Que cada sueño que guardas en tu corazón encuentre el camino para hacerse realidad.',
  'Nunca dejes de luchar por lo que deseas, ni permitas que las dificultades apaguen tu luz.',
  'Si algún día te sientes triste, solo mira hacia atrás y recuerda todo lo que has logrado.',
  'Porque cada logro —grande o pequeño— es una victoria que te ha traído hasta aquí.',
  'Sigue avanzando, sigue triunfando, y conviértete en la mejor en lo que haces.',
  'El mundo necesita esa fuerza y autenticidad que llevas dentro.',
  '¡Brindemos por tu vida, por tu camino y por todo lo que aún está por venir! '
];




  btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) {
      alert('Por favor ingresa tu nombre ');
      return;
    }

    // Iniciar escaneo con barra de progreso
    startScan(name);
  });

  function startScan(name) {
    let percent = 0;
    progressFill.style.width = '0%';
    progressBar.classList.remove('hidden');
    scanText.classList.remove('hidden');
    messageDiv.classList.add('hidden');
    btn.disabled = true;

    const updateText = (p) => {
      progressPercent.textContent = p + '%';
      if (p < 20) scanText.textContent = 'Espera un momento...';
      else if (p < 60) scanText.textContent = 'Estoy escaneando tu bello nombre';
    };

    updateText(0);

    const interval = setInterval(() => {
      percent += 1;
      progressFill.style.width = percent + '%';
      updateText(percent);

      if (percent === 75) {
        clearInterval(interval);
        scanText.textContent = 'Es el nombre de una bandida :V ';
        setTimeout(() => {
          resumeScan();
        }, 2000);
      }

      if (percent >= 100) {
        clearInterval(interval);
        finishScan(name);
      }
    }, 120);

    function resumeScan() {
      const interval2 = setInterval(() => {
        percent += 1;
        progressFill.style.width = percent + '%';
        updateText(percent);
        if (percent >= 100) {
          clearInterval(interval2);
          finishScan(name);
        }
      }, 100);
    }
  }

  function finishScan(name) {
    scanText.textContent = 'Ah mira es tu cumpleaños, según mi base de datos :O ';
    setTimeout(() => {
      // Ocultar contenedor de escáner completo
      document.getElementById('scannerContainer').classList.add('hidden');
      progressBar.classList.add('hidden');
      scanText.classList.add('hidden');

      // Mostrar mensaje personalizado
      messageDiv.textContent = `${name}, lee esto :D`;
      messageDiv.classList.remove('hidden');

      // Disparar celebraciones
      // Mostrar globos
      balloons.classList.remove('hidden');
      triggerCelebration();
    }, 2000);
  }

  function triggerCelebration() {
    // Confeti animado
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });
    // Reproducir canción
    if (song) {
      song.currentTime = 0;
      song.play();
    }

    // Mostrar contenedor de cartas y secuencia
    cardsContainer.classList.remove('hidden');
    showCardsSequence();

    btn.disabled = false;

  function showCardsSequence() {
    cardsContainer.innerHTML = '';
    let index = 0;

    const createCard = (text) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = text;
      return card;
    };

    const showNextCard = () => {
      if (index >= cardsTexts.length) {
        showVideoCard();
        return;
      }

      const card = createCard(cardsTexts[index]);
      cardsContainer.appendChild(card);

      // Forzar reflow para activar transición
      void card.offsetWidth;
      card.classList.add('show');

      // Ocultar después de 5s
      setTimeout(() => {
        card.classList.remove('show');
        setTimeout(() => {
          card.remove();
          index++;
          showNextCard();
        }, 400); // esperar transición de salida
      }, 5000);
    };

    showNextCard();

    // --- Video y mensajes adicionales ---
    function showVideoCard() {
      cardsContainer.innerHTML = '';
      const videoWrapper = document.createElement('div');
      videoWrapper.style.width = '100%';
      videoWrapper.style.display = 'flex';
      videoWrapper.style.flexDirection = 'column';
      videoWrapper.style.alignItems = 'center';
      videoWrapper.style.gap = '1rem';

      const rememberP = document.createElement('p');
      rememberP.className = 'card show';
      rememberP.textContent = 'Me olvidaba';

      const video = document.createElement('video');
      video.src = 'cua.mp4';
      video.controls = true;
      video.autoplay = true;
      video.style.maxWidth = '70%';
      video.style.borderRadius = '10px';
      video.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';

      const msgP = document.createElement('p');
      msgP.className = 'card show';
      msgP.innerHTML = 'De tantas fotos y videos<br><br>esta es la mejor<br><br>¡Vuélvete millonaria para que pagues el pasaje de todos!';

      const finalP = document.createElement('p');
      finalP.className = 'card';
      finalP.textContent = 'FELIZ CUMPLE SAPITA, TE LO DESEA SHAO';

      videoWrapper.appendChild(rememberP);
      videoWrapper.appendChild(video);
      videoWrapper.appendChild(msgP);
      videoWrapper.appendChild(finalP);
      cardsContainer.appendChild(videoWrapper);

      // Mostrar saludo final después de 5s
      setTimeout(() => {
        finalP.classList.add('show');
      }, 5000);
    }
  }
}
});
