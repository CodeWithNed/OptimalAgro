import { useState } from 'react';
import { SoilData, LandCondition, landConditionLabels } from '../types';

interface DataFormProps {
  onSubmit: (data: SoilData) => void;
  selectedArea: number;
}

export default function DataForm({ onSubmit, selectedArea }: DataFormProps) {
  const [formData, setFormData] = useState<SoilData>({
    nitrogen: 0,
    phosphorous: 0,
    potassium: 0,
    temperature: 25,
    humidity: 65,
    pH: 7,
    rainfall: 1000,
    landCondition: 'paddy',
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make API call to Python backend
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: formData }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setPrediction(data.prediction); // Assuming the backend returns a key `prediction`
      onSubmit(formData); // Optionally call onSubmit if needed
    } catch (error) {
      console.error('Error fetching prediction:', error);
      alert('An error occurred while fetching prediction.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'landCondition' ? value : Number(value),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div className="text-lg font-semibold mb-4">
        Selected Area: {selectedArea.toFixed(2)} km²
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nitrogen Ratio</label>
          <input
            type="number"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleChange}
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phosphorous Ratio</label>
          <input
            type="number"
            name="phosphorous"
            value={formData.phosphorous}
            onChange={handleChange}
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Potassium Ratio</label>
          <input
            type="number"
            name="potassium"
            value={formData.potassium}
            onChange={handleChange}
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            step="0.1"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
          <input
            type="number"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            min="0"
            max="100"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">pH Level</label>
          <input
            type="number"
            name="pH"
            value={formData.pH}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="14"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rainfall (mm)</label>
          <input
            type="number"
            name="rainfall"
            value={formData.rainfall}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Land Condition</label>
          <select
            name="landCondition"
            value={formData.landCondition}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.entries(landConditionLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <p className="text-center text-blue-600">Fetching prediction...</p>
      )}

      {prediction && (
        <p className="text-center text-green-600">Prediction: {prediction.length > 0 ? prediction.join(", ") : "No predictions yet"}</p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          Submit Analysis
        </button>
      </div>
    </form>
  );
}
