# Quick Start - Fix Parse Server Error

## The Problem

Your server is crashing because Parse Server needs configuration in the `.env` file.

## The Solution

**Open your `server/.env` file** and make sure it contains ALL of these variables:

```env
# Parse Server Configuration
DATABASE_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/lab-rental?retryWrites=true&w=majority
APP_ID=myLabRentalApp
MASTER_KEY=GenerateAStrongRandomKeyHere123!
SERVER_URL=http://localhost:5000/parse
PORT=5000
CLOUD=./cloud/main.js
CLIENT_CLASS_CREATION=true
PARSE_SERVER_SESSION_LENGTH=31536000
NODE_ENV=development
```

## What to Replace

1. **DATABASE_URI**: Replace with your actual MongoDB Atlas connection string

   - You already have this working (from the successful test-connection.js)
   - Just copy the same connection string you used for testing

2. **MASTER_KEY**: **IMPORTANT!** Change this to a strong, random string

   - Example: `7h!sI$aS3cur3M@st3rK3y!2024`
   - This is critical for security - never use a weak key!

3. **APP_ID**: You can keep `myLabRentalApp` or change it to any unique identifier

4. Keep all other values as shown above

## After Updating

Save your `.env` file and run:

```bash
npm run dev
```

Your server should start successfully! ✅
