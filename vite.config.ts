import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/birthday-card/', // ← ใส่ชื่อ repo ของคุณ เช่น /birthday-card/
})
