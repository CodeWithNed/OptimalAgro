import { Calendar, DollarSign, Clock, TrendingUp } from 'lucide-react';

export default function Timeline() {
  const timelineData = [
    {
      title: 'Land Preparation',
      duration: '2 weeks',
      cost: '$500',
      description: 'Clear the land, prepare soil, and set up irrigation systems',
    },
    {
      title: 'Planting',
      duration: '1 week',
      cost: '$300',
      description: 'Plant seeds or seedlings according to recommended spacing',
    },
    {
      title: 'Growth Phase',
      duration: '12 weeks',
      cost: '$800',
      description: 'Regular maintenance, fertilization, and pest control',
    },
    {
      title: 'Harvest',
      duration: '2 weeks',
      cost: '$400',
      description: 'Harvest crops at optimal maturity',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Crop Timeline and Projections</h2>

          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <Clock className="h-5 w-5" />
                  <h3 className="font-semibold">Time to Yield</h3>
                </div>
                <p className="text-2xl font-bold text-green-800">17 weeks</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <DollarSign className="h-5 w-5" />
                  <h3 className="font-semibold">Total Cost</h3>
                </div>
                <p className="text-2xl font-bold text-blue-800">$2,000</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-purple-700 mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <h3 className="font-semibold">Expected Income</h3>
                </div>
                <p className="text-2xl font-bold text-purple-800">$3,500</p>
              </div>
            </div>
          </div>

          <div className="relative">
            {timelineData.map((item, index) => (
              <div key={index} className="mb-8 flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  {index < timelineData.length - 1 && (
                    <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Duration:</span> {item.duration}
                      </div>
                      <div>
                        <span className="font-medium">Cost:</span> {item.cost}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Notifications</h3>
            <p className="text-yellow-700">
              You will receive notifications for important milestones and tasks throughout your crop's
              growth cycle. Make sure to enable notifications in your browser to stay updated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}