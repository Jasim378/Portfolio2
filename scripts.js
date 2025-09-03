document.addEventListener('DOMContentLoaded', () => {
  // --- Dark Mode Logic ---
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const moonIcon = darkModeToggle.querySelector('i');
  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
  }
  darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
  function enableDarkMode() {
    body.classList.add('dark-mode');
    moonIcon.classList.remove('fa-moon');
    moonIcon.classList.add('fa-sun');
    localStorage.setItem('darkMode', 'enabled');
  }
  function disableDarkMode() {
    body.classList.remove('dark-mode');
    moonIcon.classList.remove('fa-sun');
    moonIcon.classList.add('fa-moon');
    localStorage.setItem('darkMode', 'disabled');
  }

  // --- Back to Top Button ---
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Typing Effect Logic ---
  const typingText = document.getElementById('typing-text');
  const phrases = [
    'Aspiring Software Developer',
    'Learning. Growing. Building..',
    'Creative Problem Solver',
  ];
  let phraseIndex = 0,
    charIndex = 0,
    isDeleting = false;
  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    let typeSpeed = isDeleting ? 100 : 150;
    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(type, typeSpeed);
  }
  type();

  // --- Scroll Animation for Sections ---
  const hiddenElements = document.querySelectorAll('.hidden');
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.1 }
  );
  hiddenElements.forEach((el) => scrollObserver.observe(el));

  // --- Navbar Link Highlighting on Scroll ---
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.navbar ul li a');
  const navObserverOptions = { rootMargin: '-40% 0px -60% 0px' };
  const navObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, navObserverOptions);
  sections.forEach((section) => {
    navObserver.observe(section);
  });

  // --- 3D Tilt Effect for Cards ---
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = card.offsetWidth / 2;
      const centerY = card.offsetHeight / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
});