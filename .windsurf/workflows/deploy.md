---
description: How to deploy the Fake News Detection application
---

# Deployment Workflow

This workflow describes how to deploy the VeriNews application.

## Prerequisites
1. A [Netlify](https://www.netlify.com/) account for the Frontend.
2. A [Render](https://render.com/) or [Railway](https://railway.app/) account for the Backend.
3. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (already configured).

## Step 1: Prepare Backend for Deployment
1. Ensure `cors` is configured to allow your frontend URL in `server/index.js`.
2. Add a `start` script to `server/package.json`: `"start": "node index.js"`.

## Step 2: Deploy Backend (e.g., to Render)
1. Connect your GitHub repository to Render.
2. Create a new **Web Service**.
3. Set **Root Directory** to `server`.
4. Set **Build Command** to `npm install`.
5. Set **Start Command** to `node index.js`.
6. Add **Environment Variables** from your `.env` file (MONGODB_URI, JWT_SECRET, etc.).

## Step 3: Prepare Frontend for Deployment
1. Update `client/src/utils/api.js` to use the deployed backend URL instead of `localhost:5000`.

## Step 4: Deploy Frontend (to Netlify)
// turbo
1. Use the `deploy_web_app` tool to deploy the frontend.
```javascript
deploy_web_app({
  ProjectPath: "/client",
  Framework: "create-react-app",
  Subdomain: "verinews-app"
})
```
2. In Netlify settings, ensure the `API_URL` environment variable points to your deployed backend.
