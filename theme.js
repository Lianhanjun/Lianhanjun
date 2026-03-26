(() => {
  const THEME_KEY = 'themePreference';

  function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // If storage is blocked, keep the theme only for this session.
    }
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const stored = getStoredTheme();
    const theme = stored === 'dark' ? 'dark' : 'light';
    applyTheme(theme);

    // Only present on ColorThemes page.
    const themeLight = document.getElementById('themeLight');
    const themeDark = document.getElementById('themeDark');
    if (themeLight && themeDark) {
      themeLight.checked = theme !== 'dark';
      themeDark.checked = theme === 'dark';

      themeLight.addEventListener('change', () => {
        if (themeLight.checked) applyTheme('light');
      });
      themeDark.addEventListener('change', () => {
        if (themeDark.checked) applyTheme('dark');
      });
    }
  });
})();

