const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const year = document.getElementById('year');
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalFeatures = document.getElementById('modalFeatures');
const modalNote = document.getElementById('modalNote');
const projectButtons = document.querySelectorAll('[data-project]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

const projects = {
  gestionai: {
    category: '// AUTOMATION_SYSTEM',
    title: 'GestionAI',
    description:
      'Sistema de automatización para negocios que permite gestionar pedidos, reservas o citas por WhatsApp mediante IA. Su objetivo es mejorar la atención al cliente, reducir tareas repetitivas y organizar mejor los procesos del negocio.',
    tech: ['React', 'TypeScript', 'Node.js', 'Firebase', 'WhatsApp API', 'APIs de IA', 'Automatización'],
    features: [
      'Diseño de flujos conversacionales para atender clientes por WhatsApp.',
      'Gestión de pedidos con validación de datos importantes del cliente.',
      'Recepción y visualización de comprobantes de pago enviados por el cliente.',
      'Manejo de domicilio, horarios de atención y notas internas para el negocio.',
      'Panel administrativo para consultar pedidos, actualizar estados y organizar la operación.',
      'Estructura pensada para adaptarse a restaurantes, barberías, salones de belleza y otros negocios.'
    ],
    note:
      'Este es el proyecto más fuerte del portafolio porque combina producto real, automatización, IA y lógica de negocio aplicada a negocios.'
  },
  reseryapp: {
    category: '// WEB_AND_MOBILE_APP',
    title: 'Reseryapp',
    description:
      'Aplicación web y APK desarrollada como proyecto de grado para la reserva de mesas en restaurantes. Permite explorar restaurantes mediante una interfaz tipo catálogo, consultar información del negocio y realizar reservas de forma intuitiva.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Mysql', 'Flutter', 'Dart', 'APK'],
    features: [
      'Interfaz tipo catálogo para explorar restaurantes y consultar información del negocio.',
      'Sistema de registro e inicio de sesión de usuarios.',
      'Flujo para reserva de mesas.',
      'Diseño de base de datos relacional para usuarios, restaurantes y reservas.',
      'Versión web y versión móvil en formato APK.'
    ],
    note:
  `Proyecto propio desarrollado como trabajo de grado junto a mi compañero Nixon David Parada Carvajal 
  (<a 
    href="https://www.instagram.com/nixonparada/" 
    target="_blank" 
    rel="noreferrer" 
    class="inline-glitch-link" 
    data-text="@nixonparada"
  >@nixonparada</a>). 
  Reseryapp fue registrado ante la Dirección Nacional de Derecho de Autor de Colombia, respaldando su autoría como obra propia. 
  Aunque el hosting original ya no está activo, conservo el código fuente y existe un video promocional donde se muestra su funcionamiento, propuesta visual y flujo de reservas.`,
  },
  ucc: {
  category: '// EVENT_MANAGEMENT_SYSTEM',
  title: 'Sistema de eventos universitarios',
  description:
    'Sistema web desarrollado para la gestión de eventos universitarios. Permite publicar eventos, registrar asistentes, controlar cupos, enviar confirmaciones por correo y validar el ingreso mediante códigos QR.',

  tech: [
    'PHP',
    'MySQL',
    'JavaScript',
    'HTML',
    'CSS',
    'PHPMailer',
    'phpqrcode',
    'Dompdf'
  ],

  features: [
    'Registro público de asistentes con validaciones de datos.',
    'Generación de códigos QR únicos para validar el ingreso al evento.',
    'Envío automático de correos de confirmación mediante PHPMailer.',
    'Panel administrativo para crear, editar, publicar y finalizar eventos.',
    'Sistema de roles para administrador, anfitrión y auxiliar.',
    'Control de cupos, lista de espera y promoción automática cuando se libera un cupo.',
    'Módulo de check-in para registrar asistencias mediante QR o código.',
    'Exportación de información de eventos e inscritos en PDF.'
  ],

  note:
    'Versión funcional entregada para continuidad del equipo. El proyecto fue desarrollado en un contexto universitario y se presenta de forma neutral en el portafolio, evitando depender de logos o identidad institucional oficial.'
}
};

year.textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');

    const targetId = link.getAttribute('href');
    runHackScroll(targetId);
  });
});

projectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const projectKey = button.dataset.project;
    openProjectModal(projectKey);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', closeProjectModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('active')) {
    closeProjectModal();
  }
});

function openProjectModal(projectKey) {
  const project = projects[projectKey];
  if (!project) return;

  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalNote.innerHTML = project.note;

  modalTech.innerHTML = project.tech.map((item) => `<span>${item}</span>`).join('');
  modalFeatures.innerHTML = project.features.map((item) => `<li>${item}</li>`).join('');

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeProjectModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const backToTop = document.getElementById('backToTop');
const pageGlitchOverlay = document.getElementById('pageGlitchOverlay');
const hackLineOne = document.getElementById('hackLineOne');
const hackLineTwo = document.getElementById('hackLineTwo');
const hackLineThree = document.getElementById('hackLineThree');

function runHackScroll(targetId) {
  const targetElement = document.querySelector(targetId);

  if (!targetElement) return;

  const isTop = targetId === '#top';

  if (hackLineOne) {
    hackLineOne.textContent = isTop
      ? '> RETURNING_TO_TOP...'
      : `> OPENING_${targetId.replace('#', '').toUpperCase()}...`;
  }

  if (hackLineTwo) {
    hackLineTwo.textContent = '> SYSTEM_SCROLL_OVERRIDE';
  }

  if (hackLineThree) {
    hackLineThree.textContent = '> ACCESS_GRANTED';
  }

  document.body.classList.add('page-hacking');

  if (pageGlitchOverlay) {
    pageGlitchOverlay.classList.remove('active');
    void pageGlitchOverlay.offsetWidth;
    pageGlitchOverlay.classList.add('active');
  }

  setTimeout(() => {
    const headerOffset = 78;
    const targetPosition =
      targetId === '#top'
        ? 0
        : targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    history.pushState(null, '', targetId);
  }, 420);

  setTimeout(() => {
    document.body.classList.remove('page-hacking');

    if (pageGlitchOverlay) {
      pageGlitchOverlay.classList.remove('active');
    }
  }, 1400);
}

if (backToTop) {
  backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    runHackScroll('#top');
  });
}

const heroActionLinks = document.querySelectorAll('.hero-actions a[href^="#"]');

heroActionLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const targetId = link.getAttribute('href');
 link.classList.add('btn-hack-click');

    setTimeout(() => {
      link.classList.remove('btn-hack-click');
    }, 500);
    if (typeof runHackScroll === 'function') {
      runHackScroll(targetId);
    }
  });
});
