# Trilio Listen Mode - API Setup Guide

This guide will help you configure speech-to-text and AI services for the Trilio Listen Mode feature.

## Quick Start

### 1. Copy the Environment Template

```bash
cp .env.example .env
```

### 2. Choose Your Services

Edit the `.env` file and choose your providers:

```env
# Speech-to-Text: openai-whisper, assemblyai, deepgram, google, azure, or mock
VITE_SPEECH_PROVIDER=openai-whisper

# AI/LLM: openai, anthropic, google, azure, or mock
VITE_AI_PROVIDER=openai
```

### 3. Add Your API Keys

Add your API keys to the `.env` file:

```env
VITE_SPEECH_API_KEY=your_api_key_here
VITE_AI_API_KEY=your_api_key_here
```

### 4. Start the Development Server

```bash
npm run dev
```

---

## Recommended Configurations

### Option 1: OpenAI (Easiest)
Best for getting started quickly with a single provider.

```env
VITE_SPEECH_PROVIDER=openai-whisper
VITE_SPEECH_API_KEY=sk-...
VITE_AI_PROVIDER=openai
VITE_AI_API_KEY=sk-...
VITE_AI_MODEL=gpt-4-turbo-preview
```

**Cost:** ~$0.006/min for audio + $0.01-0.03 per AI analysis
**Sign up:** https://platform.openai.com/

---

### Option 2: AssemblyAI + Claude (Recommended)
Best accuracy for conversation analysis.

```env
VITE_SPEECH_PROVIDER=assemblyai
VITE_SPEECH_API_KEY=...
VITE_AI_PROVIDER=anthropic
VITE_AI_API_KEY=sk-ant-...
VITE_AI_MODEL=claude-3-5-sonnet-20241022
```

**Cost:** ~$0.00025/sec for audio + ~$0.015 per AI analysis
**Sign up:**
- AssemblyAI: https://www.assemblyai.com/
- Anthropic: https://console.anthropic.com/

---

### Option 3: Deepgram + Google Gemini (Budget-Friendly)
Good balance of cost and performance.

```env
VITE_SPEECH_PROVIDER=deepgram
VITE_SPEECH_API_KEY=...
VITE_AI_PROVIDER=google
VITE_AI_API_KEY=...
VITE_AI_MODEL=gemini-1.5-pro
```

**Cost:** ~$0.0043/min for audio + free tier for Gemini
**Sign up:**
- Deepgram: https://deepgram.com/
- Google AI: https://ai.google.dev/

---

### Option 4: Azure (Enterprise)
Best for enterprise deployments with existing Azure infrastructure.

```env
VITE_SPEECH_PROVIDER=azure
VITE_SPEECH_API_KEY=...
VITE_AI_PROVIDER=azure
VITE_AI_API_KEY=...
VITE_AZURE_ENDPOINT=https://your-resource.openai.azure.com
VITE_AZURE_DEPLOYMENT=your-deployment-name
```

**Sign up:** https://azure.microsoft.com/

---

## Testing Without API Keys

Use mock mode to test the full flow without any API keys:

```env
VITE_SPEECH_PROVIDER=mock
VITE_AI_PROVIDER=mock
```

Mock mode returns realistic sample data for development and testing.

---

## Detailed Provider Information

### Speech-to-Text Providers

#### OpenAI Whisper
- **API Key:** Get from https://platform.openai.com/api-keys
- **Pricing:** $0.006 per minute
- **Accuracy:** Excellent
- **Languages:** 50+
- **Setup Time:** 5 minutes

#### AssemblyAI
- **API Key:** Get from https://www.assemblyai.com/app/account
- **Pricing:** $0.00025 per second (~$0.015/min)
- **Accuracy:** Excellent
- **Features:** Speaker labels, timestamps, confidence scores
- **Setup Time:** 5 minutes

#### Deepgram
- **API Key:** Get from https://console.deepgram.com/
- **Pricing:** $0.0043 per minute
- **Accuracy:** Very Good
- **Features:** Real-time streaming, fast processing
- **Setup Time:** 5 minutes

#### Google Cloud Speech-to-Text
- **Setup:** Requires Google Cloud project setup
- **Pricing:** $0.006-0.024 per 15 seconds
- **Accuracy:** Excellent
- **Features:** Multiple models available
- **Setup Time:** 15-30 minutes

#### Azure Speech Services
- **Setup:** Requires Azure account and resource creation
- **Pricing:** $1 per audio hour
- **Accuracy:** Excellent
- **Features:** Enterprise features, compliance
- **Setup Time:** 15-30 minutes

---

### AI/LLM Providers

