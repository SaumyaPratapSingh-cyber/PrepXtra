# Deployment Guide (Vercel)

This guide walks you through deploying the **PrepXtra** web application to Vercel.

## Prerequisites
- **GitHub Repository**: [https://github.com/SaumyaPratapSingh-cyber/PrepXtra](https://github.com/SaumyaPratapSingh-cyber/PrepXtra)
- **Vercel Account**: [Sign up here](https://vercel.com/signup) if you don't have one.

## Steps to Deploy

1. **Log in to Vercel** and go to your **Dashboard**.
2. Click **Add New...** -> **Project**.
3. Select **Import** next to the `PrepXtra` repository.
4. **Configure Project**:
   - **Framework Preset**: `Next.js` (should be auto-detected).
   - **Root Directory**: Leave as `./` (default).
   - **Build Command**: `next build` (default).
   - **Install Command**: `npm install` (default).

5. **Environment Variables**:
   Expand the **Environment Variables** section. You need to copy the values from your local `.env.local` file. Add the following keys:

   | Variable Name | Description |
   | :--- | :--- |
   | `MONGODB_URI` | **Required**. Your MongoDB connection string. *Ensure your MongoDB Atlas IP Access List includes `0.0.0.0/0` so Vercel can connect.* |
   | `JWT_SECRET` | **Required**. A strong secret string for user authentication. |
   | `EMAIL_HOST` | (Optional) SMTP Host (e.g., `smtp.gmail.com`). |
   | `EMAIL_PORT` | (Optional) SMTP Port (e.g., `587`). |
   | `EMAIL_USER` | (Optional) Email address for sending alerts. |
   | `EMAIL_PASS` | (Optional) App password for the email account. |
   | `GOOGLE_API_KEY` | **Optional**. API Key for Gemini. |

   > **Note on AI Features**: The AI features (Resume Analysis) are currently **stubbed out** in the code to ensure a stable build. If you add `GOOGLE_API_KEY`, you can later uncomment the code in `src/lib/services/AIService.ts` to re-enable them.

6. **Deploy**:
   Click **Deploy**.

## Post-Deployment
- **URL**: Once deployed, Vercel will provide a URL (e.g., `https://prepxtra.vercel.app`).
- **Test**: Visit the URL to ensure the app loads correctly.
- **Troubleshooting**: Check the **Logs** tab in Vercel if the build fails.
