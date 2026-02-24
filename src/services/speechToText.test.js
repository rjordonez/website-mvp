import { describe, it, expect, vi, beforeEach } from 'vitest';

// Track what params were passed to transcribe
let capturedTranscribeParams = null;
let mockTranscribeResult = null;

// Mock the config module
vi.mock('./config', () => ({
  getConfig: () => ({
    speechToText: {
      provider: 'assemblyai',
      apiKey: 'test-api-key',
    },
  }),
}));

// Mock the assemblyai SDK with a proper class
vi.mock('assemblyai', () => ({
  AssemblyAI: class MockAssemblyAI {
    constructor() {
      this.transcripts = {
        transcribe: async (params) => {
          capturedTranscribeParams = params;
          return mockTranscribeResult;
        },
      };
    }
  },
}));

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('transcribeWithAssemblyAI', () => {
  let transcribeAudio;

  beforeEach(async () => {
    vi.clearAllMocks();
    capturedTranscribeParams = null;
    mockTranscribeResult = null;

    const mod = await import('./speechToText.js');
    transcribeAudio = mod.transcribeAudio;
  });

  it('should use language_code "en" instead of language_detection to avoid short-audio failures', async () => {
    const audioBlob = new Blob(['fake-audio'], { type: 'audio/webm' });

    // Mock upload response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ upload_url: 'https://cdn.assemblyai.com/upload/test123' }),
    });

    mockTranscribeResult = {
      status: 'completed',
      text: 'Hello world',
      confidence: 0.95,
    };

    const result = await transcribeAudio(audioBlob, {});

    // Verify the transcribe params use language_code, NOT language_detection
    expect(capturedTranscribeParams).toBeDefined();
    expect(capturedTranscribeParams).not.toHaveProperty('language_detection');
    expect(capturedTranscribeParams.language_code).toBe('en');
    expect(capturedTranscribeParams.audio).toBe('https://cdn.assemblyai.com/upload/test123');
    expect(result.transcription).toBe('Hello world');
    expect(result.provider).toBe('assemblyai');
  });

  it('should throw on transcription error status', async () => {
    const audioBlob = new Blob(['fake-audio'], { type: 'audio/webm' });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ upload_url: 'https://cdn.assemblyai.com/upload/test123' }),
    });

    mockTranscribeResult = {
      status: 'error',
      error: 'language_detection cannot be performed on files with no spoken audio.',
    };

    await expect(transcribeAudio(audioBlob, {})).rejects.toThrow('Transcription failed');
  });
});
