import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OnboardingProvider } from './context/OnboardingContext';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Step1 from './pages/onboarding/Step1';
import Step2 from './pages/onboarding/Step2';
import Step3 from './pages/onboarding/Step3';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/onboarding/step1" element={<Step1 />} />
              <Route path="/onboarding/step2" element={<Step2 />} />
              <Route path="/onboarding/step3" element={<Step3 />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </OnboardingProvider>
    </AuthProvider>
  );
}

export default App;