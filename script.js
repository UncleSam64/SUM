// ---------------------------------------------------------------------------
// Company contact details — PLACEHOLDERS. Replace before publishing.
// phone / whatsapp: digits only, with country code (Mexico = 52).
// ---------------------------------------------------------------------------
const CONFIG = {
  phone: '526146658199',
  phoneDisplay: '614 665 8199',
  whatsapp: '526146658199',
  email: 'contacto@sum.com.mx',
  address: 'Manuel García García 10505, Deportistas, 31125 Chihuahua, Chih.',
  hours: 'Lunes a viernes: 8:00 a.m. a 6:00 p.m.\nSábado: 8:00 a.m. a 2:00 p.m.',
  // Years in operation. Set the founding year (e.g. 2012) to show "N años en operación"; leave null to hide.
  foundedYear: 1992,
  // Sections marked data-sample hold EXAMPLE content (mission/vision/values, team, cases, blog, jobs).
  // Keep true while reviewing the design; set false to hide them all until you replace them with real content
  // (then remove the data-sample attribute from each block you fill in).
  showSamples: true,
  // Map: type the address as you would in Google Maps (e.g. 'Calle X 123, Chihuahua'). Empty hides the map.
  mapQuery: 'Manuel García García 10505, Deportistas, 31125 Chihuahua, Chihuahua, México',
};

