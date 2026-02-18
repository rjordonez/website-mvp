import React, { useState } from 'react';
import './Demo.css';
import ListenModeForm from './ListenModeForm';
import ListenModeRecording from './ListenModeRecording';
import DropFile from './DropFile';
import TourSummary from './TourSummary';
import SectionDetail from './SectionDetail';
import CRMView from './CRMView';
import AudioSampleIntro from './AudioSampleIntro';
import AudioSampleForm from './AudioSampleForm';
import { audioSampleMockData } from '../../data/mockAudioSampleData';

function Demo() {
  const [currentStep, setCurrentStep] = useState('home'); // home, audioSampleIntro, audioSampleForm, form, recording, dropFile, summary, detail, crm
  const [formData, setFormData] = useState(null);
  const [recordingData, setRecordingData] = useState(null); // { audioBlob, transcription, confidence, provider }
  const [summaryData, setSummaryData] = useState(null); // { keyPoints, concerns, smallThings, transcription }
  const [currentSection, setCurrentSection] = useState(null);
  const [flowType, setFlowType] = useState(null); // 'listen', 'dropFile', or 'audioSample'

  const handleAudioSampleClick = () => {
    setFlowType('audioSample');
    setCurrentStep('audioSampleIntro');
  };

  const handleListenModeClick = () => {
    setFlowType('listen');
    setCurrentStep('form');
  };

  const handleDropFileClick = () => {
    setFlowType('dropFile');
    setCurrentStep('dropFile');
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    if (flowType === 'listen') {
      setCurrentStep('recording');
    } else if (flowType === 'dropFile') {
      // For drop file, we already have recording data, go straight to summary
      setCurrentStep('summary');
    }
  };

  const handleRecordingSubmit = (data) => {
    setRecordingData(data); // { audioBlob, transcription, confidence, provider }
    setCurrentStep('summary');
  };

  const handleDropFileTranscriptionComplete = (data) => {
    setRecordingData(data); // { audioBlob, transcription, confidence, provider }
    setCurrentStep('form'); // After transcription, go to form
  };

  const handleSectionClick = (section) => {
    setCurrentSection(section);
    setCurrentStep('detail');
  };

  const handleBackToSummary = () => {
    setCurrentStep('summary');
    setCurrentSection(null);
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
    setFormData(null);
    setRecordingData(null);
    setSummaryData(null);
    setCurrentSection(null);
    setFlowType(null);
  };

  const handleSummaryAnalyzed = (data) => {
    setSummaryData(data);
  };

  const handleSeeCRM = () => {
    setCurrentStep('crm');
  };

  const handleBackFromCRM = () => {
    setCurrentStep('summary');
  };

  const handleAudioSampleIntroNext = () => {
    // Load mock data and go to form
    setFormData(audioSampleMockData.formData);
    setCurrentStep('audioSampleForm');
  };

  const handleAudioSampleFormNext = () => {
    // Load mock recording and summary data, then go to summary
    setRecordingData(audioSampleMockData.recordingData);
    setSummaryData(audioSampleMockData.summaryData);
    setCurrentStep('summary');
  };

  if (currentStep === 'audioSampleIntro') {
    return <AudioSampleIntro onNext={handleAudioSampleIntroNext} onBack={handleBackToHome} />;
  }

  if (currentStep === 'audioSampleForm') {
    return <AudioSampleForm formData={formData} onNext={handleAudioSampleFormNext} onBack={() => setCurrentStep('audioSampleIntro')} />;
  }

  if (currentStep === 'dropFile') {
    return <DropFile onTranscriptionComplete={handleDropFileTranscriptionComplete} onBack={handleBackToHome} />;
  }

  if (currentStep === 'form') {
    return <ListenModeForm onSubmit={handleFormSubmit} onBack={handleBackToHome} />;
  }

  if (currentStep === 'recording') {
    return <ListenModeRecording formData={formData} onSubmit={handleRecordingSubmit} onBack={() => setCurrentStep('form')} />;
  }

  if (currentStep === 'summary') {
    return <TourSummary formData={formData} recordingData={recordingData} summaryData={summaryData} onSummaryAnalyzed={handleSummaryAnalyzed} onSectionClick={handleSectionClick} onBack={handleBackToHome} onSeeCRM={handleSeeCRM} />;
  }

  if (currentStep === 'crm') {
    return <CRMView onBack={handleBackFromCRM} formData={formData} recordingData={recordingData} summaryData={summaryData} />;
  }

  if (currentStep === 'detail') {
    return <SectionDetail section={currentSection} formData={formData} onBack={handleBackToSummary} />;
  }

  return (
    <div className="demo">
      <div className="demo-container">
        <h1>Demo</h1>
        <div className="demo-buttons">
          <button className="demo-btn" onClick={handleAudioSampleClick}>Audio Sample</button>
          <button className="demo-btn" onClick={handleListenModeClick}>Listen Mode</button>
          <button className="demo-btn" onClick={handleDropFileClick}>Drop Your File</button>
        </div>
      </div>
    </div>
  );
}

export default Demo;
