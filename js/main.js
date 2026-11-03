// Script Principal - Portfólio João Carlos Vieira

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Relógio em Tempo Real (Florianópolis / GMT-3)
  function updateClock() {
    const clockEl = document.getElementById('live-clock');
    if (clockEl) {
      const now = new Date();
      // Formata no padrão de Brasília / Florianópolis
      const timeStr = now.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      clockEl.textContent = `${timeStr} (GMT-3)`;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 3. Filtro Interativo de Projetos
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover classe active de todos
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Copiar E-mail para Área de Transferência com Feedback Visual
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailToast = document.getElementById('copy-toast');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'jcvcaiovieira@edu.univali.br';
      navigator.clipboard.writeText(email).then(() => {
        if (copyEmailToast) {
          copyEmailToast.classList.remove('opacity-0', 'pointer-events-none');
          copyEmailToast.classList.add('opacity-100');
          setTimeout(() => {
            copyEmailToast.classList.add('opacity-0', 'pointer-events-none');
            copyEmailToast.classList.remove('opacity-100');
          }, 2500);
        }
      });
    });
  }

  // 5. Menu Mobile Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 6. Highlight Ativo de Navegação ao Rolar a Página
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    desktopNavLinks.forEach(link => {
      link.classList.remove('text-cyan-400', 'font-semibold');
      link.classList.add('text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400', 'font-semibold');
        link.classList.remove('text-slate-300');
      }
    });
  });

  // 7. Easter Egg Musical: Efeito Sonoro em Saxofone (Síntese Web Audio)
  const saxButton = document.getElementById('sax-easter-egg');
  if (saxButton) {
    saxButton.addEventListener('click', () => {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // Tocar acorde suave simulando nota de sax
        const notes = [261.63, 329.63, 392.00, 523.25]; // Dó Maior
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.12);
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.12 + 0.8);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(audioCtx.currentTime + i * 0.12);
          osc.stop(audioCtx.currentTime + i * 0.12 + 0.8);
        });

        // Feedback no botão
        const originalText = saxButton.innerHTML;
        saxButton.innerHTML = '🎷 Tocando nota...';
        setTimeout(() => {
          saxButton.innerHTML = originalText;
          if (window.lucide) window.lucide.createIcons();
        }, 1200);
      } catch (e) {
        console.log('Web Audio não suportado ou bloqueado:', e);
      }
    });
  }
});
