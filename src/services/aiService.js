/**
 * AI/LLM Service
 *
 * This file provides an abstraction layer for AI-powered text analysis.
 * Replace the implementation below with your preferred LLM service:
 * - OpenAI (GPT-4, GPT-3.5)
 * - Anthropic (Claude)
 * - Google (Gemini)
 * - Azure OpenAI
 * - Cohere
 * - Open-source models via API
 */

import { getConfig } from './config';

/**
 * Analyzes a tour transcription and extracts structured insights
 * @param {string} transcription - The full text transcription
 * @param {Object} context - Additional context (prospect info, situation, etc.)
 * @returns {Promise<Object>} - Returns { keyPoints, concerns, smallThings }
 */
export async function analyzeTourTranscription(transcription, context = {}) {
  const config = getConfig();
  const service = config.ai.provider;

  switch (service) {
    case 'openai':
      return analyzeWithOpenAI(transcription, context);
    case 'anthropic':
      return analyzeWithAnthropic(transcription, context);
    case 'google':
      return analyzeWithGoogle(transcription, context);
    case 'azure':
      return analyzeWithAzureOpenAI(transcription, context);
    case 'mock':
    default:
      return analyzeWithMock(transcription, context);
  }
}

/**
 * Creates the system prompt for analysis
 */
function getAnalysisPrompt(transcription, context) {
  return `You are an AI assistant analyzing conversations to extract structured insights.

Analyze the following conversation transcript and extract:

1. **Key Points**: The most important takeaways, main topics discussed, or key information mentioned (3-5 items). Extract any significant statements, goals, preferences, or requirements mentioned.

2. **Concerns**: Any worries, questions, objections, or issues raised (2-4 items). If none exist, extract things that might need follow-up or clarification.

3. **Small Things**: Minor details, personal preferences, or interesting facts mentioned that could be useful for personalization (2-4 items). This includes hobbies, locations, relationships, or specific likes/dislikes.

IMPORTANT: Even if this is a brief or casual conversation, extract at least 2-3 items for each category based on what was actually said. Be creative and extract value from whatever information is provided.

Context:
- Person: ${context.firstName} ${context.lastName}
- Situation: ${context.situation}
- Email: ${context.email}
- Phone: ${context.phone}

Transcript:
${transcription}

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
{
  "keyPoints": ["point 1", "point 2", ...],
  "concerns": ["concern 1", "concern 2", ...],
  "smallThings": ["detail 1", "detail 2", ...]
}`;
}

/**
 * OpenAI Implementation (GPT-4 or GPT-3.5)
 * Docs: https://platform.openai.com/docs/api-reference/chat
 */
async function analyzeWithOpenAI(transcription, context) {
  const config = getConfig();
  const apiKey = config.ai.apiKey;
  const model = config.ai.model || 'gpt-4-turbo-preview';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that analyzes senior living tour conversations and extracts structured insights. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: getAnalysisPrompt(transcription, context)
          }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return {
      keyPoints: result.keyPoints || [],
      concerns: result.concerns || [],
      smallThings: result.smallThings || [],
      provider: 'openai',
      model: model
    };
  } catch (error) {
    console.error('OpenAI analysis error:', error);
    throw error;
  }
}

/**
 * Anthropic Claude Implementation
 * Docs: https://docs.anthropic.com/claude/reference/messages_post
 */
async function analyzeWithAnthropic(transcription, context) {
  const config = getConfig();
  const apiKey = config.ai.apiKey;
  const model = config.ai.model || 'claude-3-5-sonnet-20241022';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: getAnalysisPrompt(transcription, context)
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content[0].text;

    // Parse JSON from response (Claude might wrap it in markdown)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const result = JSON.parse(jsonMatch ? jsonMatch[0] : content);

    return {
      keyPoints: result.keyPoints || [],
      concerns: result.concerns || [],
      smallThings: result.smallThings || [],
      provider: 'anthropic',
      model: model
    };
  } catch (error) {
    console.error('Anthropic analysis error:', error);
    throw error;
  }
}

/**
 * Google Gemini Implementation
 * Docs: https://ai.google.dev/api/rest
 */
async function analyzeWithGoogle(transcription, context) {
  const config = getConfig();
  const apiKey = config.ai.apiKey;
  const model = config.ai.model || 'gemini-pro';

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: getAnalysisPrompt(transcription, context)
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const result = JSON.parse(jsonMatch ? jsonMatch[0] : content);

    return {
      keyPoints: result.keyPoints || [],
      concerns: result.concerns || [],
      smallThings: result.smallThings || [],
      provider: 'google',
      model: model
    };
  } catch (error) {
    console.error('Google analysis error:', error);
    throw error;
  }
}

/**
 * Azure OpenAI Implementation
 * Docs: https://learn.microsoft.com/azure/ai-services/openai/
 */
async function analyzeWithAzureOpenAI(transcription, context) {
  const config = getConfig();
  const apiKey = config.ai.apiKey;
  const endpoint = config.ai.azureEndpoint;
  const deployment = config.ai.azureDeployment;

  try {
    const response = await fetch(`${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2023-05-15`, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that analyzes senior living tour conversations and extracts structured insights. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: getAnalysisPrompt(transcription, context)
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Azure OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const result = JSON.parse(content);

    return {
      keyPoints: result.keyPoints || [],
      concerns: result.concerns || [],
      smallThings: result.smallThings || [],
      provider: 'azure-openai',
      model: deployment
    };
  } catch (error) {
    console.error('Azure OpenAI analysis error:', error);
    throw error;
  }
}

/**
 * Mock Implementation (for testing without API keys)
 */
async function analyzeWithMock(transcription, context) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    keyPoints: [
      "Looking for independent living with activities",
      "Prefers a room with garden view",
      "Concerned about pet policy for small dog",
      "Interested in starting within 2-3 months"
    ],
    concerns: [
      "Cost of monthly fees and what's included",
      "Whether they can bring their small dog (Chihuahua)",
      "Distance from family (daughter lives 30 minutes away)",
      "Quality of meals and dietary accommodations"
    ],
    smallThings: [
      "Likes to paint and asked about art studio",
      "Enjoys gardening - mentioned herb garden",
      "Reads mystery novels - asked about library",
      "Plays bridge on Wednesdays with friends"
    ],
    provider: 'mock'
  };
}