(function () {
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const waText = (t) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;

  // Fill contact links from CONFIG
  $$('[data-tel]').forEach((a) => {
    a.href = `tel:+${CONFIG.phone}`;
    if (a.classList.contains('btn') === false) a.textContent = CONFIG.phoneDisplay;
  });
  $$('[data-wa]').forEach((a) => {
    a.href = waText('Hola, me gustaría solicitar información sobre sus servicios de montacargas.');
  });
  $$('[data-email]').forEach((a) => {
    a.href = `mailto:${CONFIG.email}`;
    a.textContent = CONFIG.email;
  });
  const optional = (sel, value) =>
    $$(sel).forEach((el) => {
      el.textContent = value;
      if (!value) el.closest('li').hidden = true;
    });
  optional('[data-address]', CONFIG.address);
  optional('[data-hours]', CONFIG.hours);
  // Example content: hide everything marked data-sample when showSamples is false
  if (!CONFIG.showSamples) $$('[data-sample]').forEach((el) => { el.hidden = true; });

  // Map
  const mapBox = document.querySelector('[data-map]');
  if (mapBox && CONFIG.mapQuery) {
    mapBox.innerHTML = `<iframe title="Ubicación en el mapa" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(CONFIG.mapQuery)}&output=embed"></iframe>`;
    mapBox.hidden = false;
  }

  // CV link
  $$('[data-mail-cv]').forEach((a) => { a.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Postulación')}`; });

  // Soft reveal of sections on scroll (skipped for reduced motion)
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    $$('main > section:not(.hero) .wrap > *').forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }

  // Years in operation
  if (CONFIG.foundedYear) {
    const n = new Date().getFullYear() - CONFIG.foundedYear;
    $$('[data-years]').forEach((el) => { el.textContent = n; });
    $$('[data-years-box]').forEach((el) => { el.hidden = false; });
  }

  // Product photo placeholders when an image file is missing
  const forklift = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" aria-hidden="true"><path d="M10 50V26h18l6 10h8v14M42 50V8M42 20h10M42 32h10"/><circle cx="18" cy="52" r="5" fill="currentColor"/><circle cx="38" cy="52" r="5" fill="currentColor"/></svg>';
  $$('img[data-ph]').forEach((img) => {
    const swap = () => {
      const ph = document.createElement('div');
      ph.className = 'prod__ph';
      ph.innerHTML = `${forklift}<span>Foto de ${img.dataset.ph} pendiente</span>`;
      img.replaceWith(ph);
    };
    if (img.complete && img.naturalWidth === 0) swap();
    else img.addEventListener('error', swap, { once: true });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Logo links scroll to the very top of the page
  $$('[data-top]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', location.pathname);
    })
  );

  // Clients carousel: endless marquee. Items are duplicated so the loop has no jump.
  const track = document.querySelector('.car__track');
  if (track) {
    Array.from(track.children).forEach((li) => {
      const c = li.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.querySelector('img').alt = '';
      track.appendChild(c);
    });
  }

  // Mobile menu
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr').textContent = open ? 'Cerrar menú' : 'Abrir menú';
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  const form = document.getElementById('form');
  if (form) {
    // Quote form -> WhatsApp (or email). No backend needed.
    // One form, three modes: each mode shows only the fields it needs.
    const mailLink = form && form.querySelector('[data-mail-form]');
    const msgLabel = form.querySelector('[data-msg-label]');
    const msgOpt = form.querySelector('[data-msg-opt]');
    const MODES = {
      servicio: { ph: 'Marca, modelo y qué le pasa al equipo', label: 'Mensaje', required: ['nombre', 'telefono', 'mensaje'] },
      equipo: { ph: 'Capacidad (lb), tipo de energía y plazo', label: 'Detalles', required: ['nombre', 'telefono', 'mensaje'] },
      visita: { ph: 'Cuántos montacargas tiene y qué día le conviene', label: 'Comentarios', required: ['nombre', 'telefono', 'ubicacion'] },
    };
    const mode = () => form.modo.value;

    function setMode(m) {
      form.modo.value = m;
      $$('#form [data-mode]').forEach((el) => { el.hidden = el.dataset.mode !== m; });
      const cfg = MODES[m];
      form.mensaje.placeholder = cfg.ph;
      msgLabel.textContent = cfg.label;
      const optional = !cfg.required.includes('mensaje');
      msgOpt.hidden = !optional;
      form.mensaje.required = !optional;
      $$('#form .field.invalid').forEach((f) => {
        f.classList.remove('invalid');
        f.querySelector('.err').hidden = true;
      });
    }
    form.querySelectorAll('[name="modo"]').forEach((r) => r.addEventListener('change', () => setMode(r.value)));
    setMode('servicio');

    // Buttons elsewhere on the page preselect the mode (and its fields)
    $$('[data-modo]').forEach((a) =>
      a.addEventListener('click', () => {
        setMode(a.dataset.modo);
        if (a.dataset.equipo) form.equipo.value = a.dataset.equipo;
        if (a.dataset.operacion) form.operacion.value = a.dataset.operacion;
        if (a.dataset.servicio) form.servicio.value = a.dataset.servicio;
        if (a.dataset.msg && form.mensaje.value.trim() === '') form.mensaje.value = a.dataset.msg;
      })
    );

    const val = (n) => form[n].value.trim();
    const compose = () => {
      const m = mode();
      const who = `Hola, soy ${val('nombre')}${val('empresa') ? ` de ${val('empresa')}` : ''}.\n`;
      const tel = `Teléfono: ${val('telefono')}\n`;
      const msg = val('mensaje');
      if (m === 'servicio') return `${who}Necesito: ${form.servicio.value}\n${tel}Mensaje: ${msg}`;
      if (m === 'equipo') {
        return `${who}Me interesa: ${form.operacion.value} de montacargas\n` +
          (form.equipo.value ? `Marca: ${form.equipo.value}\n` : '') + `${tel}Detalles: ${msg}`;
      }
      return `${who}Quiero agendar una visita a mi negocio.\nUbicación: ${val('ubicacion')}\n${tel}` + (msg ? `Comentarios: ${msg}` : '');
    };
    const subject = () => ({ servicio: 'Solicitud de servicio', equipo: 'Cotización de renta o compra', visita: 'Solicitud de visita' })[mode()];

    function validate() {
      let ok = true;
      ['nombre', 'telefono', 'ubicacion', 'mensaje'].forEach((name) => {
        const field = form[name].closest('.field');
        const needed = MODES[mode()].required.includes(name);
        const bad = needed && val(name) === '';
        field.classList.toggle('invalid', bad);
        field.querySelector('.err').hidden = !bad;
        form[name].setAttribute('aria-invalid', String(bad));
        if (bad && ok) { form[name].focus(); ok = false; }
      });
      return ok;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;
      window.open(waText(compose()), '_blank', 'noopener');
    });

    mailLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (!validate()) return;
      location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject())}&body=${encodeURIComponent(compose())}`;
    });
  }
})();
