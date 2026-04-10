import React from 'react';

const ModelOverview = ({ setActiveSection }) => {
  const futureModels = [
    {
      icon: '🫁',
      title: 'Pneumonia Detection',
      status: 'Implemented',
      description: 'AI-powered X-ray analysis to detect pneumonia with high accuracy.',
      action: (
        <button
        onClick={() => setActiveSection('pneumonia')}
        className="mt-4 px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-all"
      >
        Try Now
      </button>
      
      ),
    },
    {
      icon: '❤️',
      title: 'Cardiac Health',
      status: 'Planned',
      description: 'Predict heart disease risk from medical imaging and patient data.',
    },
    {
      icon: '🧠',
      title: 'Neurological Screening',
      status: 'Research Phase',
      description: 'Early detection of neurological disorders using brain scans.',
    },
  ];

  const comingSoonFeatures = [
    {
      icon: '🔬',
      title: 'Cancer Detection',
      description: 'AI algorithms to identify potential signs of cancer from imaging and histopathology data.',
    },
    {
      icon: '🩺',
      title: 'Virtual Health Assistant',
      description: 'AI-powered chatbot for patient triaging, symptom analysis, and health guidance.',
    },
    {
      icon: '📈',
      title: 'Predictive Analytics Dashboard',
      description: 'Real-time dashboard with predictive insights for clinicians to prioritize care effectively.',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        📊 Medical AI Diagnostic Platform
      </h2>

      <p className="text-gray-700 mb-8">
        Our platform combines cutting-edge AI-powered diagnostic models with seamless EHR integration using FHIR and HL7 standards. By leveraging deep learning models, secure cloud storage, and real-time collaboration tools, we aim to enhance healthcare workflows and enable early interventions for better patient outcomes.
      </p>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Current and Upcoming Models</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {futureModels.map((model, index) => (
            <div key={index} className="border p-4 rounded-lg hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{model.icon}</span>
                <h3 className="font-semibold text-xl">{model.title}</h3>
              </div>
              <p className="text-gray-600">{model.description}</p>
              <span
                className={`mt-2 inline-block px-2 py-1 rounded text-xs ${
                  model.status === 'Implemented'
                    ? 'bg-green-100 text-green-800'
                    : model.status === 'Planned'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {model.status}
              </span>
              {model.action && model.action}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Coming Soon</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {comingSoonFeatures.map((feature, index) => (
            <div
              key={index}
              className="border-dashed border-2 border-gray-300 p-4 rounded-lg hover:shadow-md transition"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{feature.icon}</span>
                <h3 className="font-semibold text-xl">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
              <span className="mt-2 inline-block px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelOverview;
