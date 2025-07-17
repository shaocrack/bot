document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('surpriseBtn');
  const input = document.getElementById('nameInput');
  const messageDiv = document.getElementById('personalMessage');
  const song = document.getElementById('birthdaySong');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const scanText = document.getElementById('scanText');
  const cardsContainer = document.getElementById('cardsContainer');

  // Mensajes para las cartas
  const cardsTexts = [
    '¡Que tus sueños se hagan realidad! 💫',
    'Ríe, ama y disfruta cada momento 🥳',
    'Hoy es tu día especial, ¡aprovéchalo! 🎁',
    'Gracias por ser increíble 🙌',
    '¡Brindemos por otro año lleno de aventuras! 🍾'
  ];

  btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) {
      alert('Por favor ingresa tu nombre 🙏');
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
        scanText.textContent = 'Es el nombre de una bandida 🤭';
        setTimeout(() => {
          resumeScan();
        }, 2000);
      }

      if (percent >= 100) {
        clearInterval(interval);
        finishScan(name);
      }
    }, 50);

    function resumeScan() {
      const interval2 = setInterval(() => {
        percent += 1;
        progressFill.style.width = percent + '%';
        updateText(percent);
        if (percent >= 100) {
          clearInterval(interval2);
          finishScan(name);
        }
      }, 40);
    }
  }

  function finishScan(name) {
    scanText.textContent = 'Ah mira es tu cumpleaños, según mi base de datos 🎂';
    setTimeout(() => {
      // Ocultar sección de entrada
      input.parentElement.classList.add('hidden');
      progressBar.classList.add('hidden');
      scanText.classList.add('hidden');

      // Mostrar mensaje personalizado
      messageDiv.textContent = `${name}, lee esto :D`;
      messageDiv.classList.remove('hidden');

      // Disparar celebraciones
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

    // Mostrar secuencia de cartas
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
      if (index >= cardsTexts.length) return;

      const card = createCard(cardsTexts[index]);
      cardsContainer.appendChild(card);

      // Forzar reflow para activar transición
      void card.offsetWidth;
      card.classList.add('show');

      // Ocultar después de 3s
      setTimeout(() => {
        card.classList.remove('show');
        setTimeout(() => {
          card.remove();
          index++;
          showNextCard();
        }, 600); // esperar transición de salida
      }, 3000);
    };

    showNextCard();
  }
}
});
