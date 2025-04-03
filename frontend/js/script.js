document.addEventListener('DOMContentLoaded', function () {
  // Мобильное меню
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  menuToggle.addEventListener('click', function () {
    this.classList.toggle('active');
    navbar.classList.toggle('active');
  });

  // Закрытие меню при клике на пункт
  document.querySelectorAll('.navbar a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navbar.classList.remove('active');
    });
  });

  // Изменение шапки при скролле
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 100);
  });

  // Плавный скролл
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') return;

      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    });
  });

  // Инициализация частиц
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.2,
          width: 1,
        },
        move: { enable: true, speed: 2, direction: 'none', random: true },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
        },
      },
    });
  }

  // Анимация при скролле
  const animateOnScroll = function () {
    document.querySelectorAll('[data-aos]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add('aos-animate');
      }
    });
  };

  // Назначаем атрибуты для анимации
  document.querySelectorAll('.service, .section-title').forEach((el, i) => {
    el.setAttribute('data-aos', 'fade-up');
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // Обработка формы
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(leadForm);
      const data = Object.fromEntries(formData.entries());
      const messageEl = document.getElementById('formMessage');

      try {
        const response = await fetch('/api/leads/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') || '',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        messageEl.textContent =
          result.message ||
          (response.ok ? 'Заявка отправлена!' : 'Ошибка отправки');
        messageEl.style.color = response.ok ? '#4CAF50' : '#F44336';

        if (response.ok) leadForm.reset();
      } catch (error) {
        messageEl.textContent = 'Ошибка соединения';
        messageEl.style.color = '#F44336';
      }
      messageEl.style.display = 'block';
    });
  }

  // Функция для получения CSRF токена
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }
});
