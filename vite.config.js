import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  site: "https://jitsedekeyser.be",
  base: "/web4/react-artistique",
  plugins: [react()],
})
