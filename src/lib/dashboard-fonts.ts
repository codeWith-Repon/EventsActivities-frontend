import { Sora, Onest, JetBrains_Mono } from 'next/font/google';

// Display — geometric, confident headings & big numbers
export const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
});

// Body / UI — clean, friendly, modern grotesque
export const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin'],
  display: 'swap',
});

// Numerics / labels / data
export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jbmono',
  subsets: ['latin'],
  display: 'swap',
});

/** Combined font CSS variables for the dashboard root wrapper. */
export const dashboardFontVars = `${sora.variable} ${onest.variable} ${jetbrainsMono.variable}`;
