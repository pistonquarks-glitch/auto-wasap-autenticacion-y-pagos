// Pistón Auto — interacciones ligeras, sin dependencias.
(function () {
  'use strict';

  // Año dinámico
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Menú móvil
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // FAQ accordion
  var questions = document.querySelectorAll('.faq-q');
  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      var panel = btn.nextElementSibling;
      if (panel && panel.classList.contains('faq-a')) panel.classList.toggle('open', !open);
    });
  });
  // Abrir el primero por defecto
  if (questions.length) questions[0].click();

  // Formulario demo → WhatsApp con mensaje prellenado
  var form = document.getElementById('demoForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('demoName').value || '').trim();
      var biz = (document.getElementById('demoBiz').value || '').trim();
      var vol = document.getElementById('demoVolume').value || 'aún no definido';
      if (!name || !biz) return;
      var msg = 'Hola Pistón Quarks, soy ' + name + ' de ' + biz +
        ' y quiero una demo de Pistón Auto (autenticación de pagos por WhatsApp). Comprobantes mensuales estimados: ' + vol + '.';
      var url = 'https://wa.me/51930640071?text=' + encodeURIComponent(msg);
      window.open(url, '_blank', 'noopener');
      form.reset();
    });
  }

  // Pulse sutil del spark cada 4s (ya anima con CSS; solo ajusta ritmo si reduce motion)
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var spark = document.getElementById('spark');
    if (spark) spark.style.animation = 'none';
  }
})();
