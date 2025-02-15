import { SoilData, landConditionLabels } from '../types';
import { useNavigate } from 'react-router-dom';

interface SummaryProps {
  data: SoilData;
  area: number;
}

export default function Summary({ data, area }: SummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Analysis Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Selected Area:</p>
          <p>{area.toFixed(2)} km² ({(area * 100).toFixed(2)} hectares)</p>
        </div>
        <div>
          <p className="font-semibold">Land Condition:</p>
          <p>{landConditionLabels[data.landCondition]}</p>
        </div>
        <div>
          <p className="font-semibold">Soil Composition:</p>
          <ul className="list-disc list-inside">
            <li>Nitrogen: {data.nitrogen}</li>
            <li>Phosphorous: {data.phosphorous}</li>
            <li>Potassium: {data.potassium}</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Environmental Conditions:</p>
          <ul className="list-disc list-inside">
            <li>Temperature: {data.temperature}°C</li>
            <li>Humidity: {data.humidity}%</li>
            <li>pH Level: {data.pH}</li>
            <li>Rainfall: {data.rainfall}mm</li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate('/create-account')}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Create an Account to Track Your Progress
        </button>
      </div>
    </div>
  );
}