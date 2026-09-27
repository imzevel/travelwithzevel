// ---- Gumroad link configuration ----
const GUMROAD_LINKS = {
  basic: 'GUMROAD_BASIC_URL',
  pro: 'GUMROAD_PRO_URL',
  ultimate: 'GUMROAD_ULTIMATE_URL'
};
document.querySelectorAll('.gumroad').forEach(el => {
  const tier = el.dataset.tier;
  if (tier && GUMROAD_LINKS[tier]) {
    el.href = GUMROAD_LINKS[tier];
  }
});

// ---- Dark mode toggle ----
const themeBtn = document.getElementById('theme');
const sunIcon = themeBtn.querySelector('.sun');
const moonIcon = themeBtn.querySelector('.moon');

function updateThemeIcon() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  sunIcon.style.display = isDark ? 'none' : 'block';
  moonIcon.style.display = isDark ? 'block' : 'none';
}

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('stos-theme', next);
  updateThemeIcon();
});

updateThemeIcon();

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-a').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ---- Mobile nav menu ----
const menuBtn = document.getElementById('menu');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? '' : 'flex';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '58px';
  navLinks.style.left = '16px';
  navLinks.style.right = '16px';
  navLinks.style.padding = '16px';
  navLinks.style.flexDirection = 'column';
  navLinks.style.background = 'var(--card)';
  navLinks.style.border = '1px solid var(--line)';
  navLinks.style.borderRadius = '18px';
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id], div.trust[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(sec => activeObserver.observe(sec));