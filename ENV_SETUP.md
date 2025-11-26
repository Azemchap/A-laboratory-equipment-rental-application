# Environment Setup Guide

## Prerequisites

- MongoDB Atlas account ([Sign up here](https://www.mongodb.com/cloud/atlas/register))
- Node.js installed

## MongoDB Atlas Setup

1. **Create a MongoDB Atlas Cluster**

   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster (free tier available)
   - Wait for the cluster to be created

2. **Get Your Connection String**

   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://<username>:<password>@cluster...`)

3. **Create Database User**

   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create username and password
   - Save these credentials securely

4. **Whitelist IP Address**
   - Go to "Network Access" in the left sidebar

## Client Configuration

1. **Navigate to the client folder**

   ```bash
   cd client
   ```

2. **Copy the example environment file**

   ```bash
   cp .env.example .env
   ```

3. **Edit the `.env` file** (default should work for local development):

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Application

### Start the Server

```bash
cd server
npm start
```

### Start the Client (in a new terminal)

```bash
cd client
npm start
```

The client should automatically open at `http://localhost:3000` and connect to the server at `http://localhost:5000`.

## Security Notes

⚠️ **IMPORTANT:**

- Never commit `.env` files to version control (they're already in `.gitignore`)
- Keep your MongoDB credentials secure
- Use strong, random values for `JWT_SECRET`
- For production, use environment-specific values and proper IP whitelisting

## Troubleshooting

### Connection Issues

- Verify your MongoDB credentials are correct
- Check that your IP address is whitelisted in MongoDB Atlas
- Ensure the cluster is running

### Port Already in Use

- Change the `PORT` value in `server/.env` if port 5000 is occupied
- Update `REACT_APP_API_URL` in `client/.env` to match the new port
