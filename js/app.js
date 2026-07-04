import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { renderHomePage } from './pages/HomePage.js';

let currentPage = 'home';

function navigate(page, params = {}) {
  currentPage = page;
  render(params);
}

function render(params = {}) {
  let pageContent = '';

  switch (currentPage) {
    case 'home':
    default:
      pageContent = renderHomePage();
      break;
  }

  document.getElementById('app').innerHTML =
    renderHeader() + `<main>${pageContent}</main>` + renderFooter();

  bindEvents(params);
}

function bindEvents(params) {
  document.querySelectorAll('[data-navigate]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.dataset.navigate;
      if (target === 'home') navigate('home');
    });
  });

  document.querySelectorAll('[data-grade]').forEach(el => {
    el.addEventListener('click', () => {
      const grade = parseInt(el.dataset.grade);
      navigate('recommend', { grade });
    });
  });
}

window.app = { navigate };

render();
