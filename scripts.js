function createElement(tag) {
  const el = document.createElement(tag);
  el.setId = function (id) {
    this.id = id;
    return this;
  };
  el.addClassnames = function (...classNames) {
    this.classList.add(...classNames);
    return this;
  };
  return el;
}
const darkIcon = createElement('i')
  .setId('theme-toggle-icon')
  .addClassnames('ph', 'ph-moon-stars');

const lightIcon = createElement('i')
  .setId('theme-toggle-icon')
  .addClassnames('ph', 'ph-sun');

function initTheme() {
  const systemThemePreference = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches
    ? 'dark'
    : 'light';
  const currentTheme = localStorage?.getItem('theme') || systemThemePreference;
  document.documentElement.setAttribute('data-theme', currentTheme);
  const isDark = currentTheme === 'dark';
  const themeIconContainer = document.getElementById(
    'theme-toggle-icon-container',
  );
  themeIconContainer.replaceChildren(isDark ? darkIcon : lightIcon);
}

function handleUpdateTheme() {
  const themeUpdated =
    document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'light'
      : 'dark';

  document.documentElement.setAttribute('data-theme', themeUpdated);
  localStorage.setItem('theme', themeUpdated);
  const isDark = themeUpdated === 'dark';
  const themeIconContainer = document.getElementById(
    'theme-toggle-icon-container',
  );
  themeIconContainer.replaceChildren(isDark ? darkIcon : lightIcon);
}

function main() {
  initTheme();
  const themeIcon = document.getElementById('theme-toggle-icon-container');
  themeIcon.addEventListener('click', handleUpdateTheme);
}

document.addEventListener('DOMContentLoaded', main);
