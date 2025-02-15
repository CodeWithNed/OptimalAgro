import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './components/Map';
import DataForm from './components/DataForm';
import Summary from './components/Summary';
import CreateAccount from './components/CreateAccount';
import Timeline from './components/Timeline';
import CropInfo from './components/CropInfo';
import Sidebar from './components/Sidebar';
import { SoilData } from './types';

function App() {
  const [selectedArea, setSelectedArea] = useState(0);
  const [analysisData, setAnalysisData] = useState<SoilData | null>(null);

  const handleAreaSelect = (area: number) => {
    setSelectedArea(area);
  };

  const handleDataSubmit = (data: SoilData) => {
    setAnalysisData(data);
  };

  return (
    <Router>
      <div className="flex">
        {/* Use Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 min-h-screen bg-gray-100 p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-7xl mx-auto space-y-6">
                  <header className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin className="h-8 w-8 text-blue-600" />
                      <h1 className="text-3xl font-bold text-gray-900">Data-Driven Optimal Crop Selection for Sri Lanka 🇱🇰</h1>
                    </div>
                    <p className="text-gray-600">
                      Select an area on the map and input soil data for analysis
                    </p>
                  </header>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Map onAreaSelect={handleAreaSelect} />
                    </div>
                    <div>
                      <DataForm onSubmit={handleDataSubmit} selectedArea={selectedArea} />
                    </div>
                  </div>

                  {analysisData && (
                    <div className="mt-8">
                      <Summary data={analysisData} area={selectedArea} />
                    </div>
                  )}
                </div>
              }
            />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/crops" element={<CropInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