#### OpenAI (GPT-4)
- **API Key:** Get from https://platform.openai.com/api-keys
- **Pricing:**
  - GPT-4 Turbo: $0.01 input, $0.03 output per 1K tokens
  - GPT-3.5 Turbo: $0.0005 input, $0.0015 output per 1K tokens
- **Quality:** Excellent
- **Response Time:** 2-5 seconds
- **Best For:** General purpose, good at structured output

#### Anthropic (Claude)
- **API Key:** Get from https://console.anthropic.com/
- **Pricing:**
  - Claude 3.5 Sonnet: $0.003 input, $0.015 output per 1K tokens
  - Claude 3 Opus: $0.015 input, $0.075 output per 1K tokens
- **Quality:** Excellent (best for nuanced analysis)
- **Response Time:** 2-4 seconds
- **Best For:** Detailed conversation analysis, empathy

#### Google Gemini
- **API Key:** Get from https://aistudio.google.com/app/apikey
- **Pricing:**
  - Free tier: 60 requests per minute
  - Paid: $0.00025 input, $0.0005 output per 1K tokens
- **Quality:** Very Good
- **Response Time:** 2-5 seconds
- **Best For:** Budget-conscious deployments, free tier

#### Azure OpenAI
- **Setup:** Requires Azure subscription and OpenAI resource
- **Pricing:** Similar to OpenAI
- **Quality:** Same as OpenAI (uses same models)
- **Response Time:** 2-5 seconds
- **Best For:** Enterprise with Azure infrastructure

---

## Cost Estimations

### Per Tour (Typical 10-minute conversation)

| Configuration | Speech-to-Text | AI Analysis | Total |
|--------------|----------------|-------------|-------|
| OpenAI + GPT-4 | $0.06 | $0.03 | **$0.09** |
| AssemblyAI + Claude | $0.15 | $0.02 | **$0.17** |
| Deepgram + Gemini | $0.04 | Free | **$0.04** |
| OpenAI + GPT-3.5 | $0.06 | $0.002 | **$0.062** |

### Monthly Estimates (100 tours/month)

- **Budget:** Deepgram + Gemini = **$4/month**
- **Recommended:** OpenAI + GPT-4 = **$9/month**
- **Premium:** AssemblyAI + Claude = **$17/month**

---

## Troubleshooting

### "Speech-to-text API key is required"

Make sure your `.env` file has the correct variable name:
```env
VITE_SPEECH_API_KEY=your_key_here
```

Not `SPEECH_API_KEY` or `REACT_APP_SPEECH_API_KEY` - it must start with `VITE_`.

### "Failed to transcribe audio"

1. Check that your API key is valid
2. Verify you have credits/balance in your account
3. Check the browser console for detailed error messages
4. Try switching to `mock` provider to test the flow

### "AI API key is required"

Ensure your AI API key is set:
```env
VITE_AI_API_KEY=your_key_here
```

### Azure not working

For Azure, you need three things:
```env
VITE_AI_PROVIDER=azure
VITE_AI_API_KEY=your_azure_key
VITE_AZURE_ENDPOINT=https://your-resource.openai.azure.com
VITE_AZURE_DEPLOYMENT=your-deployment-name
```

### Environment variables not loading

1. Restart your dev server after editing `.env`
2. Make sure `.env` is in the root directory (same level as `package.json`)
3. Variable names must start with `VITE_` for Vite to expose them

---

## Custom Implementation

Want to use a different provider? Edit these files:

### For Speech-to-Text
Edit `src/services/speechToText.js`:

```javascript
async function transcribeWithCustomProvider(audioBlob, metadata) {
  // Your implementation here

  return {
    transcription: "transcribed text",
    confidence: 0.95,
    provider: 'custom'
  };
}
```

Then update the switch statement to include your provider.

### For AI/LLM
Edit `src/services/aiService.js`:

```javascript
async function analyzeWithCustomProvider(transcription, context) {
  // Your implementation here

  return {
    keyPoints: ["point 1", "point 2"],
    concerns: ["concern 1"],
    smallThings: ["detail 1"],
    provider: 'custom'
  };
}
```

---

## Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use environment variables in production** - Not hardcoded keys
3. **Rotate API keys regularly**
4. **Set up billing alerts** on your provider accounts
5. **Use least-privilege API keys** when available
6. **Monitor usage** to detect anomalies

---

## Support

- Check provider documentation links above
- Review `src/services/config.js` for all configuration options
- Use `mock` mode for testing without API calls
- Check browser console for detailed error messages

---

## Next Steps

After setup:

1. Test with mock data first
2. Try a real recording with your API keys
3. Monitor costs in your provider dashboards
4. Adjust models/settings based on accuracy needs
5. Set up production environment variables
