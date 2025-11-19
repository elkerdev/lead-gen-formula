require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// API endpoint - same logic as Vercel function
app.post('/api/generate-strategy', async (req, res) => {
  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

  if (!CLAUDE_API_KEY) {
    console.error('❌ CLAUDE_API_KEY not found in environment variables');
    return res.status(500).json({ error: 'API key not configured. Please add CLAUDE_API_KEY to your .env file' });
  }

  try {
    const { prompt, maxTokens = 4096 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('📤 Calling Claude API...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens || 8000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Claude API Error:', error);
      return res.status(response.status).json({ error: error.error?.message || 'Claude API error' });
    }

    const data = await response.json();
    console.log('✅ Claude API success');
    return res.status(200).json({ content: data.content[0].text });

  } catch (error) {
    console.error('❌ Server Error:', error.message);
    console.error('Stack:', error.stack);
    return res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📝 Open http://localhost:${PORT}/marketing-guide.html to get started`);
});
