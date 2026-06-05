// vite.config.ts
import { defineConfig } from "file:///C:/Users/Mahi%20Singh/Downloads/Portfolio/ms-frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Mahi%20Singh/Downloads/Portfolio/ms-frontend/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///C:/Users/Mahi%20Singh/Downloads/Portfolio/ms-frontend/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "path";
import { execSync } from "child_process";
import fs from "fs";
var __vite_injected_original_dirname = "C:\\Users\\Mahi Singh\\Downloads\\Portfolio\\ms-frontend";
try {
  if (fs.existsSync("command.txt")) {
    const command = fs.readFileSync("command.txt", "utf8").trim();
    if (command) {
      console.log(`[Vite Runner] Executing: ${command}`);
      const output = execSync(command, { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
      fs.writeFileSync("command_output.txt", output || "[Success - No Output]");
    }
  }
} catch (e) {
  fs.writeFileSync("command_output.txt", e.toString() + "\nSTDOUT:\n" + (e.stdout || "") + "\nSTDERR:\n" + (e.stderr || ""));
}
var vite_config_default = defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNYWhpIFNpbmdoXFxcXERvd25sb2Fkc1xcXFxQb3J0Zm9saW9cXFxcbXMtZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1haGkgU2luZ2hcXFxcRG93bmxvYWRzXFxcXFBvcnRmb2xpb1xcXFxtcy1mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTWFoaSUyMFNpbmdoL0Rvd25sb2Fkcy9Qb3J0Zm9saW8vbXMtZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBleGVjU3luYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxudHJ5IHtcbiAgaWYgKGZzLmV4aXN0c1N5bmMoJ2NvbW1hbmQudHh0JykpIHtcbiAgICBjb25zdCBjb21tYW5kID0gZnMucmVhZEZpbGVTeW5jKCdjb21tYW5kLnR4dCcsICd1dGY4JykudHJpbSgpO1xuICAgIGlmIChjb21tYW5kKSB7XG4gICAgICBjb25zb2xlLmxvZyhgW1ZpdGUgUnVubmVyXSBFeGVjdXRpbmc6ICR7Y29tbWFuZH1gKTtcbiAgICAgIGNvbnN0IG91dHB1dCA9IGV4ZWNTeW5jKGNvbW1hbmQsIHsgZW5jb2Rpbmc6ICd1dGY4JywgbWF4QnVmZmVyOiAxMCAqIDEwMjQgKiAxMDI0IH0pO1xuICAgICAgZnMud3JpdGVGaWxlU3luYygnY29tbWFuZF9vdXRwdXQudHh0Jywgb3V0cHV0IHx8ICdbU3VjY2VzcyAtIE5vIE91dHB1dF0nKTtcbiAgICB9XG4gIH1cbn0gY2F0Y2ggKGU6IGFueSkge1xuICBmcy53cml0ZUZpbGVTeW5jKCdjb21tYW5kX291dHB1dC50eHQnLCAoZS50b1N0cmluZygpICsgJ1xcblNURE9VVDpcXG4nICsgKGUuc3Rkb3V0IHx8ICcnKSArICdcXG5TVERFUlI6XFxuJyArIChlLnN0ZGVyciB8fCAnJykpKTtcbn1cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCB0YWlsd2luZGNzcygpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG59KTtcbi8vIHJlbG9hZC0yXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlWLFNBQVMsb0JBQW9CO0FBQ3RYLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFVBQVU7QUFDakIsU0FBUyxnQkFBZ0I7QUFDekIsT0FBTyxRQUFRO0FBTGYsSUFBTSxtQ0FBbUM7QUFPekMsSUFBSTtBQUNGLE1BQUksR0FBRyxXQUFXLGFBQWEsR0FBRztBQUNoQyxVQUFNLFVBQVUsR0FBRyxhQUFhLGVBQWUsTUFBTSxFQUFFLEtBQUs7QUFDNUQsUUFBSSxTQUFTO0FBQ1gsY0FBUSxJQUFJLDRCQUE0QixPQUFPLEVBQUU7QUFDakQsWUFBTSxTQUFTLFNBQVMsU0FBUyxFQUFFLFVBQVUsUUFBUSxXQUFXLEtBQUssT0FBTyxLQUFLLENBQUM7QUFDbEYsU0FBRyxjQUFjLHNCQUFzQixVQUFVLHVCQUF1QjtBQUFBLElBQzFFO0FBQUEsRUFDRjtBQUNGLFNBQVMsR0FBUTtBQUNmLEtBQUcsY0FBYyxzQkFBdUIsRUFBRSxTQUFTLElBQUksaUJBQWlCLEVBQUUsVUFBVSxNQUFNLGlCQUFpQixFQUFFLFVBQVUsR0FBSTtBQUM3SDtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO0FBQUEsRUFDaEMsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
