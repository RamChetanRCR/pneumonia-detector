import React, { useState } from 'react';
import axios from 'axios';
import { FileImage, Stethoscope, Brain, ShieldPlus } from 'lucide-react';

const RadiomicsApp = () => {
  const [image, setImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setImage(e.target.result);
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await axios.post('http://localhost:5000/predict', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });

          const result = response.data;
          setDiagnosis({
            name: result.has_pneumonia ? "Pneumonia Detected" : "No Pneumonia",
            prognosis: result.has_pneumonia 
              ? "Potential respiratory infection" 
              : "Chest appears normal",
            treatment: result.has_pneumonia
              ? "Consult healthcare professional, potential antibiotics"
              : "Routine health monitoring",
            probability: `Probability(Pneumonia) : ${(result.probability * 100).toFixed(2)}%`
          });
        } catch (error) {
          console.error("Prediction error", error);
          setDiagnosis(null);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center text-blue-600">
          <Stethoscope className="mr-2" /> AI Pneumonia Detector
        </h1>
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="hidden" 
          id="imageUpload"
        />
        <label 
          htmlFor="imageUpload" 
          className="flex items-center justify-center w-full p-4 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition"
        >
          <FileImage className="mr-2" /> Upload Chest X-Ray
        </label>

        {loading && <p>Analyzing image...</p>}

        {image && (
          <img 
            src={image} 
            alt="Uploaded X-Ray" 
            className="w-full h-48 object-cover rounded-lg mt-4"
          />
        )}

        {diagnosis && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Brain className="mr-2 text-blue-600" />
              <h2 className="text-xl font-semibold">Diagnostic Report</h2>
            </div>
            <p><strong>Diagnosis:</strong> {diagnosis.name}</p>
            <p><strong>Prognosis:</strong> {diagnosis.prognosis}</p>
            <p><strong>Treatment:</strong> {diagnosis.treatment}</p>
            <p className="mt-2">{diagnosis.probability}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RadiomicsApp;