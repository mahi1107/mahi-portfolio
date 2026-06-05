# 🚀 Portfolio Deployment & Publishing Manual

This guide outlines the exact steps to publish this portfolio to your GitHub repository and deploy it to Vercel.

---

## 📋 Pre-Deployment Verification Checklist

Before publishing, ensure you have:
1. Copy-pasted your resume PDF (`Mahi Singh Resume.pdf`) into the `ms-frontend/public/` directory.
2. Placed your certificate images and PDFs (`.png` and `.pdf` files) inside the `ms-frontend/public/certificates/` directory.
3. Created your `.env` file from the `.env.example` template if you plan to link a live database.

---

## 🐙 Step 1: Push Project to GitHub

Run these exact commands in your terminal in the `/ms-frontend` directory:

```bash
# 1. Initialize local Git repository
git init

# 2. Add all project files
git add .

# 3. Create your first commit
git commit -m "Initial commit - ready for production deployment"

# 4. Create the main branch
git branch -M main

# 5. Link origin to your GitHub repository
git remote add origin https://github.com/mahi1107/mahi-portfolio.git

# 6. Push code to remote branch
git push -u origin main
```
*Note: During the push command, a browser popup will appear requesting you to sign in and authorize GitHub.*

---

## ⚡ Step 2: Connect GitHub to Vercel for Free Hosting

1. Visit [Vercel](https://vercel.com) and click **Sign Up** (or Log In) choosing **Continue with GitHub**.
2. From the Vercel Dashboard, click the **Add New** button on the right side and select **Project**.
3. Locate `mahi-portfolio` in the list of your GitHub repositories and click **Import**.
4. In the configuration window:
   * **Framework Preset:** Vite (Vercel will auto-detect this).
   * **Root Directory:** `./` (leave default).
   * **Build and Output Settings:** Leave default (Build command is `npm run build` and Output directory is `dist`).
   * **Environment Variables:** If you have a live backend URL, add an environment variable:
     - **Name:** `VITE_API_BASE_URL`
     - **Value:** `https://your-backend-api.com`
5. Click the **Deploy** button.
6. Once deployment finishes (takes ~1 minute), Vercel will give you a live URL (e.g., `mahi-portfolio.vercel.app`).

---

## 🔄 How to Update Content in the Future

Whenever you edit files (like updating your skills or project text in `src/data/portfolioData.ts`):

1. **Commit and Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "Update portfolio projects and skills text"
   git push origin main
   ```
2. **Auto-Deploy:** Vercel automatically detects the push to the `main` branch and redeploys your site in the background. Your changes will go live in seconds!
