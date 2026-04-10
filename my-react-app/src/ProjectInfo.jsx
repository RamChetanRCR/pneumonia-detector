import React from 'react';
import { BookOpen, Target, Shield, TrendingUp, Users } from 'lucide-react';

const ProjectInfo = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-8 flex items-center">
        <BookOpen className="mr-4 text-blue-600" /> 
        Project Overview
      </h2>
      
      <div className="space-y-10">
        <div className="flex items-start">
          <Target className="mr-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-2xl mb-4">Mission</h3>
            <p className="text-lg">Leverage AI to revolutionize healthcare diagnostics by enabling early detection and delivering precise medical imaging analysis, improving global health outcomes.</p>
          </div>
        </div>

        <div className="flex items-start">
          <Shield className="mr-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-2xl mb-4">Objectives</h3>
            <ul className="list-disc pl-8 text-lg">
              <li className="mb-2">Develop accessible, accurate AI diagnostic tools for diverse medical needs</li>
              <li className="mb-2">Optimize diagnostic workflows to save time and enhance early detection rates</li>
              <li className="mb-2">Empower medical professionals with intuitive, supportive technologies</li>
              <li className="mb-2">Ensure data security and compliance with industry standards</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start">
          <TrendingUp className="mr-6 text-yellow-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-2xl mb-4">Vision</h3>
            <p className="text-lg">To create a world where AI-driven diagnostics transform healthcare, making advanced medical care accessible to all.</p>
          </div>
        </div>

        <div className="flex items-start">
          <Users className="mr-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-2xl mb-4">Collaboration</h3>
            <p className="text-lg">Partnering with healthcare providers, researchers, and technology experts to drive innovation and improve patient outcomes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
