document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const themeToggle = document.getElementById('darkModeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const backToTop = document.getElementById('backToTop');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setNavState = (open) => {
    body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  navToggle.addEventListener('click', () => setNavState(!body.classList.contains('nav-open')));
  navLinks.forEach((link) => link.addEventListener('click', () => setNavState(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setNavState(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setNavState(false); }, { passive: true });

  const applyTheme = (theme) => {
    const dark = theme === 'dark';
    body.classList.toggle('dark-mode', dark);
    themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  const savedTheme = localStorage.getItem('portfolio-theme');
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(savedTheme || preferredTheme);
  themeToggle.addEventListener('click', () => {
    const next = body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
    applyTheme(next);
  });

  document.getElementById('currentYear').textContent = new Date().getFullYear();

  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const handleScroll = () => backToTop.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
});
