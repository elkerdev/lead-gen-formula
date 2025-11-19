# Elker Marketing Strategy Builder

An AI-powered tool that helps the Elker team create personalized marketing strategies for webinars and events.

## Features

- **Topic Ideation**: AI-generated webinar topic suggestions based on business goals and industry trends
- **Strategy Generation**: Complete marketing plans with messaging, channels, timelines, and metrics
- **Guided Workflow**: Step-by-step wizard that asks simple questions (no marketing expertise required)
- **Secure API Integration**: Claude API key stored securely in Vercel environment variables

## Deployment to Vercel

### 1. Install Vercel CLI (optional)
```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (or wherever this folder is)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

6. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add: `CLAUDE_API_KEY` = `your_actual_api_key_here`
   - Make sure it's available for Production, Preview, and Development

7. Click "Deploy"

### 3. Deploy via CLI

```bash
# From this directory
vercel

# Follow the prompts, then add environment variable
vercel env add CLAUDE_API_KEY
# Paste your Claude API key when prompted
# Select: Production, Preview, Development (all three)

# Deploy to production
vercel --prod
```

## Getting a Claude API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new key
5. Copy the key and add it to Vercel environment variables

## Local Development

To test locally:

1. Create a `.env` file (copy from `.env.example`)
2. Add your Claude API key to `.env`
3. Install Vercel CLI: `npm install -g vercel`
4. Run: `vercel dev`
5. Open `http://localhost:3000/marketing-guide.html`

## Project Structure

```
.
├── marketing-guide.html        # Main application
├── api/
│   └── generate-strategy.js   # Vercel serverless function (handles Claude API)
├── vercel.json                # Vercel configuration
├── .env.example               # Environment variable template
└── README.md                  # This file
```

## How It Works

1. **User fills out wizard** - 7 simple steps covering topic, audience, goals, resources, timeline
2. **Frontend sends request** - JavaScript sends user inputs to `/api/generate-strategy`
3. **Serverless function calls Claude** - Vercel function uses environment variable for API key
4. **Claude generates strategy** - AI creates personalized marketing plan
5. **Results displayed** - User sees complete strategy with copy-paste ready content

## Security

- API key is stored in Vercel environment variables (never exposed to client)
- All Claude API calls go through serverless function
- No client-side API key storage or management

## Support

For issues or questions, contact the Elker team.
