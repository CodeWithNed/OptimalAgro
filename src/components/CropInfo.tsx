import React, { useEffect, useState } from 'react';

interface Crop {
  name: string;
  type: string;
  growing_season: string;
  average_yield_per_km_squared: string;
  cost_per_acre: number;
  gain_per_acre: number;
  profit_per_acre: number;
}

const CropInfo: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);

  useEffect(() => {
    fetch('/data/cropData.json')
      .then((response) => response.json())
      .then((data) => setCrops(data.crops))
      .catch((error) => console.error('Error fetching crop data:', error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crop Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crops.map((crop, index) => (
          <div key={index} className="border p-4 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">{crop.name}</h3>
            <p><strong>Type:</strong> {crop.type}</p>
            <p><strong>Growing Season:</strong> {crop.growing_season}</p>
            <p><strong>Average Yield:</strong> {crop.average_yield_per_km_squared}</p>
            <p><strong>Cost per Acre:</strong> {crop.cost_per_acre}</p>
            <p><strong>Gain per Acre:</strong> {crop.gain_per_acre}</p>
            <p><strong>Profit per Acre:</strong> {crop.profit_per_acre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropInfo;
