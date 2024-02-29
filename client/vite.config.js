import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
     server:{
      port: 3000,
      proxy:{
        "/api":{
          target:"http://localhost:8000",
          changeOrigin : true ,
          secure : false,
          rewrite: path => path.replace('/api', 'http://localhost:8000/seemo-gram/api')
        }
      }
    }
})
