import React from 'react';
import Header from './components/layout/Header';
import Home from './components/layout/Home';
import About from './components/layout/About';
import Services from './components/layout/Services';
import News from './components/layout/News';
import Clients from './components/layout/Clients';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Home />
      <About />
      <Services />
      <News />
      <Clients />
      <Footer />
      {/* Add padding-top to account for fixed header */}
      <main className="pt-24">
        {/* Your main content will go here */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Placeholder content */}
          <div className="h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-900">

            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;