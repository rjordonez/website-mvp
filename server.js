import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, leadsContext } = req.body;
    console.log('Received request - Messages:', JSON.stringify(messages, null, 2));
    console.log('Leads context count:', leadsContext?.length);

    const systemMessage = `You are a helpful AI assistant for a senior living CRM system. You have access to the following leads data:

${JSON.stringify(leadsContext, null, 2)}

Help the user with questions about their leads pipeline, provide insights, and suggest next steps. Be concise and helpful. When discussing leads, use their names and provide specific details from the data.`;

    // Convert UIMessage format to ModelMessage format
    const coreMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.parts.map(part => {
        if (part.type === 'text') return part.text;
        return part;
      }).filter(Boolean).join('')
    }));

    const result = streamText({
      model: openai('gpt-4-turbo', { apiKey: process.env.OPENAI_API_KEY }),
      system: systemMessage,
      messages: coreMessages,
      temperature: 0.7,
      maxTokens: 1000,
    });

    result.pipeUIMessageStreamToResponse(res);
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
