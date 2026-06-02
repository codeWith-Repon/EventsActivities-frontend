'use client';

import { useEffect } from 'react';
import { applyTheme, getStoredTheme } from '@/lib/aurora-theme';

/** Applies the persisted dashboard theme to #aurora-root after mount. */
const AuroraThemeScript = () => {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);
  return null;
};

export default AuroraThemeScript;
