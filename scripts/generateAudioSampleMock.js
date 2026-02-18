/**
 * Script to generate mock data for Audio Sample demo
 * Run with: node scripts/generateAudioSampleMock.js
 *
 * This script:
 * 1. Reads demo-audio.mp3
 * 2. Transcribes it using configured service
 * 3. Analyzes the transcription with LLM
 * 4. Saves results to mockAudioSampleData.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock form data for Margaret Johnson
const mockFormData = {
  situation: 'Looking for assisted living for my mother',
  firstName: 'Margaret',
  lastName: 'Johnson',
  phone: '(555) 123-4567',
  email: 'margaret.j@email.com'
};

async function generateMockData() {
  console.log('🎯 Starting Audio Sample Mock Data Generation...\n');

  try {
    // Read the audio file
    const audioPath = path.join(__dirname, '../public/demo-audio.mp3');
    console.log(`📁 Reading audio file: ${audioPath}`);

    if (!fs.existsSync(audioPath)) {
      throw new Error(`Audio file not found: ${audioPath}`);
    }

    const audioBuffer = fs.readFileSync(audioPath);
    console.log(`✅ Audio file loaded (${(audioBuffer.length / 1024).toFixed(2)} KB)\n`);

    // For now, we'll use mock transcription and analysis
    // You can uncomment and implement real API calls if needed
    console.log('🎤 Transcribing audio...');
    const mockTranscription = `Hello, this is Sarah from Sunrise Gardens Senior Living. Thank you for calling today, Mrs. Johnson. I understand you're looking into care options for your mother. Yes, that's right. My mother is 82 and she's been living alone, but we're concerned about her safety and wellbeing. She needs help with daily activities and medications. I completely understand. Can you tell me a bit more about your mother's current situation and what kind of assistance she needs? Well, she has some mobility issues and uses a walker. She also has diabetes, so medication management is really important. She loves to garden and read, but she's been feeling isolated since my father passed away last year. I'm so sorry for your loss. It sounds like your mother would benefit from our assisted living community. We have a beautiful garden area where many of our residents spend time, and we have a full library. We also provide medication management and assistance with daily activities. Our staff is trained to help residents maintain their independence while ensuring their safety. That sounds perfect. What about the cost? Can you give me an idea of pricing? Of course. Our assisted living starts at around $4,500 per month. This includes a private or semi-private room, three meals a day, housekeeping, laundry, medication management, and access to all our amenities and activities. We also have a nurse on staff 24/7. Are there any additional fees I should know about? There's a one-time community fee of $2,500 when you move in. If your mother needs additional care beyond our standard services, such as more intensive personal care, that would be an additional cost based on her care plan. We can do a complimentary assessment to determine exactly what she needs. That would be helpful. How soon could she move in if we decided to proceed? We currently have availability and could accommodate her within the next 3-4 weeks. However, I'd love to schedule a tour for you and your mother to come see our community, meet our staff, and get a feel for the environment. Does that sound good? Yes, I'd like to arrange that. My mother lives about 20 minutes from your facility, which is convenient. And she has a small cat - is that allowed? That's a perfect distance for you to visit regularly. And yes, we are pet-friendly! We allow cats and small dogs under 25 pounds. Many of our residents have pets, and we find it really enriches their quality of life. Oh wonderful, she'll be so happy to hear that. She adores her cat, Mittens. I'm glad to hear that. Let me get some information from you to schedule that tour. What days work best for you?`;

    console.log(`✅ Transcription complete (${mockTranscription.length} characters)\n`);

    console.log('🤖 Analyzing transcription with AI...');
    const mockAnalysis = {
      keyPoints: [
        "82-year-old mother needs assisted living due to safety concerns",
        "Requires help with daily activities and medication management (diabetes)",
        "Mother uses walker due to mobility issues",
        "Looking for community with social activities and amenities",
        "Timeline: Can move in within 3-4 weeks"
      ],
      concerns: [
        "Monthly cost of $4,500 plus one-time community fee of $2,500",
        "Additional fees for intensive personal care services",
        "Ensuring proper medication management for diabetes",
        "Mother's isolation and loneliness since father's passing"
      ],
      smallThings: [
        "Mother loves gardening and reading",
        "Has a cat named Mittens that must come with her",
        "Lives 20 minutes from the facility",
        "Daughter is primary decision maker and caregiver",
        "Father passed away last year - recent loss"
      ]
    };

    console.log(`✅ Analysis complete\n`);

    // Create the mock data file
    const mockDataContent = `/**
 * Mock data for Audio Sample demo flow
 * Generated by scripts/generateAudioSampleMock.js
 *
 * This data simulates what would be returned from:
 * 1. Speech-to-text transcription of demo-audio.mp3
 * 2. AI analysis of the transcription
 */

export const audioSampleMockData = {
  // Pre-filled form data
  formData: {
    situation: '${mockFormData.situation}',
    firstName: '${mockFormData.firstName}',
    lastName: '${mockFormData.lastName}',
    phone: '${mockFormData.phone}',
    email: '${mockFormData.email}'
  },

  // Transcription result
  recordingData: {
    transcription: \`${mockTranscription}\`,
    confidence: 0.96,
    provider: 'assemblyai',
    // Audio blob will be loaded from /demo-audio.mp3
  },

  // AI analysis result
  summaryData: {
    keyPoints: ${JSON.stringify(mockAnalysis.keyPoints, null, 6)},
    concerns: ${JSON.stringify(mockAnalysis.concerns, null, 6)},
    smallThings: ${JSON.stringify(mockAnalysis.smallThings, null, 6)},
    transcription: \`${mockTranscription}\`
  }
};
`;

    const outputPath = path.join(__dirname, '../src/data/mockAudioSampleData.js');
    console.log(`💾 Saving mock data to: ${outputPath}`);
    fs.writeFileSync(outputPath, mockDataContent);
    console.log(`✅ Mock data saved successfully!\n`);

    console.log('📊 Summary:');
    console.log(`   Form Data: ${mockFormData.firstName} ${mockFormData.lastName}`);
    console.log(`   Transcription: ${mockTranscription.length} characters`);
    console.log(`   Key Points: ${mockAnalysis.keyPoints.length} items`);
    console.log(`   Concerns: ${mockAnalysis.concerns.length} items`);
    console.log(`   Small Things: ${mockAnalysis.smallThings.length} items`);
    console.log('\n✨ Done! Mock data is ready for use.\n');

  } catch (error) {
    console.error('❌ Error generating mock data:', error);
    process.exit(1);
  }
}

// Run the script
generateMockData();
