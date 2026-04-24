const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPath) link.classList.add('active');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

function bindForm(id, message) {
  const form = document.getElementById(id);
  if (!form) return;
  const feedback = form.querySelector('.form-feedback');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (feedback) {
      feedback.textContent = message;
      feedback.classList.add('visible');
    }
    form.reset();
  });
}

bindForm('rideRequestForm', 'Request received. Our dispatch team will contact you shortly.');
bindForm('contactForm', 'Message received. Thank you for contacting Yellow Star Express Taxi.');
