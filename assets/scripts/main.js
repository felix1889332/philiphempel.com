document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for fade-up effects
  const animateOnScroll = () => {
    const reveals = document.querySelectorAll('.fade-up, .is-visible');
    
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      const elementBottom = reveal.getBoundingClientRect().bottom;
      
      if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
        reveal.classList.add('is-visible');
        reveal.classList.remove('fade-up');
        reveal.style.opacity = 1;
        reveal.style.transform = 'translateY(0)';
      }
    });
  };

  // Trigger on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Add hover effects to nav links
  document.querySelectorAll('nav a').forEach(link => {
    let hoverTimeout;
    
    link.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      link.style.transform = 'scale(1.03)';
      link.style.transition = 'all 0.3s ease';
      link.style.position = 'relative';
      link.style.zIndex = '10';
      link.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.08)';
    });
    
    link.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        link.style.transform = 'scale(1)';
        link.style.boxShadow = 'none';
      }, 300);
    });
  });

  // Add dark mode toggle
  const html = document.documentElement;
  const toggle = document.querySelector('.dark-mode-toggle');
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  });

  // Add smooth loading
  window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
    document.body.style.opacity = 1;
  });
});