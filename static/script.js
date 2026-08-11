const header = document.getElementById('header');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const searchBtn = document.getElementById('searchBtn');
const searchPopup = document.getElementById('searchPopup');
const closeSearch = document.getElementById('closeSearch');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item img');
const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevTestimonial = document.getElementById('prevTestimonial');
const nextTestimonial = document.getElementById('nextTestimonial');
const counters = document.querySelectorAll('.counter');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const cookieNotice = document.getElementById('cookieNotice');
const cookieAccept = document.getElementById('cookieAccept');
const themeToggle = document.getElementById('themeToggle');
let currentTestimonial = 0;

const toggleMenu = () => {
  if (navMenu) {
    navMenu.classList.toggle('open');
  }
};

if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu) {
      navMenu.classList.remove('open');
    }
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    if (navbar) navbar.classList.add('scrolled');
    if (backToTop) backToTop.classList.add('show');
  } else {
    if (navbar) navbar.classList.remove('scrolled');
    if (backToTop) backToTop.classList.remove('show');
  }
  updateActiveNav();
});

const updateActiveNav = () => {
  const fromTop = window.scrollY + 120;
  navLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (!section) return;
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (searchBtn && searchPopup) {
  searchBtn.addEventListener('click', () => {
    searchPopup.classList.add('open');
  });
}
if (closeSearch && searchPopup) {
  closeSearch.addEventListener('click', () => {
    searchPopup.classList.remove('open');
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (searchPopup) searchPopup.classList.remove('open');
    if (lightbox) lightbox.classList.remove('open');
  }
});

if (galleryItems.length) {
  galleryItems.forEach((img) => {
    img.addEventListener('click', () => {
      if (lightboxImage) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || 'Gallery image';
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = img.dataset.alt || img.alt || '';
      }
      if (lightbox) {
        lightbox.classList.add('open');
      }
    });
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    if (lightbox) {
      lightbox.classList.remove('open');
    }
  });
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove('open');
    }
  });
}

const updateTestimonial = (index) => {
  testimonialCards.forEach((card, cardIndex) => {
    card.classList.toggle('active', cardIndex === index);
  });
};

const nextSlide = () => {
  if (!testimonialCards.length) return;
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  updateTestimonial(currentTestimonial);
};

const prevSlide = () => {
  if (!testimonialCards.length) return;
  currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
  updateTestimonial(currentTestimonial);
};

if (nextTestimonial) {
  nextTestimonial.addEventListener('click', nextSlide);
}
if (prevTestimonial) {
  prevTestimonial.addEventListener('click', prevSlide);
}
if (testimonialCards.length) {
  setInterval(nextSlide, 8000);
}

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = +counter.dataset.target;
    const current = +counter.textContent;
    const increment = Math.max(Math.round(target / 100), 1);
    if (current < target) {
      counter.textContent = Math.min(current + increment, target);
      setTimeout(animateCounters, 25);
    }
  });
};

const revealTargets = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .zoom-in, .stat-box, .timeline-item, .product-card, .info-card, .certificate-card, .gallery-item, .testimonial-card, .feature-card, .qc-content, .qc-image, .contact-form, .contact-info');

const revealElements = () => {
  revealTargets.forEach((el) => {
    el.classList.add('in-view');
  });
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        if (entry.target.classList.contains('counter') || entry.target.closest('.stats')) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.18 });

  revealTargets.forEach((el) => {
    observer.observe(el);
  });
} else {
  revealElements();
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const company = document.getElementById('company');
    const message = document.getElementById('message');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.value.trim() || !emailPattern.test(email.value) || !phone.value.trim() || !company.value.trim() || !message.value.trim()) {
      if (formFeedback) {
        formFeedback.textContent = 'Iltimos, barcha maydonlarni to‘liq va to‘g‘ri to‘ldiring.';
        formFeedback.style.color = '#c62828';
      }
      return;
    }

    if (formFeedback) {
      formFeedback.textContent = 'Rahmat! Xabaringiz muvaffaqiyatli yuborildi.';
      formFeedback.style.color = 'var(--primary)';
    }
    contactForm.reset();
  });
}

const showCookie = () => {
  if (cookieNotice && !localStorage.getItem('saxovatCookies')) {
    cookieNotice.classList.add('show');
  }
};

if (cookieAccept && cookieNotice) {
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('saxovatCookies', 'accepted');
    cookieNotice.classList.remove('show');
  });
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
}

window.addEventListener('load', () => {
  showCookie();
  updateActiveNav();
});

(function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
})();

const createFloatingCursor = () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
};
createFloatingCursor();

const sections = document.querySelectorAll('main section[id]');
sections.forEach((section) => {
  section.style.scrollMarginTop = '100px';
});

const progressStyle = document.createElement('style');
progressStyle.textContent = `.scroll-progress { position: fixed; top: 0; left: 0; height: 4px; width: 0; background: linear-gradient(90deg, var(--primary), var(--accent)); z-index: 400; transition: width 0.2s ease; } .custom-cursor { position: fixed; width: 18px; height: 18px; border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%); z-index: 999; border: 2px solid rgba(198,40,40,0.95); background: rgba(255,255,255,0.05); mix-blend-mode: difference; transition: transform 0.15s ease; }`; 
document.head.appendChild(progressStyle);

const initCertificateLightbox = () => {
  const certificates = document.querySelectorAll('.certificate-card');
  certificates.forEach((card) => {
    card.addEventListener('click', () => {
      const image = card.querySelector('img');
      if (lightboxImage && image) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || 'Certificate image';
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = card.dataset.cert || image?.alt || 'Certificate preview';
      }
      if (lightbox) {
        lightbox.classList.add('open');
      }
    });
  });
};
if (document.querySelectorAll('.certificate-card').length) {
  initCertificateLightbox();
}

const faqAccordion = () => {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('open');
      const content = item.querySelector('.faq-content');
      if (content) {
        content.style.maxHeight = item.classList.contains('open') ? `${content.scrollHeight}px` : '0px';
      }
    });
  });
};
if (document.querySelectorAll('.faq-item').length) {
  faqAccordion();
}

// Ensure image hover animation for hero and gallery is smooth
const heroImage = document.querySelector('.hero');
if (heroImage) {
  heroImage.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 20;
    const y = (event.clientY / window.innerHeight - 0.5) * 20;
    heroImage.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
  heroImage.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'translate3d(0, 0, 0)';
  });
}
