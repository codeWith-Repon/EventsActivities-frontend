// Lightweight, dependency-free theme controller for the dashboard.
// The dashboard root element (#aurora-root) carries `.aurora` always, plus
// `.dark` (default) or `.aurora-light`. We toggle those classes directly.

export const THEME_KEY = 'eh-dash-theme';
export type DashTheme = 'dark' | 'light';

export function applyTheme(theme: DashTheme) {
  const el = document.getElementById('aurora-root');
  if (!el) return;
  if (theme === 'light') {
    el.classList.remove('dark');
    el.classList.add('aurora-light');
  } else {
    el.classList.add('dark');
    el.classList.remove('aurora-light');
  }
  window.dispatchEvent(new Event('aurora-theme-change'));
}

export function getStoredTheme(): DashTheme {
  try {
    return (localStorage.getItem(THEME_KEY) as DashTheme) || 'light';
  } catch {
    return 'light';
  }
}

export function setTheme(theme: DashTheme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  applyTheme(theme);
}

export function currentTheme(): DashTheme {
  if (typeof document === 'undefined') return 'light';
  return document.getElementById('aurora-root')?.classList.contains('aurora-light')
    ? 'light'
    : 'dark';
}

export function subscribe(callback: () => void) {
  window.addEventListener('aurora-theme-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('aurora-theme-change', callback);
    window.removeEventListener('storage', callback);
  };
}
