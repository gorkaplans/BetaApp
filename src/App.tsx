import React, { useState } from 'react';
import ClimberProfile from './components/ClimberProfile';
import ImageUpload from './components/ImageUpload';
import HoldSelection from './components/HoldSelection';
import BetaResult from './components/BetaResult';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import Header from './components/Header';
import './App.css';

export interface ClimberData {
  height: number;
  style: 'tecnico' | 'potente' | 'mixto' | '';
}

export interface RouteData {
  image: File | null;
  imageUrl: string;
  startHold: number | null;
  topHold: number | null;
}

export type Screen = 'profile' | 'upload' | 'holds' | 'result' | 'loading' | 'error';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile');
  const [climberData, setClimberData] = useState<ClimberData>({
    height: 170,
    style: ''
  });
  const [routeData, setRouteData] = useState<RouteData>({
    image: null,
    imageUrl: '',
    startHold: null,
    topHold: null
  });
  const [error, setError] = useState<string>('');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleProfileSave = (data: ClimberData) => {
    setClimberData(data);
    navigateToScreen('upload');
  };

  const handleImageUpload = (file: File, url: string) => {
    setRouteData(prev => ({ ...prev, image: file, imageUrl: url }));
    navigateToScreen('holds');
  };

  const handleHoldSelection = (startHold: number, topHold: number) => {
    setRouteData(prev => ({ ...prev, startHold, topHold }));
    navigateToScreen('loading');
    
    // Simulate AI processing
    setTimeout(() => {
      navigateToScreen('result');
    }, 2000);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    navigateToScreen('error');
  };

  const handleRetry = () => {
    navigateToScreen('upload');
  };

  const handleNewRoute = () => {
    setRouteData({
      image: null,
      imageUrl: '',
      startHold: null,
      topHold: null
    });
    navigateToScreen('upload');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'profile':
        return (
          <ClimberProfile
            initialData={climberData}
            onSave={handleProfileSave}
          />
        );
      case 'upload':
        return (
          <ImageUpload
            onImageUpload={handleImageUpload}
            onBack={() => navigateToScreen('profile')}
            onError={handleError}
          />
        );
      case 'holds':
        return (
          <HoldSelection
            imageUrl={routeData.imageUrl}
            onHoldSelection={handleHoldSelection}
            onBack={() => navigateToScreen('upload')}
          />
        );
      case 'result':
        return (
          <BetaResult
            climberData={climberData}
            routeData={routeData}
            onNewRoute={handleNewRoute}
          />
        );
      case 'loading':
        return <LoadingScreen />;
      case 'error':
        return (
          <ErrorScreen
            message={error}
            onRetry={handleRetry}
            onBack={() => navigateToScreen('profile')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-md">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;