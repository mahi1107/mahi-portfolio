# 🌌 Premium Portfolio Website

An interactive, high-fidelity, and cinematic developer portfolio built to showcase technical capabilities, projects, certifications, and system evolution. Crafted with a dark cyber aesthetic, fluid animations, and robust modular pages.

---

## 🚀 Key Features

* **Cinematic Dark Design:** Immersive theme utilizing smooth radial gradients, backdrop glass-morphism, and responsive CSS variables.
* **Interactive Radar/Orbit Visualizer:** Custom orbital capability mapper displaying core skills with hover telemetry detail logs.
* **Responsive Bento Grid:** Dynamic grid structure for projects and certifications that transitions smoothly into clean collapsibles on mobile viewports.
* **FormSubmit AJAX Integration:** Secure contact form forwarding inbound inquiries directly to your email inbox without requiring a custom backend.
* **Static Assets Hosting:** Secure local serving of resumes and verification-linked certificates.
* **Real-time Live Sync:** Designed to adaptively read configuration data from a MERN API (or fall back gracefully to static local files if offline).

---

## 🛠 Tech Stack

* **Frontend Framework:** React 18 (with TypeScript)
* **Styling System:** Tailwind CSS v4 & Vanilla CSS variables
* **Animations:** Framer Motion (for physics-based responsive interactions)
* **Icons & UI:** Lucide React & Radix UI primitives
* **Bundler & Server:** Vite v5
* **HTTP Client:** Axios

---

## 💻 Local Setup & Development

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/mahi1107/mahi-portfolio.git
cd mahi-portfolio/ms-frontend
npm install
```

### 3. Environment Variables Configuration
Copy the template environment file:
```bash
cp .env.example .env
```
Open `.env` and configure `VITE_API_BASE_URL` if you have a running backend API. If you deploy statically, you can leave it blank or omit it, and the frontend will use local fallbacks.

### 4. Running Locally
Start the Vite development server:
```bash
npm run dev
```
The site will run on `http://localhost:3002`.

---

## 📦 Production Build & Deployment

### 1. Build Verification
To compile the production bundle:
```bash
npm run build
```
This builds optimized HTML, JS, and CSS chunks into the `dist/` folder.

### 2. Vercel Deployment (Recommended)
1. Push your repository to **GitHub**.
2. Connect your GitHub account to [Vercel](https://vercel.com).
3. Import this project, Vercel will auto-detect **Vite** and configure the build settings.
4. Add environment variables (if any) in the Vercel dashboard.
5. Click **Deploy** to publish it to the web.
