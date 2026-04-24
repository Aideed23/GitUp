(function () {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navList = document.querySelector('.nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', navList.classList.contains('open') ? 'true' : 'false');
    });
  }

  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach((link) => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });

  const yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('show'));
  }

  function bindSimpleForm(formId, message) {
    const form = document.getElementById(formId);
    if (!form) return;

    const success = form.querySelector('.form-success');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      form.reset();
      if (success) {
        success.textContent = message;
        success.classList.add('visible');
      }
    });
  }

  bindSimpleForm('bookingForm', 'Ride request submitted. A dispatcher will contact you shortly.');
  bindSimpleForm('contactForm', 'Thank you. Your message has been sent to our team.');
})();
