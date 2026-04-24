/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A1020",
        surface: "#0F172A",
        surfaceHover: "#1E293B",
        elevated: "#16213A",
        card: "#111C33",
        foreground: "#FFFFFF",
        secondary: "#E5E7EB",
        muted: "#9CA3AF",
        border: "#1F2A44",
        borderHover: "#334155",
        borderActive: "#FFFFFF",
        accent: "#4F8CFF",
        accentHover: "#3B82F6",
        accentDim: "rgba(79, 140, 255, 0.15)",
        accentGlow: "rgba(79, 140, 255, 0.25)",
        neural: "#4F8CFF",
        neuralDim: "rgba(79, 140, 255, 0.08)",
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 30px rgba(79, 140, 255, 0.15)',
        'glow-lg': '0 0 60px rgba(79, 140, 255, 0.2)',
        'neural': '0 0 20px rgba(79, 140, 255, 0.1), 0 0 60px rgba(79, 140, 255, 0.05)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'elevated': '0 16px 48px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 140, 255, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(79, 140, 255, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}