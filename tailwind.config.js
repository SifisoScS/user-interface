/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#05070A',
        surface: '#0F172A',
        border:  '#1E293B',
        accent:  '#3B82F6',
        text:    '#E2E8F0',
        muted:   '#64748B',
      },
      borderRadius: {
        panel: '16px',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
