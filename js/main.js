  document.getElementById('year').textContent = new Date().getFullYear();

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));

  const navInner = document.getElementById('nav-inner');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navInner.classList.add('bg-ink/90', 'backdrop-blur', 'border-b', 'border-paper/10');
    } else {
      navInner.classList.remove('bg-ink/90', 'backdrop-blur', 'border-b', 'border-paper/10');
    }
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';
  }, { passive: true });

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const closeMenu = document.getElementById('close-menu');
  function openMenu() {
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenuFn() {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', openMenu);
  closeMenu.addEventListener('click', closeMenuFn);
  document.querySelectorAll('[data-mnav]').forEach((a) => a.addEventListener('click', closeMenuFn));

  const form = document.getElementById('proposal-form');
  const steps = Array.from(form.querySelectorAll('.step'));
  const total = steps.length;
  let current = 1;
  const btnNext = document.getElementById('btn-next');
  const btnBack = document.getElementById('btn-back');
  const stepLabel = document.getElementById('step-label');
  const stepFill = document.getElementById('step-fill');
  const formError = document.getElementById('form-error');

  function showStep(n) {
    steps.forEach((s) => s.classList.toggle('active', Number(s.dataset.step) === n));
    stepLabel.textContent = 'STEP ' + String(n).padStart(2, '0') + ' // ' + String(total).padStart(2, '0');
    stepFill.style.width = (n / total * 100) + '%';
    btnBack.disabled = n === 1;
    btnNext.textContent = n === total ? 'REQUEST A PROPOSAL →' : 'Next →';
    formError.classList.add('hidden');
  }

  function validateStep(n) {
    const stepEl = steps[n - 1];
    const required = stepEl.querySelector('[required]');
    if (required && !required.value.trim()) return false;
    const group = stepEl.querySelector('[data-group]');
    if (group) {
      const name = group.dataset.group;
      const checked = form.querySelector('input[name="' + name + '"]:checked');
      if (!checked) return false;
    }
    return true;
  }

  function collectAnswers() {
    const get = (id) => (document.getElementById(id) ? document.getElementById(id).value.trim() : '');
    const radio = (name) => { const el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : '—'; };
    return {
      name: get('q-name') || '—',
      company: get('q-company') || '—',
      service: radio('service'),
      stage: radio('stage'),
      timeline: radio('timeline'),
      refs: get('q-refs') || '—',
      source: radio('source'),
      desc: get('q-desc') || '—',
      contact: get('q-contact') || '—',
    };
  }

  function submitForm() {
    const a = collectAnswers();
    form.classList.add('hidden');
    document.getElementById('form-success').classList.remove('hidden');

    const bodyLines = [
      'Name: ' + a.name,
      'Company: ' + a.company,
      'Service needed: ' + a.service,
      'Business stage: ' + a.stage,
      'Timeline: ' + a.timeline,
      'References: ' + a.refs,
      'Found via: ' + a.source,
      '',
      'Project description:',
      a.desc,
      '',
      'Contact: ' + a.contact,
    ].join('\n');

    const mailto = 'mailto:mohamed336699as55@gmail.com'
      + '?subject=' + encodeURIComponent('New Project Inquiry — ' + a.name)
      + '&body=' + encodeURIComponent(bodyLines);
    document.getElementById('mailto-link').href = mailto;

    const waText = 'New project inquiry from ' + a.name + ' — ' + a.service + ', timeline: ' + a.timeline + '. Sending the full brief by email too.';
    document.getElementById('wa-link').href = 'https://wa.me/201020735937?text=' + encodeURIComponent(waText);
  }

  btnNext.addEventListener('click', () => {
    if (!validateStep(current)) {
      formError.classList.remove('hidden');
      return;
    }
    if (current === total) {
      submitForm();
      return;
    }
    current += 1;
    showStep(current);
  });

  btnBack.addEventListener('click', () => {
    if (current === 1) return;
    current -= 1;
    showStep(current);
  });

  form.addEventListener('submit', (e) => e.preventDefault());

  showStep(current);
